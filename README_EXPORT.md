# J1YAI Website — Project Export

## What's inside
- frontend/ — React app (pages, components, admin panel)
- backend/ — FastAPI API (server.py, emailer.py, requirements.txt)
- scripts/ — blog seed scripts
- memory/ — PRD and credentials record
- data_export.json — your MongoDB data: blog posts, site settings, contact inquiries

## Setup locally
1. Install MongoDB locally (or use a free MongoDB Atlas cluster).
2. Backend: cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt
3. Copy backend/.env.example to backend/.env and fill in real values.
4. Run backend: uvicorn server:app --host 0.0.0.0 --port 8001 --reload
5. Frontend: cd frontend && yarn install
6. Copy frontend/.env.example to frontend/.env (point REACT_APP_BACKEND_URL at your backend).
7. Run frontend: yarn start (opens on port 3000)
8. The admin user is seeded automatically on backend startup from ADMIN_EMAIL/ADMIN_PASSWORD.

## Restore your content (blog posts, settings, inquiries)
Import data_export.json into MongoDB, e.g. with a small Python script using pymongo:
insert blog_posts -> blog_posts collection, site_settings -> site_settings, contact_inquiries -> contact_inquiries.
Or re-run scripts/seed_blogs.py and scripts/seed_blogs_batch2.py with API_URL pointing at your local backend.

## Notes
- Real .env files are intentionally excluded (they contain secrets).
- Email sending uses the Emergent integrations gateway (EMERGENT_EMAIL_KEY); outside Emergent, swap emailer.py for Resend/SMTP directly.
