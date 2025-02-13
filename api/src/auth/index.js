import { Router } from "express";
import jwt from "jsonwebtoken";
import { login } from "./login.js";
import { profile } from "./profile.js";
import { salt } from "./salt.js";
import { signup } from "./signup.js";
import { updatePassword } from "./updatepassword.js";
export const authenticationRouter = Router();

authenticationRouter.post('/login', login);
authenticationRouter.post('/signup', signup);
authenticationRouter.post('/salt', salt);
authenticationRouter.post('/updatepassword', updatePassword);
authenticationRouter.get('/profile', profile);

export function generateToken(user) {
  return jwt.sign(user, process.env.JWT_TOKEN_SECRET, { expiresIn: "30d" });
}

export function validateToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Invalid token" });
  }
  const token = authHeader.replace("Bearer ", "");
  if (token === undefined || token === "" || token === null) {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ message: "Not authenticated" });
  }
}