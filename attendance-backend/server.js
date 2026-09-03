const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pr@123456",
  database: "attendance",
});

db.connect((err) => {
  if (err) {
    console.log("Database error:", err);
  } else {
    console.log("MySQL connected ✅");
  }
});

// ✅ Home route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// =====================================================
// ✅ MARK ATTENDANCE (MAIN LOGIC)
// =====================================================
app.post("/mark-attendance", (req, res) => {
  const { name, roll_no, erp_id } = req.body;

  if (!roll_no || !erp_id) {
    return res.status(400).json({ message: "Missing data" });
  }

  // 1️⃣ Check student exists
  const checkStudent = `
    SELECT * FROM students 
    WHERE roll = ? AND erp = ?
  `;

  db.query(checkStudent, [roll_no, erp_id], (err, student) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    // ❌ Not a valid student
    if (student.length === 0) {
      return res.json({ message: "❌ Invalid Data" });
    }

    const today = new Date().toISOString().split("T")[0];

    // 2️⃣ Check already marked
    const checkAttendance = `
      SELECT * FROM attendance 
      WHERE roll_no = ? AND date = ?
    `;

    db.query(checkAttendance, [roll_no, today], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error checking attendance" });
      }

      if (result.length > 0) {
        return res.json({ message: "⚠️ Attendance already marked today" });
      }

      // 3️⃣ Insert attendance
      const insertAttendance = `
        INSERT INTO attendance (roll_no, name, date, status)
        VALUES (?, ?, ?, 'Present')
      `;

      db.query(insertAttendance, [roll_no, student[0].name, today], (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Insert failed" });
        }

        res.json({ message: "✅ Attendance marked successfully" });
      });
    });
  });
});

// =====================================================
// ✅ GET ALL ATTENDANCE
// =====================================================
app.get("/attendance", (req, res) => {
  const sql = "SELECT * FROM attendance ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error fetching attendance" });
    }
    res.json(result);
  });
});

// =====================================================
// ✅ DELETE ATTENDANCE
// =====================================================
app.delete("/delete/:roll", (req, res) => {
  const { roll } = req.params;

  const sql = "DELETE FROM attendance WHERE roll_no = ?";

  db.query(sql, [roll], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Delete failed" });
    }
    res.json({ message: "🗑️ Attendance removed" });
  });
});

// =====================================================
// ✅ OPTIONAL: ADD STUDENT (ONLY ONCE - ADMIN USE)
// =====================================================
app.post("/add-student", (req, res) => {
  const { name, roll_no, erp_id } = req.body;

  const sql = `
    INSERT INTO students (name, roll, erp)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, roll_no, erp_id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Student insert failed" });
    }
    res.json({ message: "✅ Student added successfully" });
  });
});

// =====================================================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
