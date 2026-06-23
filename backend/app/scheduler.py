from apscheduler.schedulers.background import BackgroundScheduler

from app.database.database import SessionLocal

from app.services.reminder_service import (
    send_daily_reminders
)

from app.services.report_service import (
    send_weekly_reports
)


def reminder_job():

    db = SessionLocal()

    try:
        send_daily_reminders(db)

    finally:
        db.close()


def weekly_report_job():

    db = SessionLocal()

    try:
        send_weekly_reports(db)

    finally:
        db.close()


scheduler = BackgroundScheduler()

scheduler.add_job(
    reminder_job,
    "cron",
    hour=20,
    minute=0
)

scheduler.add_job(
    weekly_report_job,
    "cron",
    day_of_week="sun",
    hour=21,
    minute=0
)