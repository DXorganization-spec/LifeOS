from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    goal_id: str


class TaskUpdate(BaseModel):
    title: str