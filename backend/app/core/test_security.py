from app.core.security import hash_password

password = "aditya123"

hashed = hash_password(password)

print(hashed)