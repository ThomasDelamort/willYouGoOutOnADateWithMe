<p align="center">
  <img src="./frontend/public/favicon.png" alt="App logo" width="120" height="120" />
</p>

<h1 align="center">Will You Go Out On A Date With Me? 💌</h1>
<p align="center"><em>Ask someone out, let them pick the day, get notified the moment they say yes.</em></p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/Nodemailer-30B980?style=flat-square&logo=minutemailer&logoColor=white" alt="" />
</p>

A playful full-stack web app that asks someone out on a date. They pick a day and time from a
calendar, their answer is saved to a database, and you get an email the moment they say yes. The
**"No"** button politely runs away when you try to click it. 😉

The project is split into two packages:

- **`frontend/`** — React 19 single-page app (Vite + Tailwind v4)
- **`backend/`** — Express 5 REST API (PostgreSQL)

---

## Features

- **The ask** — a landing page pops the question, with a **"Yes"** button that routes onward and a **"No"** button that dodges the cursor and stays fully on-screen.
- **Pick a day** — a from-scratch calendar (no date-picker library) with month navigation. Past dates are automatically greyed out and disabled, so only real future dates are selectable.
- **Pick a time** — a grid of preset time slots that scales responsively (2 columns on mobile, up to 4 on desktop).
- **Persistence** — the chosen date and time are saved to PostgreSQL. The table is created automatically on first startup, so there's no manual SQL to run.
- **Email notification** — get pinged via Gmail the instant an answer comes in. Optional: leave the mail vars blank and it logs to the console instead.
- **Confirmation screen** — after submitting, the form flips to an "It's a date!" screen showing the locked-in day and time.
- **Fully responsive** — the whole flow adapts from phone to desktop.

---

## Tech stack

**Frontend**

- React 19, Vite
- Tailwind CSS v4
- React Router v7

**Backend**

- Node.js, Express 5 (ES modules)
- PostgreSQL via `pg`
- Nodemailer for Gmail notifications
- CORS, dotenv

---

## Project structure

The backend follows a layered structure — each request flows route → controller → provider → schema.

```
backend/
  src/
    index.js        app entry — loads env, connects DB, mounts routes
    route/          date.route.js — URL to controller wiring
    controller/     date.controller.js — request/response handling
    provider/       date.provider.js (logic + validation + DB),
                    notify.provider.js (Gmail / console notification)
    schema/         db.js — connection pool + table setup

frontend/
  src/
    pages/          AskOutPage, SetDateFirstPage
    components/     Layout, DatePickerForm
    App.jsx         routes
    main.jsx        entry
```

---

## Prerequisites

- Node.js 18+ and npm
- A PostgreSQL database (local, or hosted like Neon/Supabase)
- _(Optional)_ A Gmail account with an App Password, for email notifications

---

## Environment variables

`.env` files are git-ignored, so a fresh clone won't include them — copy the provided
`.env.example` in each package and fill in your values.

**`backend/.env`**

| Variable             | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`       | PostgreSQL connection string                                       |
| `PORT`               | Port the API listens on (e.g. `3000`)                              |
| `CLIENT_ORIGIN`      | Frontend origin allowed by CORS (e.g. `http://localhost:5173`)     |
| `GMAIL_USER`         | Gmail address the notification is sent **from** _(optional)_       |
| `GMAIL_APP_PASSWORD` | Gmail 16-char App Password — not your normal password _(optional)_ |
| `NOTIFY_TO`          | Inbox the notification is sent **to** _(optional)_                 |

**`frontend/.env`**

| Variable       | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| `VITE_API_URL` | Base API URL. **Leave blank in dev** — Vite proxies `/api` to the backend |

> **Heads up on the env vars:**
>
> - The frontend variable **must** start with `VITE_` — Vite ignores any env var without that
>   prefix, so a bare `API_URL` won't be picked up.
> - In development, keep `VITE_API_URL` **blank**. Vite's dev proxy forwards `/api` to
>   `http://localhost:3000` for you, so there's nothing to set. Only fill it in for production.
> - Leave the three `GMAIL_*` / `NOTIFY_TO` vars blank if you don't want email — the app falls
>   back to logging the notification in the backend console.

---

## Getting started

Run the backend and frontend in **two separate terminals** — they run at the same time on
different ports.

**1. Database**

Create a database (any name — this project uses `onlyyou`):

```bash
createdb onlyyou
```

No tables to create by hand — the backend creates the `date_answers` table automatically on startup.

**2. Backend**

```bash
cd backend
npm install
cp .env.example .env    # then fill it in
npm run dev             # nodemon on src/index.js
```

You should see:

```
✅ Database ready (date_answers table ensured)
🚀 Server running on port 3000
```

**3. Frontend**

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev             # Vite dev server on http://localhost:5173
```

Open the URL it prints (usually `http://localhost:5173`). In dev, Vite proxies `/api` calls to
the backend on port 3000, so there's nothing else to configure.

> Vite reads `.env` **only at startup** — after editing it (or `vite.config.js`), stop and
> restart `npm run dev`.

---

## Email notifications (optional)

Notifications use Gmail with an **App Password** — not your normal password, which Google blocks.

1. Turn on **2-Step Verification** on your Google account.
2. Generate a 16-character app password at https://myaccount.google.com/apppasswords.
3. Fill in `backend/.env`:

```bash
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=your16charapppassword
NOTIFY_TO=you@gmail.com
```

`GMAIL_USER` is who the email is **sent from**; `NOTIFY_TO` is who it's **sent to**. Set them to
the same address to email yourself. Leave them blank to just log the alert to the console.

---

## npm scripts

**Backend**

| Script          | Action                        |
| --------------- | ----------------------------- |
| `npm run dev`   | Start the API with nodemon    |
| `npm run start` | Start the API with plain node |

**Frontend**

| Script            | Action                       |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the Vite dev server    |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run the linter               |

---

## API reference

Base path: `/api/date`.

| Method | Endpoint    | Description                                                 |
| ------ | ----------- | ----------------------------------------------------------- |
| `POST` | `/api/date` | Save an answer `{ date, time }`, then send the notification |
| `GET`  | `/api/date` | Return the latest saved answer, or `null` if none yet       |
| `GET`  | `/health`   | Health check — returns `{ "status": "ok" }`                 |

`date` is a `YYYY-MM-DD` string; `time` must be one of the app's preset slots (e.g. `"5:00 PM"`).
Invalid input or a past date is rejected with a `400`.

---

## Production

There's no Vite proxy in a production build, so point the frontend at the deployed backend by
setting `frontend/.env`:

```bash
VITE_API_URL=https://your-backend-url.com/api
```

Build with `npm run build`. On your host (Render, Railway, etc.), set the backend's environment
variables in the platform dashboard rather than committing a `.env` file.

---

## Troubleshooting

**`Cannot find module '.../date.controller'`** — ES modules require the file extension on
relative imports. Every backend import must end in `.js`, e.g.
`import ... from "../controller/date.controller.js"`.

**Browser shows `502 Bad Gateway`, or Vite logs `http proxy error: ECONNREFUSED`** — the proxy
is working, but the backend isn't running on port 3000. Start it in its own terminal
(`cd backend && npm run dev`) and confirm with `curl http://localhost:3000/health`.

**Browser shows `404` on `POST /api/date`** — the Vite proxy isn't active. Make sure the
`server.proxy` block is in `vite.config.js`, then **restart** the frontend dev server (Vite only
reads its config at startup).

**`Failed to initialise database`** — the backend can't reach Postgres. Confirm Postgres is
running. If `psql` connects with your string but Node doesn't, change `localhost` to `127.0.0.1`
in `DATABASE_URL` — Node sometimes resolves `localhost` to IPv6, which Postgres isn't listening on.

**`password authentication failed`** — the password in `DATABASE_URL` doesn't match the Postgres
user's. Watch for special characters (`@ # : /`), which must be URL-encoded (`@` becomes `%40`),
and for accidental quotes or spaces around the value.

**`GET /api/date` returns `null`** — that's normal when nothing's been saved yet. If a submit
didn't save, check the `POST` status in the browser Network tab and watch the backend terminal
for errors.

**Don't forget:** the backend and frontend each need their **own** terminal, running at the same time.

---

## Credits

Frontend calendar and date-picker built from scratch (no date library). Backend structured as a
layered Express API with PostgreSQL persistence and optional Gmail notifications.

---

## License

ISC (see `backend/package.json`).
