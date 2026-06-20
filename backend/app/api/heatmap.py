from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.models.activity import Activity

router = APIRouter()


@router.get("/heatmap")
def heatmap(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    activities = (
        db.query(Activity)
        .filter(
            Activity.user_id == current_user.id
        )
        .all()
    )

    return activities