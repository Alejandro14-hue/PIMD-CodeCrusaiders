from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import List
from app.core.security import decode_access_token

# Utilizamos el scheme de OAuth2 de FastAPI. TokenUrl no es crucial aquí pues la 
# autenticación se delega a Google OAuth, pero habilita el botón "Authorize" en Swagger.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/api/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload

class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, user: dict = Depends(get_current_user)):
        user_role = user.get("role", "viewer")
        if user_role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation not permitted"
            )
        return user
