# ⚙️ LMS Backend (Node.js + Express + MongoDB)

This is the **backend** of the Learning Management System (LMS).  
It provides RESTful APIs for **authentication**, **course management**, **attendance tracking**, **grade recording**, and **payment management**.

---

## 🚀 Features

### 👨‍🎓 Student
- View attendance and grades
- Pay fees and generate receipts
- Access report cards

### 👩‍🏫 Instructor
- Mark student attendance
- Upload lessons and assignments
- Grade submissions

### 🧑‍💼 Admin
- Manage users and roles
- Create class schedules
- Generate analytics and reports

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |
| Environment | dotenv |
| Middleware | CORS, express.json() |
| Deployment | Render / Railway / AWS |

---

## 🧱 Project Structure

````

server/
├── config/            # DB connection setup
├── controllers/       # Business logic
├── middleware/        # Auth & role check middleware
├── models/            # Mongoose schemas
├── routes/            # API route handlers
├── server.js          # Entry point
└── .env               # Environment variables

````

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/PUSKAR-DJ/lms-backend.git
cd lms-backend
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/lms
JWT_SECRET=mySecretKey
CORS_ORIGIN=http://localhost:5173
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

*(Add this script in package.json if missing)*

```json
"scripts": {
  "dev": "nodemon server.js"
}
```
---

## 🧪 Testing with Postman

To easily test the authentication routes, you can use the provided Postman collection JSON.

**Prerequisites:**
* Postman is installed.
* Your backend server is running (`npm run dev`).

**Instructions:**

1.  **Import Collection**: Open Postman and import the `LMS-Auth.json` file.
2.  **Check Variables**: The collection uses a variable `{{baseUrl}}` to manage the API URL.
    * Click on the "LMS Backend (Auth)" collection, go to the **Variables** tab.
    * The `baseUrl` is pre-set to `http://localhost:5000/api/auth`, which matches your `.env` and `server.js` setup. If your port is different, you only need to change it here.
3.  **Run Requests**:
    * **`POST` Register User**: Run this request first to create a new user in your database. You can change the `email`, `password`, and `role` in the `Body` tab.
    * **`POST` Login User**: After registering, run this request with the *same credentials* to test the login. If successful, you will receive a JWT `token`.

This workflow allows you to quickly verify that user registration (with password hashing) and login (with password comparison) are working correctly.
---

## 🔗 API Endpoints Overview

| Method | Endpoint                     | Role       | Description                |
| ------ | ---------------------------- | ---------- | -------------------------- |
| POST   | `/api/auth/login`            | All        | Login using email/password |
| GET    | `/api/student/attendance`    | Student    | View attendance            |
| POST   | `/api/instructor/attendance` | Instructor | Mark attendance            |
| POST   | `/api/admin/schedule`        | Admin      | Create schedule            |
| GET    | `/api/schedule`              | All        | View schedule              |
| POST   | `/api/fees/pay`              | Student    | Pay fees and store receipt |

---

## 🧠 Example: Auth Route

`routes/authRoutes.js`

```js
import express from "express";
import { loginUser } from "../controllers/authController.js";
const router = express.Router();

router.post("/login", loginUser);

export default router;
```

`controllers/authController.js`

```js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token, role: user.role });
};
```

---

## 🧩 Database Models

Key Schemas:

* User (Admin / Instructor / Student)
* Department
* Course
* Attendance
* Assignment & Submission
* Grade & ReportCard
* Fees
* Schedule

Each schema is modularized under `/models`.

---

## 🛠️ Deployment Tips

* Use **Render** or **Railway** for backend
* Use **MongoDB Atlas** for cloud DB
* Enable **CORS** for frontend origin
* Add CI workflow for auto-deploy

---

## 💡 Future Enhancements

* Add admin dashboard analytics endpoint
* File upload support for submissions
* Real-time class schedule updates with WebSockets
* Email notifications via Nodemailer

---

## 🧑‍💻 Contributors

* [Raj Sharma](https://github.com/rajsha10)
* [Pronay Sarkar](https://github.com/PronaySarkar)
* [Subhadip Mandal](https://github.com/Subhadip1001)
* [Puskar Saha](https://github.com/PUSKAR-DJ)

---