from pydantic import BaseModel


class HabitCreate(BaseModel):
    title: str
    description: str | None = None
    goal_id: str
    frequency: str


class HabitUpdate(BaseModel):
    title: str
    description: str | None = None
    frequency: str


class HabitResponse(BaseModel):
    id: str
    title: str
    description: str | None = None
    goal_id: str
    frequency: str