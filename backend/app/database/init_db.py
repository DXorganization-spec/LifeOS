from app.database.database import engine, Base

from app.models.user import User
from app.models.area import Area
from app.models.goal import Goal
from app.models.task import Task
from app.models.activity import Activity
from app.models.achievement import Achievement

# NEW
from app.models.habit import Habit
from app.models.habit_log import HabitLog

print(Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully")