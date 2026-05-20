from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from app.dependencies import get_current_user
from app.services import valoraciones_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/v1/valoraciones",
    tags=["valoraciones"],
    dependencies=[Depends(get_current_user)],
)


class ValoracionIn(BaseModel):
    caso_id: str
    precision_diagnostica: int = Field(..., ge=1, le=5)
    claridad_textual: int = Field(..., ge=1, le=5)
    relevancia_clinica: int = Field(..., ge=1, le=5)
    adecuacion_contextual: int = Field(..., ge=1, le=5)
    nivel_tecnico_adecuado: int = Field(..., ge=1, le=5)
    comentario: Optional[str] = None


@router.get("/")
async def get_all_valoraciones():
    docs = await valoraciones_service.get_all_valoraciones()
    return {"ok": True, "data": docs, "total": len(docs)}


@router.post("/")
async def submit_valoracion(
    body: ValoracionIn,
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub") or current_user.get("email")
    datos = body.model_dump(exclude={"caso_id"})
    result = await valoraciones_service.upsert_valoracion(body.caso_id, user_id, datos)
    return {"ok": True, "data": result}


@router.get("/{caso_id}/me")
async def get_my_valoracion(
    caso_id: str,
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub") or current_user.get("email")
    doc = await valoraciones_service.get_valoracion_usuario(caso_id, user_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Sin valoración previa")
    return {"ok": True, "data": doc}


@router.get("/{caso_id}")
async def get_valoraciones_caso(caso_id: str):
    docs = await valoraciones_service.get_valoraciones_by_caso(caso_id)
    return {"ok": True, "data": docs, "total": len(docs)}
