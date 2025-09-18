const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const createAuthRoutes = require("./router/AuthRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // update with your password
  database: "db_readyup", // update with your database name
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});

const authRoutes = createAuthRoutes(db);
app.use("/api/auth", authRoutes);

// //encryption
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// app.post("/login", async (req, res) => {
//     const { email, password, cheatCode } = req.body;
//     if (!email || !password || !cheatCode) {
//       return res.status(400).send({ message: 'Email, password, and cheat code are required' });
//     }
//     const sql = 'SELECT * FROM users WHERE email = ?';
//     db.query(sql, [email], async (err, results) => {
//       if (err) return res.status(500).send(err);
//       if (results.length === 0) return res.status(401).send({ message: 'User not found or Invalid Credentials' });
//       const user = results[0];
//       try {
//         const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
//         const isCheatCodeValid = await bcrypt.compare(cheatCode, user.hashed_code);
//         if (!isPasswordValid || !isCheatCodeValid) {
//           return res.status(401).send({ message: 'User not found or Invalid Credentials' });
//         }
//         res.send({
//         message: 'Login successful',
//         user: { id: user.id, username: user.username, email: user.email }
//       });
//       } catch (error) {
//         console.error("Error during login:", error);
//         return res.status(500).send({ message: 'Internal server error' });
//       }
      
//     });
// });
// // Registration endpoint
// app.post("/register", async (req, res) => {
//     console.log(req.body);
//     console.log("Attempting to register user");
    
    
//   const { username, email, password, cheatCode } = req.body;

//   if (!username || !email || !password || !cheatCode) {
//     return res.status(400).send({ message: "All fields are required" });
//   }
//   console.log(req.body);

//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     const hashedCode = await bcrypt.hash(cheatCode, saltRounds);
//     const sql = "INSERT INTO users (username, email, hashed_password, hashed_code, role) VALUES (?, ?, ?, ?, ?)";
//     db.query(sql, [username, email, hashedPassword, hashedCode, "user"], (err, result) => {
//       if (err) {
//         if (err.code === "ER_DUP_ENTRY") {
//           return res.status(400).send({ message: "Email or username already exists" });
//         }
//         return res.status(500).send(err);
//       }
//       res.send({ message: "User registered successfully" });
//     });
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
