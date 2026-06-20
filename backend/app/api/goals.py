from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.goal import Goal
from app.models.area import Area
from app.models.user import User
from app.schemas.goal import GoalCreate
from app.models.task import Task
from app.core.auth import get_current_user
from app.schemas.goal import (
    GoalCreate,
    GoalUpdate
)

router = APIRouter()


@router.post("/goals")
def create_goal(
    goal: GoalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    area = (
        db.query(Area)
        .filter(
            Area.id == goal.area_id,
            Area.user_id == current_user.id
        )
        .first()
    )

    if not area:
        return {
            "message": "Area not found"
        }

    new_goal = Goal(
        title=goal.title,
        area_id=goal.area_id
    )

    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)

    return {
        "id": str(new_goal.id),
        "title": new_goal.title
    }


@router.get("/goals")
def get_goals(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    goals = (
        db.query(Goal)
        .join(Area)
        .filter(
            Area.user_id == current_user.id
        )
        .all()
    )

    return goals

@router.put("/goals/{goal_id}")
def update_goal(
    goal_id: str,
    goal_data: GoalUpdate,
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

    goal.title = goal_data.title

    db.commit()

    return {
        "message": "Goal updated"
    }

@router.delete("/goals/{goal_id}")
def delete_goal(
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

    tasks = (
        db.query(Task)
        .filter(
            Task.goal_id == goal.id
        )
        .all()
    )

    for task in tasks:
        db.delete(task)

    db.flush()

    db.delete(goal)

    db.commit()

    return {
        "message": "Goal deleted"
    }