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
        .order_by(Activity.date.asc())
        .all()
    )

    activity_map = {
        activity.date: activity.count
        for activity in activities
    }

    today = date.today()

    minimum_start = today - timedelta(days=30)

    if activities:
        first_activity = activities[0].date

        # Show at least the last 30 days,
        # or start from the user's first activity
        start_date = min(first_activity, minimum_start)
    else:
        start_date = minimum_start

    data = []

    current_day = start_date

    while current_day <= today:
        data.append(
            {
                "id": str(current_day),
                "date": current_day.strftime("%Y-%m-%d"),
                "count": activity_map.get(current_day, 0),
            }
        )

        current_day += timedelta(days=1)

    return data
