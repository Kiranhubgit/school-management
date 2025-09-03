import { initDB } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    const pool = initDB();
    const [rows] = await pool.execute('SELECT id, name, address, city, image FROM schools ORDER BY id DESC');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
