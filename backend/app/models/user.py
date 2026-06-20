import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    String,
    Integer,
    DateTime,
    Date,
    Boolean
)

from sqlalchemy.dialects.postgresql import UUID

from app.database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, nullable=False)

    password_hash = Column(String(255), nullable=False)

    xp = Column(Integer, default=0)

    level = Column(Integer, default=1)

    current_streak = Column(Integer, default=0)

    longest_streak = Column(Integer, default=0)

    # Reminder Settings
    reminder_enabled = Column(Boolean, default=True)

    reminder_time = Column(String(10), default="20:00")

    last_activity_date = Column(Date, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)