import json
import os
from typing import Optional, List, Dict, Any

# Ruta al archivo JSON
CASOS_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "casos.json")


def load_casos() -> List[Dict[str, Any]]:
    """
    Carga todos los casos desde el archivo JSON.
    """
    try:
        with open(CASOS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []


def get_caso_by_id(caso_id: int) -> Optional[Dict[str, Any]]:
    """
    Obtiene un caso específico por su ID.
    
    Args:
        caso_id: ID del caso a buscar
        
    Returns:
        Diccionario con los datos del caso o None si no existe
    """
    casos = load_casos()
    caso = next((c for c in casos if c.get("id") == caso_id), None)
    return caso


def get_all_casos() -> List[Dict[str, Any]]:
    """
    Obtiene todos los casos.
    
    Returns:
        Lista de todos los casos
    """
    return load_casos()


def get_casos_by_categoria(categoria: str) -> List[Dict[str, Any]]:
    """
    Obtiene todos los casos de una categoría específica.
    
    Args:
        categoria: Categoría a filtrar
        
    Returns:
        Lista de casos de la categoría
    """
    casos = load_casos()
    return [c for c in casos if c.get("categoria", "").lower() == categoria.lower()]


def search_casos(keyword: str) -> List[Dict[str, Any]]:
    """
    Busca casos por keyword.
    
    Args:
        keyword: Palabra clave a buscar
        
    Returns:
        Lista de casos que coinciden con la búsqueda
    """
    casos = load_casos()
    keyword_lower = keyword.lower()
    return [
        c for c in casos 
        if keyword_lower in c.get("keywords", "").lower() 
        or keyword_lower in c.get("diagnostico_final", "").lower()
        or keyword_lower in c.get("motivo", "").lower()
    ]
