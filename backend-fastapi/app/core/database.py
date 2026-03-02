from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import MONGODB_URL

client = AsyncIOMotorClient(MONGODB_URL)
db = client.casos_clinicos
casos_collection = db.casos