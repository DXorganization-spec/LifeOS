from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models.goal import Goal

from app.database.dependencies import get_db
from app.models.area import Area
from app.schemas.area import AreaCreate
from app.core.auth import get_current_user
from app.models.user import User
from app.models.task import Task
from app.schemas.area import AreaCreate, AreaUpdate

router = APIRouter()


@router.post("/areas")
def create_area(
    area: AreaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    new_area = Area(name=area.name, user_id=current_user.id)

    db.add(new_area)
    db.commit()
    db.refresh(new_area)

    return {"id": str(new_area.id), "name": new_area.name}


@router.get("/areas")
def get_areas(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):

    areas = db.query(Area).filter(Area.user_id == current_user.id).all()

    return areas


@router.put("/areas/{area_id}")
def update_area(
    area_id: str,
    area_data: AreaUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    area = (
        db.query(Area)
        .filter(Area.id == area_id, Area.user_id == current_user.id)
        .first()
    )

    if not area:
        return {"message": "Area not found"}

    area.name = area_data.name

    db.commit()

    return {"message": "Area updated"}


@router.delete("/areas/{area_id}")
def delete_area(
    area_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    area = (
        db.query(Area)
        .filter(Area.id == area_id, Area.user_id == current_user.id)
        .first()
    )

    if not area:
        return {"message": "Area not found"}

    goals = db.query(Goal).filter(Goal.area_id == area.id).all()

    print("Area ID:", area.id)
    print("Goals Found:", len(goals))

    for goal in goals:

        print("Deleting Goal:", goal.id)

        tasks = db.query(Task).filter(Task.goal_id == goal.id).all()

        print("Tasks Found:", len(tasks))

        for task in tasks:
            db.delete(task)

        db.flush()

        db.delete(goal)

    db.flush()

    db.delete(area)

    db.commit()

    return {"message": "Area deleted"}
