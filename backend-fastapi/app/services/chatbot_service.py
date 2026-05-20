from app.core.database import conversaciones_collection
from datetime import datetime
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)


async def get_conversaciones_by_user(user_id: str) -> list:
    cursor = conversaciones_collection.find(
        {"user_id": user_id},
        {"mensajes": 0},
    ).sort("actualizado_en", -1)
    result = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        result.append(doc)
    return result


async def create_conversacion(user_id: str, mensajes: list, titulo: str) -> str:
    now = datetime.utcnow()
    doc = {
        "user_id": user_id,
        "titulo": titulo,
        "mensajes": mensajes,
        "creado_en": now,
        "actualizado_en": now,
    }
    result = await conversaciones_collection.insert_one(doc)
    return str(result.inserted_id)


async def update_conversacion(conv_id: str, mensajes: list, user_id: str) -> bool:
    try:
        result = await conversaciones_collection.update_one(
            {"_id": ObjectId(conv_id), "user_id": user_id},
            {"$set": {"mensajes": mensajes, "actualizado_en": datetime.utcnow()}},
        )
        return result.modified_count > 0
    except Exception as e:
        logger.error(f"Error actualizando conversación {conv_id}: {e}")
        return False


async def get_conversacion_by_id(conv_id: str, user_id: str) -> dict | None:
    try:
        doc = await conversaciones_collection.find_one(
            {"_id": ObjectId(conv_id), "user_id": user_id}
        )
        if doc:
            doc["_id"] = str(doc["_id"])
        return doc
    except Exception as e:
        logger.error(f"Error obteniendo conversación {conv_id}: {e}")
        return None
