from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.database.database import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    title = Column(
        String,
        nullable=False
    )

    completed = Column(
        Boolean,
        default=False
    )

    goal_id = Column(
        UUID(as_uuid=True),
        ForeignKey("goals.id"),
        nullable=False
    )