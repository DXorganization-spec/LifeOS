from pydantic import BaseModel


class GoalCreate(BaseModel):
    title: str
    area_id: str


class GoalUpdate(BaseModel):
    title: str