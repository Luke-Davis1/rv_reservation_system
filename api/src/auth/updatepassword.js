import { pool } from "../db/index.js";

export async function updatePassword(req, res) {
  const { username, hashedOldPassword, hashedNewPassword, newSalt, updateType } = req.body;

  try {
    // Try to find the user
    const userQuery = 'SELECT * FROM users WHERE username = ?';
    const [userResult] = await pool.query(userQuery, [username]);

    // Verify that a user was returned
    if (userResult.length === 0) {
      // didn't find the user
      return res.status(401).json({ message: "Invalid username or old password" });
    }
    let userDetails = userResult[0];

    // Validate the password
    if (userDetails !== undefined && (updateType === "admin" || hashedOldPassword === userDetails.password)) {
      // gave the right old password, or is admin update
      const changeQuery = 'UPDATE users SET password = ?, salt = ? WHERE username = ?;';
      const result = await pool.query(changeQuery, [hashedNewPassword, newSalt, username])
      
      return res.json({ message: `Success updating password for ${username}` });
    }
    return res.status(401).json({ message: "Invalid old password" });
  } catch (error) {
    // return error;
    return res.status(500).json({ message: "Internal server error" });
  }
}