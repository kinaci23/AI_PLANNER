const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL'e başarıyla bağlanıldı"))
  .catch((err) => console.error("❌ Veritabanı bağlantı hatası:", err));

module.exports = pool;
