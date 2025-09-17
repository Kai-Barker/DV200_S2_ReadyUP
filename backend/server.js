const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middlewar
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // update with your password
    database: 'db_readyup' // update with your database name
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).send({ message: 'Email and password are required' });
//   }

//   const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//   db.query(sql, [email, password], (err, results) => {
//     if (err) return res.status(500).send(err);
//     if (results.length === 0) return res.status(401).send({ message: 'Invalid credentials' });

//     const user = results[0];
//     res.send({
//       message: 'Login successful',
//       user: { id: user.id, username: user.username, email: user.email }
//     });
//   });
});
// Registration endpoint
app.post('/register', (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).send({ message: 'All fields are required' });
//   }

//   const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//   db.query(sql, [username, email, password], (err, result) => {
//     if (err) {
//       if (err.code === 'ER_DUP_ENTRY') {
//         return res.status(400).send({ message: 'Email or username already exists' });
//       }
//       return res.status(500).send(err);
//     }
//     res.send({ message: 'User registered successfully' });
//   });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});