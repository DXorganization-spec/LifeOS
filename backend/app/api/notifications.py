from fastapi import APIRouter, Depends

from app.core.auth import get_current_user
from app.models.user import User
from app.services.email_service import (
    send_email
)
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.services.reminder_service import (
    send_daily_reminders
)

router = APIRouter()


@router.get("/test-email")
def test_email(
    current_user: User = Depends(get_current_user)
):

    send_email(
        current_user.email,
        "LifeOS Test Email",
        "Congratulations! LifeOS email system is working."
    )

    return {
        "message": "Email sent successfully"
    }

@router.get("/send-reminders")
def send_reminders(
    db: Session = Depends(get_db),
    _current_user: User = Depends(get_current_user)
):

    send_daily_reminders(db)

    return {
        "message": "Reminders sent"
    }
