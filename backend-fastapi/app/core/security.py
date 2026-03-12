from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from authlib.jose import jwt, JoseError
from app.core.config import SECRET_KEY

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
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
    except JoseError:
        return None
