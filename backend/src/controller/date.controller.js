import {
  validateAnswer,
  saveDate,
  getLatestDate,
} from "../provider/date.provider.js";

export const setDate = async (req, res) => {
  const { date, time } = req.body ?? {};

  const error = validateAnswer({ date, time });
  if (error) return res.status(400).json({ error });

  try {
    const saved = await saveDate({ date, time });
    res.status(201).json(saved);
  } catch (err) {
    console.log("setDate failed:", err);
    res.status(500).json({ error: "Could not save your date" });
  }
};

export const getDate = async (_req, res) => {
  try {
    const answer = await getLatestDate();
    res.json(answer);
  } catch (err) {
    console.log("getDate failed:", err);
    res.status(500).json({ error: "Could not load date" });
  }
};
