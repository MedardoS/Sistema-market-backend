import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const isProduction =
  process.env.NODE_ENV === "production";
console.log(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL,

  ssl: isProduction
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

export default pool;