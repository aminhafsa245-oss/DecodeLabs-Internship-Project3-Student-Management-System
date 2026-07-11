const apiURL = "http://localhost:5000/students";

let students = [];
let editStudentId = null;

// =======================
// Load Students
// =======================

async function loadStudents() {

    try {

        const response = await fetch(apiURL);
        students = await response.json();

        displayStudents(students);

    } catch (error) {

        showMessage("Unable to load students.", "error");
        console.error(error);
 
    }

}

// =======================
// Display Students
// =======================

function displayStudents(studentArray) {

    const studentList = document.getElementById("students");
    const totalStudents = document.getElementById("totalStudents");

    studentList.innerHTML = "";
    totalStudents.textContent = studentArray.length;

    if (studentArray.length === 0) {

    studentList.innerHTML = `
        <li class="empty-message">
            No students found.
        </li>
    `;

    return;

}

    studentArray.forEach(student => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="student-info">
                <h3>${student.name}</h3>
                <p>${student.course}</p>
            </div>

            <div class="buttons">
                <button class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </div>
        `;

        studentList.appendChild(li);

    });

}

// =======================
// Add / Update Student
// =======================

async function saveStudent() {

    const name = document.getElementById("name").value.trim();
const course = document.getElementById("course").value.trim();

// Check Empty Fields
if (name === "" || course === "") {

    showMessage("Please fill all fields.", "error");
    return;

}

// Name Validation
if (name.length < 3) {

    showMessage("Student name must contain at least 3 characters.", "error");
    return;

}

// Course Validation
if (course.length < 3) {

    showMessage("Course name must contain at least 3 characters.", "error");
    return;

}

    const studentData = {
        name,
        course
    };

    try {

        let response;

        if (editStudentId === null) {

            response = await fetch(apiURL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(studentData)

            });

        } else {

            response = await fetch(`${apiURL}/${editStudentId}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(studentData)

            });

            editStudentId = null;
            document.getElementById("submitBtn").textContent = "Add Student";

        }

        const result = await response.json();
        if (response.ok) {

    showMessage(result.message, "success");

} else {

    showMessage(result.message, "error");

}

        document.getElementById("name").value = "";
        document.getElementById("course").value = "";

        loadStudents();

    } catch (error) {

        console.error(error);
        showMessage("Something went wrong.", "error");

    }

}

// =======================
// Edit Student
// =======================

function editStudent(id) {

    const student = students.find(s => s.id === id);

    if (!student) return;

    document.getElementById("name").value = student.name;
    document.getElementById("course").value = student.course;

    editStudentId = id;

    document.getElementById("submitBtn").textContent = "Update Student";

}

// =======================
// Delete Student
// =======================

async function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    try {

        const response = await fetch(`${apiURL}/${id}`, {

            method: "DELETE"

        });

        const result = await response.json();

        showMessage(result.message, response.ok ? "success" : "error");

        if (response.ok) {
            loadStudents();
        }

    } catch (error) {

        console.error(error);
        showMessage("Unable to delete student.", "error");

    }

}

// =======================
// Search Student
// =======================

function searchStudent() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(keyword) ||

        student.course.toLowerCase().includes(keyword)

    );

    displayStudents(filtered);

}

// =======================
// Message Box
// =======================

function showMessage(message, type) {

    const messageBox = document.getElementById("message");

    messageBox.textContent = message;
    messageBox.className = type;

    setTimeout(() => {

        messageBox.textContent = "";
        messageBox.className = "";

    }, 2500);

}

// =======================

loadStudents();