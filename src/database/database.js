import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg

/*
const connection = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: 'localhost',
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME
});*/

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false
  }
}

const connection = new Pool(databaseConfig);

export default connection