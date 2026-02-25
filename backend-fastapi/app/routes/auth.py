from fastapi import APIRouter, Request
from authlib.integrations.starlette_client import OAuth
from app.core.config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OAUTH_REDIRECT_URI
from starlette.responses import RedirectResponse

router = APIRouter()

oauth = OAuth()
oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

import logging

logger = logging.getLogger(__name__)

@router.get('/login')
async def login(request: Request):
    if OAUTH_REDIRECT_URI:
        redirect_uri = OAUTH_REDIRECT_URI
    else:
        redirect_uri = request.url_for('auth_callback')
    
    logger.info(f"Logging in, redirect_uri: {redirect_uri}")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get('/callback')
async def auth_callback(request: Request):
    logger.info("Callback received")
    try:
        token = await oauth.google.authorize_access_token(request)
        logger.info(f"Token received: {token}")
        user = token.get('userinfo')
        if user:
            request.session['user'] = user
            logger.info(f"User authenticated: {user.get('email')}")
        return RedirectResponse(url='/pages/casos.html')
    except Exception as e:
        logger.error(f"Error in callback: {e}")
        return {"error": str(e)}

@router.get('/logout')
async def logout(request: Request):
    request.session.pop('user', None)
    return RedirectResponse(url='/')

@router.get('/me')
async def me(request: Request):
    user = request.session.get('user')
    logger.info(f"Me endpoint called, user: {user}")
    if user:
        return user
    return {"error": "Not authenticated"}
