from app.database.database import engine, Base
from app.models.goal import Goal
from app.models.achievement import Achievement
from app.models.user import User
from app.models.area import Area
from app.models.task import Task
from app.models.activity import Activity

print(Base.metadata.tables.keys())

Base.metadata.create_all(bind=engine)

print("Tables Created Successfully")