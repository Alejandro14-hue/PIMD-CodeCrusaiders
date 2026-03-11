from typing import Optional, List, Dict, Any
from app.core.database import casos_collection
from bson import ObjectId


async def get_all_casos() -> List[Dict[str, Any]]:
    casos = []
    async for caso in casos_collection.find():
        caso["_id"] = str(caso["_id"])
        casos.append(caso)
    return casos


async def get_caso_by_id(caso_id: str) -> Optional[Dict[str, Any]]:
    try:
        caso = await casos_collection.find_one({"_id": ObjectId(caso_id)})
        if caso:
            caso["_id"] = str(caso["_id"])
        return caso
    except:
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