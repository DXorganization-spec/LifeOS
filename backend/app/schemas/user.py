from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    xp: int
    level: int


class UserLogin(BaseModel):
    email: EmailStr
    password: str
