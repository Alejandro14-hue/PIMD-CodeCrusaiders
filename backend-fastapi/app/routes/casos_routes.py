from fastapi import APIRouter, HTTPException, Query
from typing import Optional, Any
from app.services import casos_service
from pydantic import BaseModel

router = APIRouter(prefix="/v1/api", tags=["casos"])


class ResponseMessage(BaseModel):
    ok: bool
    message: str
    data: Optional[Any] = None


@router.get("/")
async def get_all_casos():
    casos = await casos_service.get_all_casos()
    return {
        "ok": True,
        "message": "Casos obtenidos correctamente",
        "data": casos
    }


@router.get("/random/")
async def get_random_casos(n: int = Query(5, description="Número de casos aleatorios a devolver", ge=1, le=50)):
    casos = await casos_service.get_random_casos(n)
    return {
        "ok": True,
        "message": f"{len(casos)} casos aleatorios obtenidos correctamente",
        "data": casos
    }


@router.get("/search/")
async def search_casos(q: str = Query(..., description="Palabra clave para buscar")):
    casos = await casos_service.search_casos(q)
    if not casos:
        return {
            "ok": False,
            "message": f"No se encontraron resultados para '{q}'",
            "data": []
        }
    return {
        "ok": True,
        "message": f"Búsqueda completada para '{q}'",
        "data": casos
    }


@router.get("/categoria/{categoria}")
async def get_casos_by_categoria(categoria: str):
    casos = await casos_service.get_casos_by_categoria(categoria)
    if not casos:
        raise HTTPException(
            status_code=404,
            detail=f"No se encontraron casos en la categoría '{categoria}'"
        )
    return {
        "ok": True,
        "message": f"Casos de {categoria} obtenidos correctamente",
        "data": casos
    }


@router.get("/{caso_id}")
async def get_caso(caso_id: str):
    caso = await casos_service.get_caso_by_id(caso_id)
    if not caso:
        raise HTTPException(
            status_code=404,
            detail="Caso no encontrado"
        )
    return {
        "ok": True,
        "message": "Caso obtenido correctamente",
        "data": caso
    }