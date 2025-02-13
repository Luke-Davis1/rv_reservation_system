import { pool } from "../db/index.js";
import { generateToken } from "./index.js";

export async function login(req, res) {
  // Grab all data from the request
  const { username, password } = req.body;

  try {
    // Try to find the user
    const userQuery = 'SELECT * FROM users WHERE username = ?';
    const [userResult] = await pool.query(userQuery, [username]);

    // Verify that a user was returned
    if (userResult.length === 0) {
      // didn't find the user
      return res.status(401).json({ message: "Invalid username or password" });
    }
    let userDetails = userResult[0];
    // Validate the password
    if (userDetails !== undefined && password === userDetails.password) {
      // gave the right password
      // generate token
      const token = generateToken({ username, first_name: userDetails.first_name, email: userDetails.email, type: userDetails.type, user_id: userDetails.user_id});
      return res.json({ username, first_name: userDetails.first_name, token, type: userDetails.type });
    }

    return res.status(401).json({ message: "Invalid password" });
  } catch (error) {
    // return error;
    return res.status(500).json({ message: "Internal server error" });
  }
}