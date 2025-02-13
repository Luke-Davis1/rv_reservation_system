import CryptoJS from "crypto-js";
import { post } from "./helpers";

export async function login(username, password) {
  const salt = await getSalt(username);
  const hashedPassword = CryptoJS.SHA256(password + ":" + salt).toString();
  const {data: result} = await post("/auth/login", { username, password: hashedPassword });
  if (result.token) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', result.first_name);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userType', result.type);
  }
  return result;
}

export async function signup(user) {
  user.password = CryptoJS.SHA256(user.password + ":" + user.salt).toString(); // hash the password
  const {data: result} = await post("/auth/signup", { user });
  if (result.token) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', result.first_name);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userType', result.type);
  }
  return result;
}

export async function getSalt(username) {
  const {data: salt} = await post("/auth/salt", { username });

  if (salt !== undefined) {
    return salt;
  }

  throw new Error("Something went wrong getting the salt");
}

export async function updatePassword(userData) {
  // const username = localStorage.getItem('user'); TODO: Set the username in the userData object
  const newSalt = userData.newSalt;
  const hashedNewPassword = CryptoJS.SHA256(userData.newPassword + ":" + newSalt).toString();
  if (userData.updateType === "personal") {
    // personal accounts provide current password
    const salt = await getSalt(userData.username);
    const hashedOldPassword = CryptoJS.SHA256(userData.oldPassword + ":" + salt).toString();
    const {data: message} = await post("/auth/updatepassword", { username: userData.username, hashedOldPassword, hashedNewPassword, newSalt, updateType: userData.updateType });
    if (message !== undefined) {
      return message;
    }
  } else {
    // admin updates don't need current password
    const {data: message} = await post("/auth/updatepassword", { username: userData.username, hashedNewPassword, newSalt, updateType: userData.updateType });
    if (message !== undefined) {
      return message;
    }
  }
}