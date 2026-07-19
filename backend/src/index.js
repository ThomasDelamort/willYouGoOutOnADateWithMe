import "dotenv/config";
import express from "express";
import cors from "cors";
import { init } from "./schema/db.js";
import dateRoute from "./route/date.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/date", dateRoute);

init()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Failed to initialise database:", err.message);
    console.error("   Check your DATABASE_URL in backend/.env");
    process.exit(1);
  });
