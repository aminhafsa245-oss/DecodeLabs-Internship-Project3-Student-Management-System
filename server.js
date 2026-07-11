const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ==========================
// Database Connection
// ==========================

const db = new sqlite3.Database(
    path.join(__dirname, "database.db"),
    (err) => {

        if (err) {
            console.log("Database Connection Error:", err.message);
        } else {
            console.log("Connected to SQLite Database.");
        }

    }
);

// ==========================
// Create Table
// ==========================

db.run(`
CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    course TEXT NOT NULL
)
`);

// ==========================
// GET ALL STUDENTS
// ==========================

app.get("/students", (req, res) => {

    db.all("SELECT * FROM students", [], (err, rows) => {

        if (err) {

            return res.status(500).json({
                message: err.message
            });

        }

        res.json(rows);

    });

});

// ==========================
// ADD STUDENT
app.post("/students", (req, res) => {

    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }

    const checkQuery = `
        SELECT * FROM students
        WHERE LOWER(name) = LOWER(?)
        AND LOWER(course) = LOWER(?)
    `;

    db.get(checkQuery, [name, course], (err, row) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err.message
            });
        }

        if (row) {
            return res.status(409).json({
                message: "Student already exists."
            });
        }

        const insertQuery = `
            INSERT INTO students (name, course)
            VALUES (?, ?)
        `;

        db.run(insertQuery, [name, course], function (err) {

            if (err) {
                return res.status(500).json({
                    message: "Database Error",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Student Added Successfully",
                student: {
                    id: this.lastID,
                    name,
                    course
                }
            });

        });

    });

});

// ==========================
// UPDATE STUDENT
// ==========================

app.put("/students/:id", (req, res) => {

    const id = req.params.id;
    const { name, course } = req.body;

    if (!name || !course) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }

    const query = `
        UPDATE students
        SET name = ?, course = ?
        WHERE id = ?
    `;

    db.run(query, [name, course, id], function (err) {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Student not found."
            });
        }

        res.json({
            message: "Student Updated Successfully"
        });

    });

});


// ==========================
// DELETE STUDENT
// ==========================


          app.delete("/students/:id", (req, res) => {


    db.get(
        "SELECT * FROM students WHERE id = ?",
        [req.params.id],
        (err, row) => {

            if (!row) {
                return res.status(404).json({
                    message: "Student not found."
                });
            }

            db.run(
                "DELETE FROM students WHERE id = ?",
                [req.params.id],
                function (err) {

                    res.json({
                        message: "Student Deleted Successfully"
                    });

                }
            );

        }
    );

});

// ==========================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});