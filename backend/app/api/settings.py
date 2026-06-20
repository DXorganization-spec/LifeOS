from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.core.auth import get_current_user

from app.models.user import User
from app.schemas.settings import SettingsUpdate

router = APIRouter()


@router.get("/settings")
def get_settings(
    current_user: User = Depends(get_current_user)
):
    return {
        "reminder_enabled": current_user.reminder_enabled,
        "reminder_time": current_user.reminder_time
    }


@router.put("/settings")
def update_settings(
    settings: SettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    current_user.reminder_enabled = settings.reminder_enabled
    current_user.reminder_time = settings.reminder_time

    db.commit()

    return {
        "message": "Settings updated"
    }