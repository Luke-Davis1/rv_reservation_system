import { pool } from "../db/index.js";

export async function salt(req, res) {
  const { username } = req.body;

  let query = "SELECT salt FROM users where username = ?";

  const [response] = await pool.query(query, [username]);

  if (!response[0]) return res.status(400).json({ message: "User not found" });

  const salt = response[0].salt;

  if (salt === undefined || salt === null) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.json(salt);
}