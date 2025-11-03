import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Student Registration (credentials only)
export const registerStudent = async (req, res) => {
  try {
    const { FullName, rollNo, email, password } = req.body;

    if (!FullName || !rollNo || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingStudent = await Student.findOne({ rollNo });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      FullName,
      rollNo,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Student registered successfully", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Student Login
export const loginStudent = async (req, res) => {
  try {
    const { username, password } = req.body; // username = rollNo

    const student = await Student.findOne({ rollNo: username });
    if (!student) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: student._id }, "your_jwt_secret", { expiresIn: "7d" });

    res.json({ message: "Login successful", token, user: student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
