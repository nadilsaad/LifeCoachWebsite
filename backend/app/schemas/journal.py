from pydantic import BaseModel
from datetime import date

class JournalCreate(BaseModel):
    day: date
    text: str

class JournalOut(BaseModel):
    id: int
    day: date
    text: str

    class Config:
        from_attributes = True