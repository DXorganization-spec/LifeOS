from sqlalchemy.orm import Session

from app.models.achievement import Achievement
from app.models.user import User


def unlock_achievement(
    db: Session,
    user: User,
    title: str,
    description: str
):

    existing = (
        db.query(Achievement)
        .filter(
            Achievement.user_id == user.id,
            Achievement.title == title
        )
        .first()
    )

    if not existing:

        achievement = Achievement(
            title=title,
            description=description,
            user_id=user.id
        )

        db.add(achievement)