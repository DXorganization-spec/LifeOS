from sqlalchemy.orm import Session

from app.models.user import User
from app.models.task import Task
from app.models.goal import Goal
from app.models.area import Area

from app.services.email_service import send_email


def send_daily_reminders(db: Session):

    users = db.query(User).all()

    print("Users Found:", len(users))

    for user in users:

        print("Checking User:", user.email)

        if not user.reminder_enabled:
            print("Reminders disabled")
            continue

        tasks = (
            db.query(Task)
            .join(Goal)
            .join(Area)
            .filter(
                Area.user_id == user.id,
                Task.completed == False
            )
            .all()
        )

        print("Tasks Found:", len(tasks))

        if len(tasks) == 0:
            continue

        task_list = "\n".join(
            [f"• {task.title}" for task in tasks]
        )

        body = f"""
Hi {user.name},

You still have unfinished tasks:

{task_list}

Current Streak: {user.current_streak}

Complete them before midnight.

- LifeOS
"""

        print(
            "Sending email to:",
            user.email
        )

        send_email(
            user.email,
            "LifeOS Daily Reminder",
            body
        )