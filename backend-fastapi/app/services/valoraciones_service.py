from app.core.database import valoraciones_collection
from app.core.config import N8N_WEBHOOK_URL
from datetime import datetime
from bson import ObjectId
import httpx
import logging

logger = logging.getLogger(__name__)


async def upsert_valoracion(caso_id: str, user_id: str, datos: dict) -> dict:
    """Crea o actualiza la valoración de un usuario para un caso (una por usuario/caso)."""
    now = datetime.utcnow()
    update_data = {**datos, "caso_id": caso_id, "user_id": user_id, "fecha": now}

    result = await valoraciones_collection.update_one(
        {"caso_id": caso_id, "user_id": user_id},
        {"$set": update_data, "$setOnInsert": {"creado_en": now}},
        upsert=True,
    )

    doc_id = str(result.upserted_id) if result.upserted_id else None
    if not doc_id:
        doc = await valoraciones_collection.find_one({"caso_id": caso_id, "user_id": user_id})
        doc_id = str(doc["_id"]) if doc else None

    payload = {**update_data, "_id": doc_id, "fecha": now.isoformat()}
    await _notify_n8n(payload)
    return payload


async def get_valoracion_usuario(caso_id: str, user_id: str) -> dict | None:
    doc = await valoraciones_collection.find_one({"caso_id": caso_id, "user_id": user_id})
    if doc:
        doc["_id"] = str(doc["_id"])
    return doc


async def get_valoraciones_by_caso(caso_id: str) -> list:
    cursor = valoraciones_collection.find({"caso_id": caso_id}).sort("fecha", -1)
    result = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        result.append(doc)
    return result


async def _notify_n8n(payload: dict):
    if not N8N_WEBHOOK_URL:
        return
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            await client.post(N8N_WEBHOOK_URL, json=payload)
    except Exception as e:
        # No bloqueamos la respuesta si n8n falla
        logger.warning(f"No se pudo notificar a n8n: {e}")
