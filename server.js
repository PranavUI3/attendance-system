const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//   host: "3000",
//   user: "root",
//   password: "pr@123456",
//   database: "attendance",
// });

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((err) => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("MySQL connected");
  }
});

// 
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


//  records
app.get("/attendance", (req, res) => {
  const sql = "SELECT * FROM students ORDER BY time DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    res.json(result);
  });
});

const PORT = process.env.PORT||3000;

app.listen(PORT,()=>{
  console.log("server running on PORT" + PORT);
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
