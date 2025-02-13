import { pool } from "../db/index.js";

export async function profile(req, res) {
  const { username, userType } = req.query;
  if (username === undefined) {
    console.log("User not found");
    return res.status(401).json({ message: 'Unknown user' });
  }

  let results;
  try {
    if (userType === "customer") {
      const query = ` 
        SELECT 
          u.user_id,
          c.first_name,
          c.last_name,
          c.email,
          c.rank, 
          c.military_affiliation,
          c.military_status
        FROM users u 
        JOIN user_customer uc ON u.user_id = uc.user_id 
        JOIN customers c ON uc.customer_id = c.customer_id
        WHERE u.username = ?;
      `;
      [results] = await pool.query(query, [username]);
    } else {
      const employeeQuery = ` 
        SELECT 
          user_id,
          first_name,
          last_name,
          email
        FROM users 
        WHERE username = ?;
      `;
      [results] = await pool.query(employeeQuery, [username]);
    }
  } catch (error) {
    console.error("Error getting profile details:", error);
    return res.status(500).json({ message: "Error getting profile details" });
  }

  if (results.length > 0) {
    return res.json(results[0]);
  } else {
    return res.status(404).json({ message: "Profile not found" });
  }
}