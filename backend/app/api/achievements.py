from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.models.achievement import Achievement

router = APIRouter()


@router.get("/achievements")
def get_achievements(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    achievements = (
        db.query(Achievement)
        .filter(
            Achievement.user_id == current_user.id
        )
        .all()
    )

    return achievements