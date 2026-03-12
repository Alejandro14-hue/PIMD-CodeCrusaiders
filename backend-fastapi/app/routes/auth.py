from fastapi import APIRouter, Request
from starlette.responses import RedirectResponse, JSONResponse
from authlib.integrations.starlette_client import OAuth
from app.core.config import (
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    OAUTH_REDIRECT_URI,
    FRONTEND_URL,
)

router = APIRouter()

oauth = OAuth()
oauth.register(
    name="google",
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)

import logging

logger = logging.getLogger(__name__)


@router.get("/login")
async def login(request: Request):
    if OAUTH_REDIRECT_URI:
        redirect_uri = OAUTH_REDIRECT_URI
    else:
        try:
            redirect_uri = request.url_for("auth_callback")
        except Exception as e:
            logger.error(f"Error al generar redirect_uri: {e}")
            return RedirectResponse(url=f"{FRONTEND_URL}?error=config_error")

    logger.info(f"Iniciando flujo de login, redirect_uri: {redirect_uri}")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/callback")
async def auth_callback(request: Request):
    logger.info("Recibido callback de OAuth")
    try:
        token = await oauth.google.authorize_access_token(request)
        if not token:
            logger.error("No se recibió token en el callback")
            return RedirectResponse(url=f"{FRONTEND_URL}?error=no_token")

        user = token.get("userinfo")
        if user:
            request.session["user"] = user
            logger.info(f"Usuario autenticado correctamente: {user.get('email')}")

            from app.core.security import create_access_token

            # Generar token JWT interno
            jwt_token = create_access_token(
                data={"sub": user["sub"], "email": user["email"], "role": "admin"}
            )
            return RedirectResponse(url=f"{FRONTEND_URL}?token={jwt_token}")

        logger.error("No se pudo obtener información del usuario desde el token")
        return RedirectResponse(url=f"{FRONTEND_URL}?error=user_info_missing")
    except Exception as e:
        logger.error(f"Error crítico en el callback de autenticación: {e}", exc_info=True)
        return RedirectResponse(url=f"{FRONTEND_URL}?error=auth_failed")


@router.get("/logout")
async def logout(request: Request):
    logger.info("Usuario cerrando sesión")
    request.session.pop("user", None)
    return RedirectResponse(url=FRONTEND_URL)


@router.get("/me")
async def me(request: Request):
    user = request.session.get("user")
    if user:
        return user
    logger.warning("Intento de acceso a /me sin sesión activa")
    return JSONResponse(status_code=401, content={"error": "Not authenticated"})
