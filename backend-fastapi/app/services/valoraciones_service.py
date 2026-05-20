from app.core.database import valoraciones_collection
from datetime import datetime
from bson import ObjectId
import logging

logger = logging.getLogger(__name__)


async def upsert_valoracion(caso_id: str, user_id: str, datos: dict) -> dict:
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

    return {**update_data, "_id": doc_id, "fecha": now.isoformat()}


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
