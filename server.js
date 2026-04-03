const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// ✅ Connect DB
db.connect((err) => {
  if (err) {
    console.log("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

// ✅ Create table if not exists
app.get("/init", (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      date DATE,
      status VARCHAR(10)
    )
  `;
  db.query(sql, (err) => {
    if (err) return res.send(err);
    res.send("✅ Table created");
  });
});

// ✅ Add attendance
app.post("/attendance", (req, res) => {
  const { name, date, status } = req.body;

  const sql = "INSERT INTO students (name, date, status) VALUES (?, ?, ?)";
  db.query(sql, [name, date, status], (err) => {
    if (err) return res.send(err);
    res.send("✅ Attendance Added");
  });
});

// ✅ Get attendance
app.get("/attendance", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(🔥 Server running on port ${PORT});
});
