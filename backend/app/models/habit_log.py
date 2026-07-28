from sqlalchemy import Column, Boolean, Date, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.database.database import Base


class HabitLog(Base):
    __tablename__ = "habit_logs"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    habit_id = Column(
        UUID(as_uuid=True),
        ForeignKey("habits.id"),
        nullable=False
    )

    date = Column(
        Date,
        nullable=False
    )

    completed = Column(
        Boolean,
        default=True,
        nullable=False
    )

    completed_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )