from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta

from app.database.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.models.activity import Activity
from app.services.report_service import (
    send_weekly_reports
)

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

    active_days = len(activities)

    return {
        "tasks_completed": tasks_completed,
        "xp_gained": xp_gained,
        "current_streak": current_user.current_streak,
        "longest_streak": current_user.longest_streak,
        "level": current_user.level,
        "total_xp": current_user.xp,
        "active_days": active_days,
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

    active_days = len(activities)

    productivity_score = min(
        100,
        tasks_completed * 3
    )

    return {
        "tasks_completed": tasks_completed,
        "xp_gained": xp_gained,
        "current_streak": current_user.current_streak,
        "longest_streak": current_user.longest_streak,
        "level": current_user.level,
        "total_xp": current_user.xp,
        "active_days": active_days,
        "best_day": best_day,
        "best_day_tasks": best_day_count,
        "productivity_score": productivity_score
    }
@router.post("/test-weekly-report")
def test_weekly_report(
    db: Session = Depends(get_db)
):

    send_weekly_reports(db)

    return {
        "message": "Weekly reports sent"
    }