from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.models.area import Area
from app.models.goal import Goal
from app.models.task import Task

router = APIRouter()


@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    areas_count = (
        db.query(Area)
        .filter(
            Area.user_id == current_user.id
        )
        .count()
    )

    goals_count = (
        db.query(Goal)
        .join(Area)
        .filter(
            Area.user_id == current_user.id
        )
        .count()
    )

    tasks_count = (
        db.query(Task)
        .join(Goal)
        .join(Area)
        .filter(
            Area.user_id == current_user.id
        )
        .count()
    )

    completed_tasks = (
        db.query(Task)
        .join(Goal)
        .join(Area)
        .filter(
            Area.user_id == current_user.id,
            Task.completed == True
        )
        .count()
    )

    progress_percentage = 0

    if tasks_count > 0:
        progress_percentage = round(
            (completed_tasks / tasks_count) * 100,
            2
        )

    return {
        "xp": current_user.xp,
        "level": current_user.level,
        "current_streak": current_user.current_streak,
        "longest_streak": current_user.longest_streak,
        "areas": areas_count,
        "goals": goals_count,
        "tasks": tasks_count,
        "completed_tasks": completed_tasks,
        "progress_percentage": progress_percentage
    }