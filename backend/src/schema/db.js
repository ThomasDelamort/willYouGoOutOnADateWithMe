import pkg from "pg";

const { Pool } = pkg;

// One shared connection pool for the whole app.
// Railway's internal database URL needs no SSL (default). If you ever point
// at a public/hosted Postgres that requires SSL, set PGSSL=true.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false,
});

// Create the table once on startup if it doesn't already exist.
export async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS date_answers (
      id         SERIAL PRIMARY KEY,
      date       TEXT NOT NULL,
      time       TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  console.log("✅ Database ready (date_answers table ensured)");
}
