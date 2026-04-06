
// offline code 
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MySQL connection (LOCAL)
const db = mysql.createConnection({
  host: "localhost",     // FIXED
  user: "root",
  password: "pr@123456",
  database: "attendance",
});

// ✅ Connect DB
db.connect((err) => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("MySQL connected");
  }
});

// ✅ ROOT ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


// ✅ ADD ATTENDANCE
app.post("/add", (req, res) => {
  const { name, roll, erp } = req.body;

  const checkSql = "SELECT * FROM students WHERE roll = ?";

  db.query(checkSql, [roll], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length > 0) {
      return res.json({ message: "Attendance already marked" });
    }

    const insertSql = "INSERT INTO students (name, roll, erp) VALUES (?, ?, ?)";

    db.query(insertSql, [name, roll, erp], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Insert failed" });
      }
      res.json({ message: "Attendance saved" });
    });
  });
});


// ✅ GET ATTENDANCE
app.get("/attendance", (req, res) => {
  const sql = "SELECT * FROM students ORDER BY id DESC"; // FIXED

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    res.json(result);
  });
});


// ✅ START SERVER (LOCAL + DEPLOY READY)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});