import { pool } from "../schema/db.js";
import { notify } from "./notify.provider.js";

const VALID_TIMES = new Set([
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
]);

export function validateAnswer({ date, time }) {
  if (!date || !time) return "date and time are required";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "date is not a valid date";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (parsed < today) return "date cannot be in the past";

  if (!VALID_TIMES.has(time)) return "time is not a valid slot";

  return null;
}

export const saveDate = async ({ date, time }) => {
  const { rows } = await pool.query(
    "INSERT INTO date_answers (date, time) VALUES ($1, $2) RETURNING *",
    [date, time],
  );
  await notify(`💖 She said yes! ${date} at ${time}`);
  return rows[0];
};

export const getLatestDate = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM date_answers ORDER BY created_at DESC LIMIT 1",
  );
  return rows[0] ?? null;
};
