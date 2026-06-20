from pydantic import BaseModel


class AreaCreate(BaseModel):
    name: str


class AreaUpdate(BaseModel):
    name: str