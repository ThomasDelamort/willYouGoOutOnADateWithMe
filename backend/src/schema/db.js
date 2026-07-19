import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS date_answers (
      id         SERIAL PRIMARY KEY,
      date       TEXT NOT NULL,
      time       TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  console.log("Database ready (date_answers table ensured)");
}
