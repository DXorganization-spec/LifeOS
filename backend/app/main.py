import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.areas import router as areas_router
from app.api.goals import router as goals_router
from app.api.achievements import router as achievements_router
from app.api.auth import router as auth_router
from app.api.tasks import router as tasks_router
from app.api.dashboard import router as dashboard_router
from app.api.heatmap import router as heatmap_router
from app.api.progress import router as progress_router
from app.api.analytics import router as analytics_router
from app.api.settings import router as settings_router
from app.api.notifications import (
    router as notifications_router
)
from app.scheduler import scheduler
from app.api.habits import router as habits_router
from app.api.habit_logs import router as habit_logs_router

load_dotenv()


def get_allowed_origins() -> list[str]:
    origins = os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000"
    )

    return [
        origin.strip()
        for origin in origins.split(",")
        if origin.strip()
    ]


app = FastAPI(
    title="LifeOS API",
    version="1.0.0"
)
scheduler.start()

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register Auth Routes
app.include_router(auth_router)
app.include_router(areas_router)
app.include_router(goals_router)
app.include_router(tasks_router)
app.include_router(dashboard_router)
app.include_router(achievements_router)
app.include_router(heatmap_router)
app.include_router(progress_router)
app.include_router(analytics_router)
app.include_router(settings_router)
app.include_router(
    notifications_router
)
app.include_router(habits_router)
app.include_router(habit_logs_router)


@app.get("/")
def root():
    return {
        "message": "LifeOS API Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
