# Noir & Or — Fine Dining Website (PRD)

## Original Problem Statement
"i want website for reasturent i wnat like fully animatice total web i wnat animation dna 3d animation makeit and ai diffrent ui i want ithwan uniqe deginimexpectin nda make it make it deffent and exlent dgine ake it"

→ Interpreted as: a fully animated, uniquely designed, AI-augmented restaurant website with a 3D feel.

## Architecture
- **Stack**: React 19 + FastAPI + MongoDB
- **Animation**: Framer Motion (scroll reveals, layout transitions) + custom canvas-based 3D-feel gold particle field
- **AI**: Emergent LLM Universal Key with OpenAI gpt-4o-mini via `emergentintegrations.llm.chat.LlmChat`
- **Design**: dark cinematic "Jewel & Luxury" — abyssal black (#050505) + molten gold (#D4AF37)
- **Fonts**: Cormorant Garamond (display) + Outfit (body) + JetBrains Mono (accents)

## User Personas
- **Diners** — discover the restaurant, browse menu, ask AI for pairings, book a table
- **Returning guests** — newsletter subscribers, quick reservation
- **Press / sommeliers** — view chef story, accolades

## Core Requirements (static)
- Stunning, animated, "different and excellent" UI
- AI integration (chatbot)
- 3D / particle visual depth
- Reservation flow
- Mobile responsive

## Implemented (Dec 2025)
- ✅ Cinematic hero with parallax gold particle background (canvas-based 3D feel) + staggered word reveal
- ✅ Chef story section with grayscale-to-color portrait + offset gold badge
- ✅ Signature dishes — asymmetric bento grid with gold tracing line hover
- ✅ Interactive menu — 4 course tabs (Prelude / Earth / Fire / Finale), animated transitions, served from `/api/menu`
- ✅ Reservation modal — full form, date/time/guests/occasion, persisted to MongoDB
- ✅ AI chef chatbot ("Maître Aurelio") — multi-turn, session-persisted, with suggested starters
- ✅ Testimonials marquee (react-fast-marquee) + accolades strip
- ✅ Footer with hours, contact, newsletter signup
- ✅ Sticky glassmorphic header, mobile menu, gold-pulse FAB
- ✅ Sonner toast notifications
- ✅ All testing_agent_v3 tests pass (100% backend, 100% frontend)

## Backend Endpoints
- `GET  /api/`              → status
- `GET  /api/menu`          → static curated menu (4 courses)
- `POST /api/reservations`  → create reservation
- `GET  /api/reservations`  → list reservations
- `POST /api/newsletter`    → subscribe (upsert)
- `POST /api/chef/chat`     → AI chef multi-turn chat
- `GET  /api/chef/history/{session_id}` → conversation history

## Backlog
### P1
- Reservation admin dashboard (view / confirm / cancel)
- Email confirmation on reservation (Resend / SendGrid)
- Deposit collection via Stripe ($50/guest)

### P2
- Wine pairing detail pages
- Gift card sales
- Press/awards detail page
- Multilingual support (EN/FR/IT)
- Date-future validation server-side
- EmailStr validation on newsletter

## Next Tasks
- Wire up Stripe deposits if revenue is desired
- Add Resend email confirmations
- Optional: build admin panel for reservations
