from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.dependencies import get_current_user
from app.services import chatbot_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/v1/conversations",
    tags=["conversations"],
    dependencies=[Depends(get_current_user)],
)


class Mensaje(BaseModel):
    role: str
    content: str


class ConversacionCreate(BaseModel):
    mensajes: List[Mensaje]
    titulo: Optional[str] = None


class ConversacionUpdate(BaseModel):
    mensajes: List[Mensaje]


@router.get("/")
async def get_conversations(current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("sub") or current_user.get("email")
    conversations = await chatbot_service.get_conversaciones_by_user(user_id)
    return {"ok": True, "data": conversations}


@router.post("/")
async def create_conversation(
    body: ConversacionCreate,
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub") or current_user.get("email")
    mensajes = [m.model_dump() for m in body.mensajes]
    titulo = (
        body.titulo
        or next((m["content"][:60] for m in mensajes if m["role"] == "user"), "Nueva conversación")
    )
    conv_id = await chatbot_service.create_conversacion(user_id, mensajes, titulo)
    return {"ok": True, "data": {"id": conv_id}}


@router.put("/{conv_id}")
async def update_conversation(
    conv_id: str,
    body: ConversacionUpdate,
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub") or current_user.get("email")
    mensajes = [m.model_dump() for m in body.mensajes]
    success = await chatbot_service.update_conversacion(conv_id, mensajes, user_id)
    if not success:
        raise HTTPException(status_code=404, detail="Conversación no encontrada")
    return {"ok": True}


@router.get("/{conv_id}")
async def get_conversation(
    conv_id: str,
    current_user: dict = Depends(get_current_user),
):
    user_id = current_user.get("sub") or current_user.get("email")
    conv = await chatbot_service.get_conversacion_by_id(conv_id, user_id)
    if not conv:
        raise HTTPException(status_code=404, detail="Conversación no encontrada")
    return {"ok": True, "data": conv}
