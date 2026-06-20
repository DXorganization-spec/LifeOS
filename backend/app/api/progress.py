from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.models.goal import Goal
from app.models.task import Task
from app.models.area import Area

router = APIRouter()


@router.get("/goals/{goal_id}/progress")
def goal_progress(
    goal_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    goal = (
        db.query(Goal)
        .join(Area)
        .filter(
            Goal.id == goal_id,
            Area.user_id == current_user.id
        )
        .first()
    )

    if not goal:
        return {
            "message": "Goal not found"
        }

    total_tasks = (
        db.query(Task)
        .filter(Task.goal_id == goal.id)
        .count()
    )

    completed_tasks = (
        db.query(Task)
        .filter(
            Task.goal_id == goal.id,
            Task.completed == True
        )
        .count()
    )

    progress = 0

    if total_tasks > 0:
        progress = (
            completed_tasks / total_tasks
        ) * 100

    return {
        "goal": goal.title,
        "completed_tasks": completed_tasks,
        "total_tasks": total_tasks,
        "progress": round(progress, 2)
    }