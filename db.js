import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pgclient = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

pgclient.on("error", (err) => console.error("PostgreSQL error:", err));

export default pgclient;
