import { pool } from "../db/index.js";

export async function fetchEmployees(req, res) {
  try {
    let employeeQuery = 
    `SELECT CONCAT(first_name, ' ', last_name) AS name, username, username AS action 
    FROM users 
    WHERE type = 'employee' OR type = 'admin' OR type = 'inactive'`;

    // Make the query
    const [employeeRows] = await pool.query(employeeQuery);

    // return the data
    return res.json(employeeRows);
    
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong fetching employees" });
  }
}

export async function fetchEmployee(req, res) {
  const { username } = req.query;

  if(!username) {
    return res.status(400).json({ message: "Missing employee username" });
  }

  try {
    let employeeQuery = 
    `
    SELECT username, type
    FROM users
    WHERE username = ? AND (type = 'employee' OR type = 'admin' OR type = 'inactive');
    `;

    const [employee] = await pool.query(employeeQuery, [username]);

    if (employee.length > 0) {
      return res.json(employee[0]);
    } 

    return res.status(404).json({ message: "Requested username either doesn't exists or isn't an employee (past or current)" })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong trying to fetch an employee" });
  }
}

export async function updateEmployeeStatus(req, res) {
  const { username, desiredRole } = req.body.user;

  if (!username || !desiredRole) {
    return res.status(400).json({ message: "Missing username or desired status" });
  }

  try {
    let updateEmployeeQuery = `
    UPDATE users
    SET type = ?
    WHERE username = ?;
    `;

    const result = await pool.query(updateEmployeeQuery, [desiredRole, username]); 
    return res.json({ message: `Success updating ${username} to ${desiredRole}`});
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong trying to update employee status" });
  }
}