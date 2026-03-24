from sqlalchemy import Integer, ForeignKey, Date, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from app.db.base import Base

class Journal(Base):
    __tablename__ = "journals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    day: Mapped[date] = mapped_column(Date, index=True)
    text: Mapped[str] = mapped_column(Text)

    owner = relationship("User", back_populates="journals")