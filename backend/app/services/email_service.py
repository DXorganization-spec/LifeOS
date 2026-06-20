import smtplib
from email.mime.text import MIMEText


def send_email(
    to_email: str,
    subject: str,
    body: str
):
    sender_email = "lifeos.notifications@gmail.com"
    app_password = "hued nsfe udry rrqv"

    msg = MIMEText(body)

    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = to_email

    with smtplib.SMTP(
        "smtp.gmail.com",
        587
    ) as server:

        server.starttls()

        server.login(
            sender_email,
            app_password
        )

        server.send_message(msg)

    return True