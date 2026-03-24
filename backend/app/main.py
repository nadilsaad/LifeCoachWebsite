from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base

from app.models.user import User
from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.models.journal import Journal

from app.api.routes.auth import router as auth_router
from app.api.routes.habits import router as habits_router
from app.api.routes.journal import router as journal_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(habits_router)
app.include_router(journal_router)

@app.get("/")
def root():
    return {"message": "Life Coach API is running"}