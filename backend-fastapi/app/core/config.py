import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
SECRET_KEY = os.getenv("SECRET_KEY", "unsafe-secret-key")
OAUTH_REDIRECT_URI = os.getenv("OAUTH_REDIRECT_URI")

# Configuración de CORS
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")

# URL del Frontend para redirecciones
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:8080")
