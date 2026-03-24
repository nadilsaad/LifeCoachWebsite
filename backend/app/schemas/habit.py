from pydantic import BaseModel
from datetime import date

class HabitCreate(BaseModel):
    title: str
    is_good: bool = True

class HabitOut(BaseModel):
    id: int
    title: str
    is_good: bool

    class Config:
        from_attributes = True

class HabitLogSet(BaseModel):
    day: date
    done: bool