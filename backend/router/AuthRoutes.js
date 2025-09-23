const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const router = express.Router();
const saltRounds = 10;

module.exports = function (db) {
  router.post("/login", async (req, res) => {
    const { email, password, cheatCode } = req.body;
    if (!email || !password || !cheatCode) {
      return res.status(400).send({ message: "Email, password, and cheat code are required" });
    }
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(401).send({ message: "User not found or Invalid Credentials" });
      const user = results[0];
      console.log(results[0]);
      
      try {
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        const isCheatCodeValid = await bcrypt.compare(cheatCode, user.hashed_code);
        if (!isPasswordValid || !isCheatCodeValid) {
          return res.status(401).send({ message: "User not found or Invalid Credentials" });
        }
        const token = jwt.sign({id: user.user_id , email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: '2h'});
        res.status(200).send({
          message: "Login successful",
          token: "Bearer " + token,
        });
      } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send({ message: "Internal server error" });
      }
    });
  });
  // Registration endpoint
  router.post("/register", async (req, res) => {
    console.log(req.body);
    console.log("Attempting to register user");

    const { username, email, password, cheatCode } = req.body;

    if (!username || !email || !password || !cheatCode) {
      return res.status(400).send({ message: "All fields are required" });
    }
    console.log(req.body);

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const hashedCode = await bcrypt.hash(cheatCode, saltRounds);
      const sql = "INSERT INTO users (username, email, hashed_password, hashed_code, role) VALUES (?, ?, ?, ?, ?)";
      db.query(sql, [username, email, hashedPassword, hashedCode, "user"], (err, result) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).send({ message: "Email or username already exists" });
          }
          return res.status(500).send(err);
        }
        res.send({ message: "User registered successfully" });
      });
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });

  return router;
};
