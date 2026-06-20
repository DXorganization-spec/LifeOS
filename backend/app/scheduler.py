from apscheduler.schedulers.background import BackgroundScheduler

from app.database.database import SessionLocal
from app.services.reminder_service import (
    send_daily_reminders
)


def reminder_job():

    db = SessionLocal()

    try:
        send_daily_reminders(db)

    finally:
        db.close()


scheduler = BackgroundScheduler()

scheduler.add_job(
    reminder_job,
    "cron",
    hour=20,
    minute=0
)