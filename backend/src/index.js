import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import { init } from "./schema/db.js";
import dateRoute from "./route/date.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/date", dateRoute);

// In production, serve the built frontend from the same server.
// (One origin: the frontend can call /api/date directly, no CORS needed.)
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(clientDist));

  // SPA fallback: any non-API GET returns index.html so client routes work.
  // Written as a final middleware to stay compatible with Express 5's router.
  app.use((req, res) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      res.sendFile(path.join(clientDist, "index.html"));
    } else {
      res.status(404).json({ error: "Not found" });
    }
  });
}

// Ensure the DB/table is ready, then start listening.
init()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to initialise database:", err.message);
    console.error("   Check your DATABASE_URL");
    process.exit(1);
  });
