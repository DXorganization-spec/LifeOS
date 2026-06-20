from fastapi import APIRouter

from app.services.email_service import (
    send_email
)
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.dependencies import get_db
from app.services.reminder_service import (
    send_daily_reminders
)

router = APIRouter()


@router.get("/test-email")
def test_email():

    send_email(
        "17aditya.satpute@gmail.com",
        "LifeOS Test Email",
        "Congratulations! LifeOS email system is working."
    )

    return {
        "message": "Email sent successfully"
    }

@router.get("/send-reminders")
def send_reminders(
    db: Session = Depends(get_db)
):

    send_daily_reminders(db)

    return {
        "message": "Reminders sent"
    }