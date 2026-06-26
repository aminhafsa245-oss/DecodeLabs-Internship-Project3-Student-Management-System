const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let students = [
    {
        id: 1,
        name: "Ali",
        course: "Web Development"
    },
    {
        id: 2,
        name: "Sara",
        course: "Graphic Designing"
    }
];

// ===================
// GET ALL STUDENTS
// ===================

app.get("/students", (req, res) => {
    res.json(students);
});

// ===================
// ADD STUDENT
// ===================

app.post("/students", (req, res) => {

    const { name, course } = req.body;

    if (!name || !course) {

        return res.status(400).json({
            message: "Please fill all fields."
        });

    }

    const newStudent = {

        id: Date.now(),

        name,

        course

    };

    students.push(newStudent);

    res.status(201).json({

        message: "Student Added Successfully",

        student: newStudent

    });

});

// ===================
// UPDATE STUDENT
// ===================

app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const { name, course } = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {

        return res.status(404).json({

            message: "Student not found."

        });

    }

    student.name = name;
    student.course = course;

    res.json({

        message: "Student Updated Successfully",

        student

    });

});

// ===================
// DELETE STUDENT
// ===================

app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {

        return res.status(404).json({

            message: "Student not found."

        });

    }

    students.splice(index, 1);

    res.json({

        message: "Student Deleted Successfully"

    });

});

// ===================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});