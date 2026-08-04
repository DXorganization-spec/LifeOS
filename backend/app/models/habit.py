from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from sqlalchemy.orm import relationship

from app.database.database import Base


class Habit(Base):
    __tablename__ = "habits"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    title = Column(String, nullable=False)

    description = Column(String, nullable=True)

    goal_id = Column(UUID(as_uuid=True), ForeignKey("goals.id"), nullable=False)

    frequency = Column(String, nullable=False, default="Daily")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    logs = relationship(
        "HabitLog", back_populates="habit", cascade="all, delete-orphan"
    )
