from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.task import Task
from app.models.goal import Goal
from app.models.area import Area
from app.models.user import User
from app.core.auth import get_current_user
from datetime import date, timedelta
from app.services.achievements import unlock_achievement
from app.models.activity import Activity
from app.schemas.task import TaskCreate, TaskUpdate
from app.models.activity import Activity
from datetime import date

router = APIRouter()


@router.post("/tasks")
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    goal = (
        db.query(Goal)
        .join(Area)
        .filter(Goal.id == task.goal_id, Area.user_id == current_user.id)
        .first()
    )

    if not goal:
        return {"message": "Goal not found"}

    new_task = Task(title=task.title, goal_id=task.goal_id)

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {
        "id": str(new_task.id),
        "title": new_task.title,
        "completed": new_task.completed,
    }


@router.get("/tasks")
def get_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    tasks = (
        db.query(Task)
        .join(Goal)
        .join(Area)
        .filter(Area.user_id == current_user.id)
        .all()
    )

    return tasks


@router.patch("/tasks/{task_id}/complete")
def complete_task(
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    task = (
        db.query(Task)
        .join(Goal)
        .join(Area)
        .filter(Task.id == task_id, Area.user_id == current_user.id)
        .first()
    )

    if not task:
        return {"message": "Task not found"}

    if task.completed:
        return {"message": "Task already completed"}

    task.completed = True
    db.flush()

    # First Task Achievement
    unlock_achievement(
        db,
        current_user,
        "First Task Completed",
        "Completed your first task",
    )

    # XP
    current_user.xp += 10

    if current_user.xp >= 100:
        unlock_achievement(
            db,
            current_user,
            "100 XP Club",
            "Reached 100 XP",
        )

    if current_user.xp >= 500:
        unlock_achievement(
            db,
            current_user,
            "500 XP Club",
            "Reached 500 XP",
        )

    # Level
    current_user.level = (current_user.xp // 100) + 1

    # Streak Logic
    today = date.today()

    if current_user.last_activity_date is None:
        current_user.current_streak = 1

    elif current_user.last_activity_date == (today - timedelta(days=1)):
        current_user.current_streak += 1

    elif current_user.last_activity_date != today:
        current_user.current_streak = 1

    if current_user.current_streak > current_user.longest_streak:
        current_user.longest_streak = current_user.current_streak

    current_user.last_activity_date = today

    # Streak Achievements
    if current_user.current_streak >= 7:
        unlock_achievement(
            db,
            current_user,
            "7 Day Streak",
            "Maintained a 7 day streak",
        )

    if current_user.current_streak >= 30:
        unlock_achievement(
            db,
            current_user,
            "30 Day Streak",
            "Maintained a 30 day streak",
        )

    # Activity Tracking
    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id, Activity.date == today)
        .first()
    )

    if activity:
        activity.count += 1

    else:
        activity = Activity(
            user_id=current_user.id,
            date=today,
            count=1,
        )

        db.add(activity)

    # Goal Crusher Achievement
    total_tasks = db.query(Task).filter(Task.goal_id == task.goal_id).count()

    completed_tasks = (
        db.query(Task)
        .filter(Task.goal_id == task.goal_id, Task.completed == True)
        .count()
    )

    print("Goal Crusher:", total_tasks, completed_tasks, task.goal_id)

    if total_tasks > 0 and completed_tasks == total_tasks:
        unlock_achievement(
            db,
            current_user,
            "Goal Crusher",
            "Completed an entire goal",
        )

    db.commit()

    return {
        "message": "Task completed",
        "xp": current_user.xp,
        "level": current_user.level,
        "current_streak": current_user.current_streak,
        "longest_streak": current_user.longest_streak,
    }


@router.put("/tasks/{task_id}")
def update_task(
    task_id: str,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    task = (
        db.query(Task)
        .join(Goal)
        .join(Area)
        .filter(Task.id == task_id, Area.user_id == current_user.id)
        .first()
    )

    if not task:
        return {"message": "Task not found"}

    task.title = task_data.title

    db.commit()

    return {"message": "Task updated"}


@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    task = (
        db.query(Task)
        .join(Goal)
        .join(Area)
        .filter(Task.id == task_id, Area.user_id == current_user.id)
        .first()
    )

    if not task:
        return {"message": "Task not found"}

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}


@router.put("/tasks/{task_id}/complete")
def complete_task(
    task_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    task = (
        db.query(Task)
        .join(Goal)
        .join(Area)
        .filter(Task.id == task_id, Area.user_id == current_user.id)
        .first()
    )

    if not task:
        return {"message": "Task not found"}

    if task.completed:
        return {"message": "Already completed"}

    task.completed = True

    current_user.xp += 10

    if current_user.xp >= current_user.level * 100:
        current_user.level += 1

    today = date.today()

    activity = (
        db.query(Activity)
        .filter(Activity.user_id == current_user.id, Activity.date == today)
        .first()
    )

    if activity:
        activity.count += 1
    else:
        activity = Activity(user_id=current_user.id, date=today, count=1)
        db.add(activity)

    db.commit()

    return {
        "message": "Task completed",
        "xp": current_user.xp,
        "level": current_user.level,
    }
