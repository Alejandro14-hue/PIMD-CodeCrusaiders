from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import MONGODB_URL

client = AsyncIOMotorClient(MONGODB_URL)
db = client.codecrusaders
casos_collection = db.casos