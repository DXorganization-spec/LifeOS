from sqlalchemy import Column, Date, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.database.database import Base


class Activity(Base):
    __tablename__ = "activities"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    date = Column(
        Date,
        nullable=False
    )

    count = Column(
        Integer,
        default=1
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )