from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.routes.casos_routes import router as casos_router

# Crear la aplicación FastAPI
app = FastAPI(
    title="API Casos Médicos",
    description="API para gestionar casos clínicos médicos",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes (cambiar en producción)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from starlette.middleware.sessions import SessionMiddleware
from app.routes.auth import router as auth_router
from app.core.config import SECRET_KEY

# Incluir las rutas
app.include_router(casos_router)
app.include_router(auth_router, prefix="/auth", tags=["auth"])

# Configurar SessionMiddleware
app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY)



# Mount frontend (if directory exists, useful for local non-docker testing)
import os
frontend_dir = "../frontend"
if os.path.exists(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
else:
    print(f"Warning: Frontend directory '{frontend_dir}' not found. Skipping mount.")


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
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
