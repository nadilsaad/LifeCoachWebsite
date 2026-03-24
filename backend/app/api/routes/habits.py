from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from app.api.deps import get_db, get_current_user
from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.schemas.habit import HabitCreate, HabitOut, HabitLogSet

router = APIRouter(prefix="/habits", tags=["habits"])

@router.post("", response_model=HabitOut)
def create_habit(payload: HabitCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    habit = Habit(user_id=user.id, title=payload.title, is_good=payload.is_good)
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return habit

@router.get("", response_model=list[HabitOut])
def list_habits(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Habit).filter(Habit.user_id == user.id).all()

@router.post("/{habit_id}/log")
def set_log(habit_id: int, payload: HabitLogSet, db: Session = Depends(get_db), user=Depends(get_current_user)):
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == user.id).first()
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    log = db.query(HabitLog).filter(HabitLog.habit_id == habit_id, HabitLog.day == payload.day).first()
    if not log:
        log = HabitLog(habit_id=habit_id, day=payload.day, done=payload.done)
        db.add(log)
    else:
        log.done = payload.done

    db.commit()
    return {"message": "saved"}

@router.get("/today")
def today_status(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()
    habits = db.query(Habit).filter(Habit.user_id == user.id).all()
    result = []
    for h in habits:
        log = db.query(HabitLog).filter(HabitLog.habit_id == h.id, HabitLog.day == today).first()
        result.append({"id": h.id, "title": h.title, "is_good": h.is_good, "done": bool(log.done) if log else False})
    return result