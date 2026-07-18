import os
import smtplib
from email.mime.text import MIMEText

from dotenv import load_dotenv

load_dotenv()


def get_email_settings():
    sender_email = os.getenv("SMTP_SENDER_EMAIL")
    app_password = os.getenv("SMTP_APP_PASSWORD")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))

    if not sender_email or not app_password:
        raise RuntimeError(
            "SMTP_SENDER_EMAIL and SMTP_APP_PASSWORD must be set"
        )

    return sender_email, app_password, smtp_host, smtp_port


def send_email(
    to_email: str,
    subject: str,
    body: str
):
    sender_email, app_password, smtp_host, smtp_port = (
        get_email_settings()
    )

    msg = MIMEText(body)

    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    with smtplib.SMTP(
        smtp_host,
        smtp_port
    ) as server:

        server.starttls()

        server.login(
            sender_email,
            app_password
        )

        server.send_message(msg)

    return True
