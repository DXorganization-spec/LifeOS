from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta

from app.database.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.models.activity import Activity

router = APIRouter()


@router.get("/analytics/weekly")
def weekly_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    seven_days_ago = date.today() - timedelta(days=6)

    activities = (
        db.query(Activity)
        .filter(
            Activity.user_id == current_user.id,
            Activity.date >= seven_days_ago
        )
        .all()
    )

    tasks_completed = sum(
        activity.count
        for activity in activities
    )

    xp_gained = tasks_completed * 10

    productivity_score = min(
        100,
        tasks_completed * 10
    )

    return {
        "tasks_completed": tasks_completed,
        "xp_gained": xp_gained,
        "current_streak": current_user.current_streak,
        "productivity_score": productivity_score
    }

@router.get("/analytics/monthly")
def monthly_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    thirty_days_ago = date.today() - timedelta(days=29)

    activities = (
        db.query(Activity)
        .filter(
            Activity.user_id == current_user.id,
            Activity.date >= thirty_days_ago
        )
        .all()
    )

    tasks_completed = sum(
        activity.count
        for activity in activities
    )

    xp_gained = tasks_completed * 10

    best_day = None
    best_day_count = 0

    for activity in activities:

        if activity.count > best_day_count:

            best_day_count = activity.count
            best_day = activity.date

    productivity_score = min(
        100,
        tasks_completed * 3
    )

    return {
        "tasks_completed": tasks_completed,
        "xp_gained": xp_gained,
        "current_streak": current_user.current_streak,
        "best_day": best_day,
        "best_day_tasks": best_day_count,
        "productivity_score": productivity_score
    }