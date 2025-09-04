// import mysql from 'mysql2/promise';

// let pool;

// export function initDB() {
//   if (!pool) {
//     pool = mysql.createPool({
//       host: process.env.DB_HOST || 'localhost',
//       user: process.env.DB_USER || 'root',
//       password: process.env.DB_PASSWORD || '',
//       database: process.env.DB_DATABASE || 'schoolDB',
//       waitForConnections: true,
//       connectionLimit: 10,
//       queueLimit: 0,
//     });
//   }
//   return pool;
// }

// lib/db.js
import mysql from 'mysql2/promise';

let pool = null;

export async function initDB() {
  if (pool) return pool;

  const opts = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'schoolDB',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };

  // SSL handling:
  if (process.env.DB_USE_CA === 'true' && process.env.DB_CA_BASE64) {
    // decode CA from base64 env var
    const caBuffer = Buffer.from(process.env.DB_CA_BASE64, 'base64');
    opts.ssl = { ca: caBuffer, rejectUnauthorized: true };
  } else if (process.env.DB_SSL === 'true') {
    // quick setup: enable SSL but don't verify (works for many hosts)
    opts.ssl = { rejectUnauthorized: false };
  }

  pool = mysql.createPool(opts);
  return pool;
}

