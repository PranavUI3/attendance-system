const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());


// ✅ MySQL Connection (Railway ENV)
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});


// ✅ Connect DB
db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL connected");
  }
});


// ✅ ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});


// ✅ ADD ATTENDANCE
app.post("/add", (req, res) => {

  console.log("BODY:", req.body); // new added
  
  try {
    const { name, roll, erp } = req.body;

    // 🔍 Check missing data
    if (!name || !roll || !erp) {
      return res.status(400).json({ message: "All fields required" });
    }

    const checkSql = "SELECT * FROM students WHERE roll = ?";

    db.query(checkSql, [roll], (err, result) => {
      if (err) {
        console.log("❌ Check Error:", err);
        return res.status(500).json({ message: "Server error" });
      }

      if (result.length > 0) {
        return res.json({ message: "Attendance already marked" });
      }

      const insertSql =
        "INSERT INTO students (name, roll, erp) VALUES (?, ?, ?)";

      db.query(insertSql, [name, roll, erp], (err) => {
        if (err) {
          console.log("❌ Insert Error:", err);
          return res.status(500).json({ message: "Insert failed" });
        }

        res.json({ message: "Attendance saved" });
      });
    });
  } catch (error) {
    console.log("❌ Server Crash:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// ✅ GET ATTENDANCE
app.get("/attendance", (req, res) => {
  const sql = "SELECT * FROM students ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ Fetch Error:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }

    res.json(result);
  });
});

// Delete Attendance
app.delete("/delete/:roll", (req, res)=>{
  const {roll} = req.params;

  const sql = "DELETE FROM students WHERE roll = ?";

  db.query(sql, [roll], (err, result)=>{
    if(err){
      console.log(err);
      return res.status(500).json({ message: "Delete failed"});
    }
    res.json({ message: "Student removed"});
  });
});

// ✅ START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
