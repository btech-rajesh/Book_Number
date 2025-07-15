// utils/hashPassword.js
import bcrypt from "bcrypt";

const password = "BaseraRestro@_10997"; // 👉 Replace this with your desired password

bcrypt.hash(password, 10).then((hash) => {
  console.log("🔐 Hashed Password:", hash);
}).catch(err => {
  console.error("Error hashing password:", err);
});
