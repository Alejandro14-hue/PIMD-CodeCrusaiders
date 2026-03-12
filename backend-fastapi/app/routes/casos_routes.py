from fastapi import APIRouter, HTTPException, Query, Depends
from typing import Optional, List, Generic, TypeVar
from app.services import casos_service
from pydantic import BaseModel, Field
from app.dependencies import get_current_user
import logging

logger = logging.getLogger(__name__)


router = APIRouter(
    prefix="/v1/api", tags=["casos"], dependencies=[Depends(get_current_user)]
)


T = TypeVar("T")


class ResponseMessage(BaseModel, Generic[T]):
    ok: bool
    message: str
    data: Optional[T] = None


class Nota(BaseModel):
    user_id: Optional[str] = None
    precision_diagnostica: Optional[int] = None
    claridad_textual: Optional[int] = None
    relevancia_clinica: Optional[int] = None
    adecuacion_contextual: Optional[int] = None
    nivel_tecnico_adecuado: Optional[int] = None
    comentario: Optional[str] = None


class Caso(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    edad: Optional[str] = None
    sexo: Optional[str] = None
    antecedentes_medicos: Optional[str] = None
    antecedentes_quirurgicos: Optional[str] = None
    habitos: Optional[str] = None
    situacion_basal: Optional[str] = None
    medicacion_actual: Optional[str] = None
    antecedentes_familiares: Optional[str] = None
    motivo: Optional[str] = None
    sintomas: Optional[str] = None
    exploracion_general: Optional[str] = None
    signos: Optional[str] = None
    resultados_pruebas: Optional[str] = None
    razonamiento_clinico: Optional[str] = None
    diagnostico_final: Optional[str] = None
    tratamiento_farmacologico: Optional[str] = None
    tratamiento_no_farmacologico: Optional[str] = None
    factores_sociales: Optional[str] = None
    alergias: Optional[str] = None
    referencias_bibliograficas: Optional[str] = None
    categoria: Optional[str] = None
    keywords: Optional[str] = None
    codigo_cie_10: Optional[str] = None
    dificultad: Optional[str] = None
    chunk_id: Optional[str] = None
    chunk: Optional[str] = None
    notas: Optional[List[Nota]] = []

    class Config:
        populate_by_name = True


@router.get("/", response_model=ResponseMessage[List[Caso]])
async def get_all_casos(
    limit: int = Query(10, description="Número de casos por página", ge=1, le=100),
    offset: int = Query(
        0, description="Número de casos a omitir (para paginación)", ge=0
    ),
):
    try:
        casos = await casos_service.get_all_casos(limit=limit, offset=offset)
        return {"ok": True, "message": "Casos obtenidos correctamente", "data": casos}
    except Exception as e:
        logger.error(f"Error inesperado en get_all_casos: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor al obtener los casos")


@router.get("/random/", response_model=ResponseMessage[List[Caso]])
async def get_random_casos(
    n: int = Query(5, description="Número de casos aleatorios a devolver", ge=1, le=50),
):
    try:
        casos = await casos_service.get_random_casos(n)
        return {
            "ok": True,
            "message": f"{len(casos)} casos aleatorios obtenidos correctamente",
            "data": casos,
        }
    except Exception as e:
        logger.error(f"Error inesperado en get_random_casos: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")


@router.get("/search/", response_model=ResponseMessage[List[Caso]])
async def search_casos(q: str = Query(..., description="Palabra clave para buscar")):
    try:
        casos = await casos_service.search_casos(q)
        if not casos:
            return {
                "ok": False,
                "message": f"No se encontraron resultados para '{q}'",
                "data": [],
            }
        return {"ok": True, "message": f"Búsqueda completada para '{q}'", "data": casos}
    except Exception as e:
        logger.error(f"Error inesperado en search_casos: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")


@router.get("/categoria/{categoria}", response_model=ResponseMessage[List[Caso]])
async def get_casos_by_categoria(categoria: str):
    try:
        casos = await casos_service.get_casos_by_categoria(categoria)
        if not casos:
            raise HTTPException(
                status_code=404,
                detail=f"No se encontraron casos en la categoría '{categoria}'",
            )
        return {
            "ok": True,
            "message": f"Casos de {categoria} obtenidos correctamente",
            "data": casos,
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error inesperado en get_casos_by_categoria: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")


@router.get("/{caso_id}", response_model=ResponseMessage[Caso])
async def get_caso(caso_id: str):
    try:
        caso = await casos_service.get_caso_by_id(caso_id)
        if not caso:
            raise HTTPException(status_code=404, detail="Caso no encontrado")
        return {"ok": True, "message": "Caso obtenido correctamente", "data": caso}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error inesperado en get_caso: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")


@router.post("/{caso_id}/notas", response_model=ResponseMessage[Nota])
async def add_nota(
    caso_id: str, nota: Nota, current_user: dict = Depends(get_current_user)
):
    try:
        nuevo_nota_dict = nota.model_dump()
        nuevo_nota_dict["user_id"] = current_user.get(
            "sub", current_user.get("email", "unknown")
        )

        success = await casos_service.add_nota_to_caso(caso_id, nuevo_nota_dict)

        if not success:
            # Aquí podríamos ser más específicos si el servicio devolviera el tipo de error
            raise HTTPException(
                status_code=400,
                detail="No se pudo guardar la valoración. Verifica que el ID del caso sea correcto o intenta más tarde.",
            )

        return {"ok": True, "message": "Valoración guardada correctamente", "data": nota}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error inesperado en add_nota: {e}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")
