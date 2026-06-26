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

    if (!name || !course) {

        showMessage("Please fill all fields.", "error");

        return;

    }

    const studentData = {

        name,

        course

    };

    try {

        if (editStudentId === null) {

            const response = await fetch(apiURL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(studentData)

            });

            const result = await response.json();

            showMessage(result.message, "success");

        } else {

            const response = await fetch(`${apiURL}/${editStudentId}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(studentData)

            });

            const result = await response.json();

            showMessage(result.message, "success");

            editStudentId = null;

            document.getElementById("submitBtn").textContent = "Add Student";

        }

        document.getElementById("name").value = "";

        document.getElementById("course").value = "";

        loadStudents();

    } catch (error) {

        showMessage("Something went wrong.", "error");

        console.error(error);

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

        console.log("Status:", response.status);

        const result = await response.json();

        console.log(result);

        showMessage(result.message, "success");

        loadStudents();

    } catch (error) {

        console.error("DELETE ERROR:", error);

        alert(error);

    }

}

// =======================
// Search Student
// =======================

function searchStudent() {

    const search = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = students.filter(student =>

        student.name.toLowerCase().includes(search) ||

        student.course.toLowerCase().includes(search)

    );

    displayStudents(filtered);

}

// =======================
// Success / Error Message
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