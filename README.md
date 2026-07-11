# 🎓 Student Management System

A simple and responsive **Student Management System** built with **Node.js, Express.js, SQLite, HTML, CSS, and JavaScript**. The application allows users to manage student records through a clean and user-friendly interface.

---

## 📌 Project Overview

This project provides a complete CRUD (Create, Read, Update, Delete) system for managing student information. It stores student records in a SQLite database and communicates with the frontend using REST APIs built with Express.js.

---

## ✨ Features

* ➕ Add New Student
* 📋 View All Students
* ✏️ Update Student Information
* 🗑️ Delete Student
* 🔍 Search Students by Name or Course
* ✅ Form Validation
* 🚫 Duplicate Student Detection
* 💬 Success & Error Alerts
* 📂 SQLite Database Integration
* 📭 Empty State ("No students found")
* 📱 Responsive User Interface

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js

### Database

* SQLite3

### Tools

* Visual Studio Code
* DB Browser for SQLite
* Git & GitHub

---

## 📁 Project Structure

```text
Student Management System
│
├── node_modules/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── screenshots/
│   ├── home-page.png
│   ├── add-student.png
│   ├── update-student.png
│   └── empty-state.png
│
├── database.db
├── package.json
├── package-lock.json
├── .gitignore
├── server.js
└── README.md
```

---

## 📸 Screenshots

### 🏠 Home Page

![Home Page](screenshots/home-page.png)

### ➕ Add Student

![Add Student](screenshots/add-student.png)

### ✏️ Update Student

![Update Student](screenshots/update-student.png)

### 📭 Empty State

![Empty State](screenshots/empty-state.png)

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Open the project folder

```bash
cd Student-Management-System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

### 5. Open in browser

```text
http://localhost:5000
```

---

## 🌐 API Endpoints

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | /students     | Get all students  |
| POST   | /students     | Add a new student |
| PUT    | /students/:id | Update a student  |
| DELETE | /students/:id | Delete a student  |

---

## 🔮 Future Improvements

* Course dropdown
* Sorting by Name and Course
* Pagination
* Authentication & Login
* Student profile pictures
* Dashboard with statistics

---

## 👩‍💻 Author

**Hafsa Amin**

Computer Science Student
University of Agriculture Faisalabad

---
