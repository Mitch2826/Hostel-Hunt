import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecret123")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "sqlite:///hostel.db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwtsecret123")

    # CORS configuration
    CORS_HEADERS = 'Content-Type'
    CORS_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]  # Frontend dev server
    CORS_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    CORS_ALLOW_HEADERS = ["Content-Type", "Authorization"]
    CORS_SUPPORTS_CREDENTIALS = True
