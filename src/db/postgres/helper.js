import "dotenv/config.js";
import pg from 'pg';


const { Pool } = pg;

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});


export const PostgresHelper = {
  query: async (queryText, params = []) => {
    const client = await pool.connect();
    try {
      const result = await client.query(queryText, params);
      return result.rows; 
    } finally {
      await client.release();
    }
  },
};
