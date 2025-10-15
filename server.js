const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",  // your MySQL password
  database: "company"
});

db.connect(err => {
  if (err) {
    console.error("DB Connection Failed:", err);
  } else {
    console.log("✅ Database Connected...");
  }
});

// Serve frontend file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// CREATE
app.post("/employees", (req, res) => {
  const { emp_no, name, designation, salary } = req.body;
  const sql = "INSERT INTO employees (emp_no, name, designation, salary) VALUES (?, ?, ?, ?)";
  db.query(sql, [emp_no, name, designation, salary], (err) => {
    if (err) {
      console.log("❌ Error:", err.message);
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: "Employee added!" });
  });
});

// READ
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// UPDATE
app.put("/employees/:emp_no", (req, res) => {
  const { emp_no } = req.params;
  const { name, designation, salary } = req.body;
  const sql = "UPDATE employees SET name=?, designation=?, salary=? WHERE emp_no=?";
  db.query(sql, [name, designation, salary, emp_no], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Employee updated!" });
  });
});

// DELETE
app.delete("/employees/:emp_no", (req, res) => {
  const { emp_no } = req.params;
  const sql = "DELETE FROM employees WHERE emp_no=?";
  db.query(sql, [emp_no], (err) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "Employee deleted!" });
  });
});

// Start Server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
