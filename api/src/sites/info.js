import { pool } from "../db/index.js";

export async function getSitesInfo(req, res) {
  const { siteId } = req.params;
  if (siteId === undefined) return res.status(400).json({ message: 'Missing siteId' });

  const query = `select site_id, name, price_per_night from sites where site_id = ?`;
  const [results] = await pool.query(query, [siteId]);
  const firstRow = results[0];
  if (firstRow === undefined) res.status(400).json({ message: 'Invalid Site' });

  res.json(firstRow);
}