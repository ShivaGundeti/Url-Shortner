from fastapi.testclient import TestClient
from main import app

fake_browser = TestClient(app)

def test_root():
    response = fake_browser.get("/")
    assert response.status_code == 200
    assert response.json() == {"Message": "Welcome to the Url shortner API!!"}
