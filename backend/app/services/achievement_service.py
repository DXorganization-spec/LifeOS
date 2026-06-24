from app.models.achievement import Achievement
from app.models.task import Task
from app.models.goal import Goal


def check_achievements(db, user):

    unlocked = []

    existing = (
        db.query(Achievement)
        .filter(
            Achievement.user_id == user.id
        )
        .all()
    )

    existing_titles = [
        achievement.title
        for achievement in existing
    ]

    # First Task Completed

    completed_tasks = (
        db.query(Task)
        .join(Goal)
        .count()
    )

    if (
        completed_tasks >= 1
        and "First Task Completed"
        not in existing_titles
    ):

        achievement = Achievement(
            title="First Task Completed",
            description="Completed your first task",
            user_id=user.id
        )

        db.add(achievement)

        unlocked.append(
            "First Task Completed"
        )

    # 100 XP Club

    if (
        user.xp >= 100
        and "100 XP Club"
        not in existing_titles
    ):

        achievement = Achievement(
            title="100 XP Club",
            description="Reached 100 XP",
            user_id=user.id
        )

        db.add(achievement)

        unlocked.append(
            "100 XP Club"
        )

    db.commit()

    return unlocked