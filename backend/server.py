from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

app = FastAPI(title="Noir & Or — Fine Dining API")
api_router = APIRouter(prefix="/api")


# ─────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────
class Reservation(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    date: str  # YYYY-MM-DD
    time: str  # HH:MM
    guests: int
    occasion: Optional[str] = None
    notes: Optional[str] = None
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ReservationCreate(BaseModel):
    name: str
    email: str
    phone: str
    date: str
    time: str
    guests: int
    occasion: Optional[str] = None
    notes: Optional[str] = None


class ChatMessage(BaseModel):
    role: str  # 'user' | 'assistant'
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    message: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str


class NewsletterSignup(BaseModel):
    email: str


# ─────────────────────────────────────────────────────────────
# Static menu (used by AI + frontend)
# ─────────────────────────────────────────────────────────────
MENU = {
    "prelude": [
        {"name": "Smoked Oyster Mignonette", "price": 28, "notes": "applewood smoke, champagne pearls, finger lime"},
        {"name": "Caviar & Buckwheat Blini", "price": 65, "notes": "ossetra caviar, crème fraîche, gold leaf"},
        {"name": "Charred Hokkaido Scallop", "price": 36, "notes": "burnt butter, yuzu kosho, sea grape"},
    ],
    "earth": [
        {"name": "Truffled Risotto Nero", "price": 48, "notes": "carnaroli, périgord truffle, aged parmesan"},
        {"name": "Heirloom Beet Tartare", "price": 32, "notes": "smoked egg yolk, horseradish ash, sourdough crisp"},
        {"name": "Forest Mushroom Velouté", "price": 30, "notes": "porcini foam, hazelnut praline, thyme oil"},
    ],
    "fire": [
        {"name": "A5 Wagyu, Bone Marrow Reduction", "price": 145, "notes": "binchotan-grilled, smoked salt, charred shallot"},
        {"name": "Black Cod, Miso & Sake Kasu", "price": 78, "notes": "48hr cured, pickled daikon, shiso oil"},
        {"name": "Crown Rack of Lamb", "price": 92, "notes": "merguez crust, pomegranate jus, harissa yoghurt"},
    ],
    "finale": [
        {"name": "Molten Valrhona Soufflé", "price": 28, "notes": "70% guanaja, vanilla bourbon ice cream"},
        {"name": "Gold Leaf Tiramisu", "price": 26, "notes": "espresso reduction, mascarpone cloud, 23k gold"},
        {"name": "Yuzu Cheesecake Sphere", "price": 24, "notes": "white chocolate shell, raspberry coulis, basil"},
    ],
}


def _menu_text() -> str:
    lines = []
    for course, items in MENU.items():
        lines.append(f"\n{course.upper()}:")
        for it in items:
            lines.append(f"  • {it['name']} (${it['price']}) — {it['notes']}")
    return "\n".join(lines)


CHEF_SYSTEM = f"""You are Maître Aurelio, the AI sommelier and executive chef concierge of NOIR & OR — a Michelin-tier fine-dining experience.

Personality: poetic, refined, briefly witty. Never verbose — answer in 2–4 short paragraphs maximum. You speak of food the way a sommelier speaks of wine: sensory, evocative, precise.

You can:
• Recommend dishes from the menu below based on the guest's mood, dietary needs, allergies, or pairings.
• Suggest wine or non-alcoholic pairings (invent gracefully if asked).
• Describe the philosophy of a dish, its provenance, technique, and why it sings.
• Guide guests toward a reservation when appropriate. Never push.

Rules:
• Stay strictly in character.
• Use the menu items by their exact names when recommending.
• If asked something off-topic (politics, code, etc.), gracefully redirect back to dining.
• Keep replies under ~120 words unless the guest explicitly asks for depth.

Tonight's tasting selection:
{_menu_text()}
"""


# ─────────────────────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"name": "Noir & Or", "status": "open"}


@api_router.get("/menu")
async def get_menu():
    return MENU


@api_router.post("/reservations", response_model=Reservation)
async def create_reservation(payload: ReservationCreate):
    res = Reservation(**payload.model_dump())
    doc = res.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.reservations.insert_one(doc)
    return res


@api_router.get("/reservations", response_model=List[Reservation])
async def list_reservations():
    docs = await db.reservations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            try:
                d['created_at'] = datetime.fromisoformat(d['created_at'])
            except ValueError:
                d['created_at'] = datetime.now(timezone.utc)
    return docs


@api_router.post("/newsletter")
async def subscribe(payload: NewsletterSignup):
    await db.newsletter.update_one(
        {"email": payload.email},
        {"$set": {"email": payload.email, "subscribed_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True, "message": "Welcome to the inner circle."}


# ─── AI Chef ───────────────────────────────────────────────────
@api_router.post("/chef/chat", response_model=ChatResponse)
async def chef_chat(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    session_id = req.session_id or str(uuid.uuid4())

    # Persist incoming user message
    await db.chef_messages.insert_one({
        "session_id": session_id,
        "role": "user",
        "content": req.message,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=CHEF_SYSTEM,
        ).with_model("openai", "gpt-4o-mini")

        # Rehydrate history so the chat stays multi-turn across requests
        history = await db.chef_messages.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1).to_list(50)

        # Send only the latest user message; emergentintegrations manages history
        # within a single LlmChat instance, but for multi-request continuity we
        # send a contextual prompt that includes prior turns (compact).
        context_lines = []
        for m in history[-12:-1]:  # exclude the just-inserted message
            who = "Guest" if m["role"] == "user" else "Maître Aurelio"
            context_lines.append(f"{who}: {m['content']}")
        context = "\n".join(context_lines)

        prompt = req.message if not context else f"Prior conversation:\n{context}\n\nGuest: {req.message}"

        reply = await chat.send_message(UserMessage(text=prompt))
    except Exception as e:
        logging.exception("LLM call failed")
        raise HTTPException(status_code=502, detail=f"AI temporarily unavailable: {str(e)[:120]}")

    await db.chef_messages.insert_one({
        "session_id": session_id,
        "role": "assistant",
        "content": reply,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })

    return ChatResponse(session_id=session_id, reply=reply)


@api_router.get("/chef/history/{session_id}")
async def chef_history(session_id: str):
    msgs = await db.chef_messages.find(
        {"session_id": session_id},
        {"_id": 0}
    ).sort("timestamp", 1).to_list(200)
    return {"session_id": session_id, "messages": msgs}


# Mount router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
