from typing import Optional, List, Dict, Any
from app.core.database import casos_collection
from bson import ObjectId


async def get_all_casos(limit: int = 10, offset: int = 0) -> List[Dict[str, Any]]:
    casos = []
    async for caso in casos_collection.find().skip(offset).limit(limit):
        caso["_id"] = str(caso["_id"])
        casos.append(caso)
    return casos


async def get_caso_by_id(caso_id: str) -> Optional[Dict[str, Any]]:
    try:
        caso = await casos_collection.find_one({"_id": ObjectId(caso_id)})
        if caso:
            caso["_id"] = str(caso["_id"])
        return caso
    except Exception:
        return None


async def get_casos_by_categoria(categoria: str) -> List[Dict[str, Any]]:
    casos = []
    async for caso in casos_collection.find(
        {"categoria": {"$regex": categoria, "$options": "i"}}
    ):
        caso["_id"] = str(caso["_id"])
        casos.append(caso)
    return casos


async def get_random_casos(n: int = 5) -> List[Dict[str, Any]]:
    casos = []
    async for caso in casos_collection.aggregate([{"$sample": {"size": n}}]):
        caso["_id"] = str(caso["_id"])
        casos.append(caso)
    return casos


async def search_casos(keyword: str) -> List[Dict[str, Any]]:
    casos = []
    async for caso in casos_collection.find({
        "$or": [
            {"keywords": {"$regex": keyword, "$options": "i"}},
            {"diagnostico_final": {"$regex": keyword, "$options": "i"}},
            {"motivo": {"$regex": keyword, "$options": "i"}}
        ]
    }):
        caso["_id"] = str(caso["_id"])
        casos.append(caso)
    return casos

async def add_nota_to_caso(caso_id: str, nota: dict) -> bool:
    try:
        # Añade la nota al array 'notas' del caso
        result = await casos_collection.update_one(
            {"_id": ObjectId(caso_id)},
            {"$push": {"notas": nota}}
        )
        return result.modified_count > 0
    except Exception:
        return False