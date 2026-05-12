"""Backend tests for Noir & Or fine-dining API."""
import os
import time
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback: read frontend .env directly (testing context)
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except FileNotFoundError:
        pass

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ── Root / Menu ──────────────────────────────────────────────
class TestRootAndMenu:
    def test_root(self, client):
        r = client.get(f"{API}/", timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("name") == "Noir & Or"
        assert data.get("status") == "open"

    def test_menu_structure(self, client):
        r = client.get(f"{API}/menu", timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        for course in ["prelude", "earth", "fire", "finale"]:
            assert course in data, f"missing course {course}"
            assert isinstance(data[course], list) and len(data[course]) > 0
            for item in data[course]:
                assert "name" in item and isinstance(item["name"], str)
                assert "price" in item and isinstance(item["price"], (int, float))
                assert "notes" in item and isinstance(item["notes"], str)


# ── Reservations ─────────────────────────────────────────────
class TestReservations:
    def test_create_and_list(self, client):
        payload = {
            "name": "TEST_Guest Alpha",
            "email": "test_alpha@example.com",
            "phone": "+15555550101",
            "date": "2026-12-31",
            "time": "20:00",
            "guests": 2,
            "occasion": "anniversary",
            "notes": "TEST allergy: peanuts",
        }
        r = client.post(f"{API}/reservations", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["guests"] == 2
        assert data["status"] == "pending"
        created_id = data["id"]

        # Verify list contains it
        r2 = client.get(f"{API}/reservations", timeout=20)
        assert r2.status_code == 200
        listing = r2.json()
        assert isinstance(listing, list)
        ids = [d["id"] for d in listing]
        assert created_id in ids

    def test_invalid_reservation_missing_field(self, client):
        bad = {"name": "TEST_x", "email": "x@example.com"}
        r = client.post(f"{API}/reservations", json=bad, timeout=20)
        assert r.status_code == 422


# ── Newsletter ───────────────────────────────────────────────
class TestNewsletter:
    def test_subscribe_idempotent_upsert(self, client):
        email = f"test_news_{uuid.uuid4().hex[:6]}@example.com"
        r1 = client.post(f"{API}/newsletter", json={"email": email}, timeout=20)
        assert r1.status_code == 200, r1.text
        assert r1.json().get("ok") is True
        # second time — should not error
        r2 = client.post(f"{API}/newsletter", json={"email": email}, timeout=20)
        assert r2.status_code == 200
        assert r2.json().get("ok") is True


# ── Chef AI Chat ─────────────────────────────────────────────
class TestChefChat:
    def test_chat_and_followup_and_history(self, client):
        # 1st turn
        r1 = client.post(
            f"{API}/chef/chat",
            json={"message": "Recommend a dessert from your finale course."},
            timeout=60,
        )
        assert r1.status_code == 200, r1.text
        d1 = r1.json()
        assert "session_id" in d1 and len(d1["session_id"]) > 0
        assert "reply" in d1 and isinstance(d1["reply"], str) and len(d1["reply"]) > 5
        sid = d1["session_id"]
        first_reply = d1["reply"]

        # 2nd turn — follow up (context retention)
        time.sleep(1)
        r2 = client.post(
            f"{API}/chef/chat",
            json={"session_id": sid, "message": "What wine would pair with it?"},
            timeout=60,
        )
        assert r2.status_code == 200, r2.text
        d2 = r2.json()
        assert d2["session_id"] == sid
        assert isinstance(d2["reply"], str) and len(d2["reply"]) > 5

        # history must contain user + assistant turns chronologically
        r3 = client.get(f"{API}/chef/history/{sid}", timeout=20)
        assert r3.status_code == 200, r3.text
        h = r3.json()
        assert h["session_id"] == sid
        msgs = h["messages"]
        # 2 user + 2 assistant = 4
        assert len(msgs) >= 4
        roles = [m["role"] for m in msgs]
        assert roles[0] == "user"
        assert roles[1] == "assistant"
        assert roles[2] == "user"
        assert roles[3] == "assistant"
        # chronological order
        ts = [m["timestamp"] for m in msgs]
        assert ts == sorted(ts)
        # first assistant reply persisted
        assert msgs[1]["content"] == first_reply
