from sqlalchemy import Integer, ForeignKey, Date, Boolean, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from app.db.base import Base

class HabitLog(Base):
    __tablename__ = "habit_logs"
    __table_args__ = (UniqueConstraint("habit_id", "day", name="uix_habit_day"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    habit_id: Mapped[int] = mapped_column(ForeignKey("habits.id"), index=True)
    day: Mapped[date] = mapped_column(Date, index=True)
    done: Mapped[bool] = mapped_column(Boolean, default=False)

    habit = relationship("Habit", back_populates="logs")