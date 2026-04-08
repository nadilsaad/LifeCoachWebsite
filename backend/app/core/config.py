from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Life Coach API"
    SECRET_KEY: str = "CHANGE_ME_TO_A_LONG_RANDOM_SECRET"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    DATABASE_URL: str = "postgresql+psycopg2://neondb_owner:npg_4ULfrIobJVP2@ep-steep-night-al0uolqi.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require"

    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
        "http://localhost:5177",
        "http://127.0.0.1:5177",
    ]

settings = Settings()
