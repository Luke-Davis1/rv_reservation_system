import { pool } from "../db/index.js";

export async function getSiteTypes(req, res) {
  const query = `select site_type_id, name from site_types`;
  const [result] = await pool.query(query);
  res.json(result);
}