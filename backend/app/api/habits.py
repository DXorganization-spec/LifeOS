from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.models.habit import Habit
from app.models.goal import Goal
from app.models.area import Area
from app.models.user import User

from app.schemas.habit import HabitCreate, HabitUpdate

from app.core.auth import get_current_user

router = APIRouter()


@router.post("/habits")
def create_habit(
    habit: HabitCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    goal = (
        db.query(Goal)
        .join(Area)
        .filter(
            Goal.id == habit.goal_id,
            Area.id == Goal.area_id,
            Area.user_id == current_user.id,
        )
        .first()
    )

    if not goal:
        return {"message": "Goal not found"}

    new_habit = Habit(
        title=habit.title,
        description=habit.description,
        goal_id=habit.goal_id,
        frequency=habit.frequency,
    )

    db.add(new_habit)
    db.commit()
    db.refresh(new_habit)

    return {
        "id": str(new_habit.id),
        "title": new_habit.title,
        "description": new_habit.description,
        "frequency": new_habit.frequency,
    }


@router.get("/habits")
def get_habits(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    habits = (
        db.query(Habit)
        .join(Goal)
        .join(Area)
        .filter(Area.user_id == current_user.id)
        .all()
    )

    return habits


@router.put("/habits/{habit_id}")
def update_habit(
    habit_id: str,
    habit_data: HabitUpdate,
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

    habit.title = habit_data.title
    habit.description = habit_data.description
    habit.frequency = habit_data.frequency

    db.commit()

    return {"message": "Habit updated"}


@router.delete("/habits/{habit_id}")
def delete_habit(
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

    db.delete(habit)
    db.commit()

    return {"message": "Habit deleted"}
