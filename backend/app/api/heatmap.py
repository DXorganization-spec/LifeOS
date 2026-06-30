
from datetime import date, timedelta

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

    activity_map = {
        activity.date: activity.count
        for activity in activities
    }

    today = date.today()

    data = []

    for i in range(364, -1, -1):
        day = today - timedelta(days=i)

        data.append(
            {
                "id": str(day),
                "date": day.strftime(
                    "%Y-%m-%d"
                ),
                "count": activity_map.get(
                    day,
                    0
                ),
            }
        )

    return data

