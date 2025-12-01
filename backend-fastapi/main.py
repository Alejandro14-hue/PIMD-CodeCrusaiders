from fastapi import FastAPI
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

# Incluir las rutas
app.include_router(casos_router)


@app.get("/")
async def root():
    """
    Endpoint raíz que devuelve información de la API.
    """
    return {
        "ok": True,
        "message": "Bienvenido a la API de Casos Médicos",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }


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
