from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.habit import Habit
from app.models.habit_log import HabitLog
from app.models.goal import Goal
from app.models.area import Area
from app.models.user import User

from app.core.auth import get_current_user

router = APIRouter()


@router.post("/habits/{habit_id}/complete")
def complete_habit(
    habit_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    habit = (
        db.query(Habit)
        .join(Goal)
        .join(Area)
        .filter(
            Habit.id == habit_id,
            Area.user_id == current_user.id,
        )
        .first()
    )

    if not habit:
        return {"message": "Habit not found"}

    today = date.today()

    existing = (
        db.query(HabitLog)
        .filter(
            HabitLog.habit_id == habit.id,
            HabitLog.date == today,
        )
        .first()
    )

    if existing:
        return {"message": "Habit already completed today"}

    log = HabitLog(
        habit_id=habit.id,
        date=today,
        completed=True,
    )

    db.add(log)
    db.commit()
    db.refresh(log)

    return {
    "message": "Habit completed",
    "habit_id": str(habit.id),
    "date": str(today),
}


@router.delete("/habits/{habit_id}/complete")
def uncomplete_habit(
    habit_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    habit = (
        db.query(Habit)
        .join(Goal)
        .join(Area)
        .filter(
            Habit.id == habit_id,
            Area.user_id == current_user.id,
        )
        .first()
    )

    if not habit:
        return {"message": "Habit not found"}

    today = date.today()

    log = (
        db.query(HabitLog)
        .filter(
            HabitLog.habit_id == habit.id,
            HabitLog.date == today,
        )
        .first()
    )

    if not log:
        return {"message": "Habit is not completed today"}

    db.add(log)
    db.commit()
    db.refresh(log)


    return {
    "message": "Habit unchecked",
    "habit_id": str(habit.id),
    "date": str(today),
}

@router.get("/habits/{habit_id}/history")
def get_habit_history(
    habit_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    habit = (
        db.query(Habit)
        .join(Goal)
        .join(Area)
        .filter(
            Habit.id == habit_id,
            Area.user_id == current_user.id,
        )
        .first()
    )

    if not habit:
        return {"message": "Habit not found"}

    logs = (
        db.query(HabitLog)
        .filter(HabitLog.habit_id == habit.id)
        .order_by(HabitLog.date.desc())
        .all()
    )

    return logs