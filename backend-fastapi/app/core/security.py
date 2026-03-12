import logging
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from authlib.jose import jwt, JoseError
from app.core.config import SECRET_KEY

# Configurar logging
logger = logging.getLogger(__name__)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    logger.info(f"Creando token de acceso para: {data.get('email', 'unknown')}")
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": int(expire.timestamp())})
    header = {"alg": ALGORITHM}
    
    # authlib.jose.jwt.encode returns bytes
    encoded_jwt = jwt.encode(header, to_encode, SECRET_KEY)
    return encoded_jwt.decode('utf-8')

def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        claims = jwt.decode(token, SECRET_KEY)
        claims.validate()  # Validates exp, etc.
        return claims
    except JoseError as e:
        logger.warning(f"Fallo en la validación del token JWT: {e}")
        return None
    except Exception as e:
        logger.error(f"Error inesperado al decodificar token JWT: {e}")
        return None
