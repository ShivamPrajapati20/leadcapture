# Lead Capture App

A simple lead capture application built with Next.js, Supabase, and Tailwind CSS.

This project allows users to submit their details through a form, stores the data in Supabase, and forwards the lead to an external webhook endpoint.

---

[Live Demo](https://leadcapture-npkbv274k-shivamprajapati20s-projects.vercel.app/) | [Github Repo](https://github.com/ShivamPrajapati20/leadcapture/)

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Vercel (Deployment)

---

## Features

### Lead Capture Page (/)
- Form fields:
  - Full Name (required)
  - Email (required, validated)
  - Company (optional)
  - Source (dropdown)
  - Message (optional)
- Client-side validation (HTML + basic checks)
- Loading, error, and success states
- Clean and responsive UI

---

### Backend API (/api/submit-lead)
- Validates input server-side
- Saves lead to Supabase
- Sends POST request to webhook endpoint
- Handles duplicate email errors
- Webhook failure does NOT block user success

---

### Leads Page (/leads)
- Displays all submitted leads
- Columns:
  - Name
  - Email
  - Company
  - Source
  - Submitted Date
- Sorted by most recent first

---

## Security

- Row Level Security (RLS) enabled on Supabase
- No public SELECT access from client
- Inserts handled via secure server-side API
- Service role key is never exposed to frontend

---

## Webhook Integration

Endpoint: https://webhook-receiver-flax.vercel.app/api/lead-webhook

- Triggered server-side after saving lead
- Includes header: X-Candidate-Name: Your Full Name

---

## Run Locally

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

npm install
npm run dev
```

App runs at: http://localhost:3000

---

# Create a .env.local file

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url<br/>
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key<br/>
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key<br/>
CANDIDATE_NAME=Your Full Name



