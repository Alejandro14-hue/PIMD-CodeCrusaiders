from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List, Dict, Any
from app.services import casos_service
from pydantic import BaseModel

router = APIRouter(prefix="/v1/api", tags=["casos"])


# Modelos Pydantic para las respuestas
class CasoResponse(BaseModel):
    id: int
    edad: str
    sexo: str
    diagnostico_final: str
    categoria: str

    class Config:
        from_attributes = True


class ResponseMessage(BaseModel):
    ok: bool
    message: str
    data: Optional[Any] = None


@router.get("/")
async def get_all_casos():
    """
    Obtiene todos los casos.
    
    Returns:
        JSON con la lista de todos los casos
    """
    casos = casos_service.get_all_casos()
    
    return {
        "ok": True,
        "message": "Casos obtenidos correctamente",
        "data": casos
    }


@router.get("/search/")
async def search_casos(q: str = Query(..., description="Palabra clave para buscar")):
    """
    Busca casos por palabra clave.
    
    Args:
        q: Palabra clave de búsqueda
        
    Returns:
        JSON con la lista de casos que coinciden
    """
    casos = casos_service.search_casos(q)
    
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
    """
    Obtiene todos los casos de una categoría específica.
    
    Args:
        categoria: Categoría de los casos
        
    Returns:
        JSON con la lista de casos de la categoría
    """
    casos = casos_service.get_casos_by_categoria(categoria)
    
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


@router.get("/{caso_id}", response_model=ResponseMessage)
async def get_caso(caso_id: int):
    """
    Obtiene un caso específico por su ID.
    
    Args:
        caso_id: ID del caso a obtener
        
    Returns:
        JSON con los datos del caso
    """
    caso = casos_service.get_caso_by_id(caso_id)
    
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
