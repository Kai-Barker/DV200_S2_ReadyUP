const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const cloudinary = require('cloudinary').v2;
const createAuthRoutes = require("./router/AuthRoutes");
const createUserRoutes = require("./router/UserRoutes");
const dotenv = require('dotenv');

dotenv.config();

//cloudinary configuration for image uploads this is killing me inside ahhhhhhhh
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware stuff
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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

const userRoutes = createUserRoutes(db, cloudinary);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
