import { pool } from "../db/index.js";
import { generateToken } from "./index.js";

export async function signup(req, res) {

  const { username, password, salt, email, affiliation, rank, status, type, first_name, last_name, phone } = req.body.user;
  
  if (!username || !password || !salt || !type || !first_name || !last_name) {
    return res.status(400).json({ message: "Missing basic parameters, try again" });
  }

  // if customer, need additional info
  if (type === "customer" && (!affiliation || !rank || !status || !phone || !email)) {
    return res.status(400).json({ message: "Customer missing params, try again" });
  }

  let userQuery = "SELECT * FROM users WHERE username = ? OR email = ?";
  const [result] = await pool.query(userQuery, [username, email]);

  if (result.length !== 0) {
    return res.status(400).json({ message: "Username or email already registered, try again" });
  }

  try {
    let insertUser = "INSERT INTO users (username, first_name, last_name, password, salt, email, type) VALUES(?, ?, ?, ?, ?, ?, ?)";
    const [addedUser] = await pool.query(insertUser, [username, first_name, last_name, password, salt, email, type]);
  
    // Select new user
    const [newUser] = await pool.query(userQuery, [username, email]);
  
    const userDetails = newUser[0];
    if (userDetails === undefined) {
      return res.status(500).json({ message: "Something went wrong adding user" });
    }
  
    // If customer, need to add to customer table and user_customer table
    if (type === "customer") {
      let insertCustomer = "INSERT INTO customers (first_name, last_name, email, phone, \`rank\`, military_affiliation, military_status) VALUES(?, ?, ?, ?, ?, ?, ?)";
      const [result] = await pool.query(insertCustomer, [first_name, last_name, email, phone, rank, affiliation, status]);
      let getCustomer = "SELECT * FROM customers WHERE first_name = ? AND last_name = ? AND email = ? AND phone = ?";
      const [addedCustomer] = await pool.query(getCustomer, [first_name, last_name, email, phone]);
  
      if (addedCustomer[0] === undefined) {
        return res.status(500).json({ message: "Something went wrong adding customer to customers table" });
      }
  
      // Link customer and user together
      let insertCustomerUserQuery = "INSERT INTO user_customer (customer_id, user_id) VALUES(?, ?)";
      const [addedCustomerUser] = await pool.query(insertCustomerUserQuery, [addedCustomer[0]["customer_id"], userDetails["user_id"]]);
      
      const token = generateToken({ username, first_name, email, type, user_id: userDetails.user_id });
      return res.json({ username, first_name, token, type });
    }
  
    return res.json({ message: `Successfully added ${first_name + " " + last_name}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Unable to add ${first_name + " " + last_name} to the database` });
  }

}