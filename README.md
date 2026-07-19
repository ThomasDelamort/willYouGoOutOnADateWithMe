# Will You Go Out On A Date With Me? 💌

A playful little web app that asks someone out, lets them pick a day and time, saves their answer to a database, and emails you the moment they say yes.

The "No" button politely runs away when you try to click it. 😉

---

## What's inside

| Layer         | Stack                                         |
| ------------- | --------------------------------------------- |
| Frontend      | React 19, Vite, Tailwind CSS v4, React Router |
| Backend       | Node (ES modules), Express 5                  |
| Database      | PostgreSQL (via `pg`)                         |
| Notifications | Gmail (via Nodemailer) — optional             |

```
willYouGoOutOnADateWithMe/
├── frontend/                  # React + Vite app
│   └── src/
│       ├── pages/             # AskOutPage, SetDateFirstPage
│       └── components/        # Layout, DatePickerForm
└── backend/                   # Express API (layered)
    └── src/
        ├── index.js           # app entry: loads env, connects DB, mounts routes
        ├── route/             # URL → controller wiring
        ├── controller/        # request/response handling
        ├── provider/          # business logic, DB calls, notifications
        └── schema/            # DB connection pool + table setup
```

---

## Prerequisites

- **Node.js** 18 or newer
- **PostgreSQL** installed and running locally (or a hosted database like Neon/Supabase)

---

## Getting started

You'll run the **backend and frontend in two separate terminals** — they run at the same time on different ports.

### 1. Database

Create a database (any name — this project uses `onlyyou`):

```bash
createdb onlyyou
```

You don't need to create any tables by hand — the backend creates the `date_answers` table automatically on startup.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env` and set your database connection string:

```bash
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@127.0.0.1:5432/onlyyou
PORT=3000
CLIENT_ORIGIN=http://localhost:5173

# Optional — leave blank to just log the notification to the console
GMAIL_USER=
GMAIL_APP_PASSWORD=
NOTIFY_TO=
```

Then start it:

```bash
npm run dev
```

You should see:

```
✅ Database ready (date_answers table ensured)
🚀 Server running on port 3000
```

### 3. Frontend

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). During development, Vite proxies `/api` calls to the backend on port 3000, so there's nothing else to configure.

---

## Email notifications (optional)

To get an email when someone answers, this app uses Gmail with an **App Password** (not your normal password — Google blocks that).

1. Turn on **2-Step Verification** on your Google account.
2. Go to https://myaccount.google.com/apppasswords and generate a 16-character app password.
3. Fill in the backend `.env`:

```bash
GMAIL_USER=you@gmail.com
GMAIL_APP_PASSWORD=your16charapppassword
NOTIFY_TO=you@gmail.com          # where the alert is sent (can be any inbox)
```

`GMAIL_USER` is who the email is **sent from**; `NOTIFY_TO` is who it's **sent to**. Set them to the same address to email yourself. If you leave the Gmail vars blank, the notification just prints to the backend console instead.

---

## API reference

Base path: `/api/date`

| Method | Path        | Body                                          | Description                                        |
| ------ | ----------- | --------------------------------------------- | -------------------------------------------------- |
| `POST` | `/api/date` | `{ "date": "2026-07-25", "time": "5:00 PM" }` | Saves an answer, sends the notification            |
| `GET`  | `/api/date` | —                                             | Returns the latest saved answer, or `null` if none |
| `GET`  | `/health`   | —                                             | Returns `{ "status": "ok" }`                       |

`date` is a `YYYY-MM-DD` string; `time` must be one of the app's preset slots (e.g. `"5:00 PM"`). Invalid or past dates are rejected with a `400`.

---

## Production

There's no Vite proxy in a production build, so point the frontend at the deployed backend by setting `frontend/.env`:

```bash
VITE_API_URL=https://your-backend-url.com/api
```

Build the frontend with `npm run build`. On your host (Render, Railway, etc.), set the backend's environment variables in the platform dashboard rather than committing a `.env` file.

---

## Troubleshooting

**`Cannot find module '.../date.controller'`**
ES modules require the file extension on relative imports. Every backend import must end in `.js` — e.g. `import ... from "../controller/date.controller.js"`.

**Browser shows `502 Bad Gateway` / Vite logs `ECONNREFUSED`**
The proxy is working, but the backend isn't running on port 3000. Start it in its own terminal (`cd backend && npm run dev`) and confirm with `curl http://localhost:3000/health`.

**`Failed to initialise database`**
The backend can't reach Postgres. Check that Postgres is running, and if `psql` connects but Node doesn't, change `localhost` to `127.0.0.1` in `DATABASE_URL` (Node sometimes resolves `localhost` to IPv6, which Postgres isn't listening on).

**`GET /api/date` returns `null`**
That's normal when nothing's been saved yet. If a submit didn't save, check the POST status in the browser Network tab and watch the backend terminal for errors.

**Don't forget:** the backend and frontend each need their own terminal, running at the same time.

---

## License

See [LICENSE](./LICENSE).
