from fastapi import Request
from starlette.responses import JSONResponse

def test_health_check(client):

    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"ok": True, "message": "API en funcionamiento"}

def test_me_unauthenticated(client):
  
    response = client.get("/auth/me")
    assert response.status_code == 401
    assert response.json() == {"error": "Not authenticated"}

def test_me_authenticated_mock(client, monkeypatch):
  
    from app.routes.auth import me
    
    class MockRequest:
        def __init__(self, session_data):
            self.session = session_data
            
    async def run_test():
        mock_user = {"email": "test@example.com", "name": "Test User"}
        request = MockRequest({"user": mock_user})
        response = await me(request)
        assert response == mock_user

    import asyncio
    asyncio.run(run_test())
