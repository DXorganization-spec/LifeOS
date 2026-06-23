from datetime import date, timedelta

from app.models.user import User
from app.models.activity import Activity
from app.services.email_service import send_email


def send_weekly_reports(db):

    users = db.query(User).all()

    for user in users:

        seven_days_ago = date.today() - timedelta(days=6)

        activities = (
            db.query(Activity)
            .filter(
                Activity.user_id == user.id,
                Activity.date >= seven_days_ago
            )
            .all()
        )

        tasks_completed = sum(
            activity.count
            for activity in activities
        )

        xp_gained = tasks_completed * 10

        active_days = len(activities)

        productivity_score = min(
            100,
            tasks_completed * 10
        )

        body = f"""
Hi {user.name},

📊 LifeOS Weekly Report

✅ Tasks Completed: {tasks_completed}
⭐ XP Gained: {xp_gained}

🔥 Current Streak: {user.current_streak}
🏆 Longest Streak: {user.longest_streak}

📅 Active Days: {active_days}
📈 Productivity Score: {productivity_score}%

Keep building momentum.

- LifeOS
"""

        send_email(
            user.email,
            "LifeOS Weekly Report",
            body
        )