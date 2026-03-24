from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.models.journal import Journal
from app.schemas.journal import JournalCreate, JournalOut

router = APIRouter(prefix="/journal", tags=["journal"])


@router.post("", response_model=JournalOut)
def add_entry(
    payload: JournalCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    entry = Journal(
        user_id=user.id,
        day=payload.day,
        text=payload.text,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


@router.get("", response_model=list[JournalOut])
def list_entries(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return (
        db.query(Journal)
        .filter(Journal.user_id == user.id)
        .order_by(Journal.day.desc())
        .all()
    )