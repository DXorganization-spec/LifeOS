from pydantic import BaseModel


class SettingsUpdate(BaseModel):
    reminder_enabled: bool
    reminder_time: str