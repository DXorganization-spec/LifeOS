from pydantic import BaseModel


class AchievementResponse(BaseModel):
    title: str
    description: str