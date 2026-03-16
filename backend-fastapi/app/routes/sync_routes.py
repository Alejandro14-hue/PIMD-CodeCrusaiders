from fastapi import APIRouter, Request, HTTPException
from app.database import casos_collection
import pandas as pd
import os
import io
import httpx
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

HF_TOKEN = os.getenv("HF_TOKEN")
HF_DATASET_URL = "https://huggingface.co/datasets/ilopezmon/casos_clinicos_completos/resolve/main/data/train-00000-of-00001.parquet"
WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET", "changeme")

@router.post("/webhook/huggingface")
async def huggingface_webhook(request: Request):
    # Verificar secret
    secret = request.headers.get("X-Webhook-Secret")
    if secret != WEBHOOK_SECRET:
        raise HTTPException(status_code=401, detail="Unauthorized")

    logger.info("Webhook recibido de Hugging Face, sincronizando dataset...")

    try:
        # Descargar el parquet
        headers = {"Authorization": f"Bearer {HF_TOKEN}"}
        async with httpx.AsyncClient() as client:
            response = await client.get(HF_DATASET_URL, headers=headers, follow_redirects=True)
            response.raise_for_status()

        # Convertir parquet a lista de dicts
        df = pd.read_parquet(io.BytesIO(response.content))
        records = df.to_dict(orient="records")

        # Reemplazar todos los casos en MongoDB
        await casos_collection.delete_many({})
        await casos_collection.insert_many(records)

        logger.info(f"Sincronización completada: {len(records)} casos insertados")
        return {"ok": True, "casos_insertados": len(records)}

    except Exception as e:
        logger.error(f"Error en sincronización: {e}")
        raise HTTPException(status_code=500, detail=str(e))