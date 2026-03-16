from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import JSONResponse
from app.routes.casos_routes import router as casos_router
from app.routes.auth import router as auth_router
from app.routes.sync_routes import router as sync_router
from app.core.config import SECRET_KEY, CORS_ORIGINS, MONGODB_URL
import logging
import sys

# Configurar logging básico
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Validar configuración crítica al arranque
def validate_config():
    missing = []
    if not SECRET_KEY or SECRET_KEY == "unsafe-secret-key":
        logger.warning("SECRET_KEY no está configurada o usa el valor por defecto inseguro.")
    if not MONGODB_URL:
        missing.append("MONGODB_URL")
    
    if missing:
        logger.error(f"Faltan variables de entorno críticas: {', '.join(missing)}")
        # En producción podrías querer detener el arranque:
        # sys.exit(1)

validate_config()

# Crear la aplicación FastAPI
app = FastAPI(
    title="API Casos Médicos",
    description="API para gestionar casos clínicos médicos",
    version="1.0.0"
)

# Exception Handler Global
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Error no manejado en {request.url}: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"ok": False, "message": "Ha ocurrido un error interno inesperado en el servidor."},
    )

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar SessionMiddleware
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY, https_only=True, same_site="none")

# Incluir las rutas
app.include_router(casos_router)
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(sync_router, prefix="/sync", tags=["sync"])

@app.get("/health")
async def health_check():
    """
    Endpoint para verificar el estado de la API.
    """
    return {
        "ok": True,
        "message": "API en funcionamiento"
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("Arrancando servidor FastAPI...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
