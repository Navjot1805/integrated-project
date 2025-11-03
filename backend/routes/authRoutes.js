

import express from "express";
import { loginStudent, registerStudent } from "../controllers/authController.js";

const router = express.Router();

/**
 * @route   GET /api/auth
 * @desc    Test route to check if API is working
 * @access  Public
 */
router.get("/", (req, res) => {
  res.json({ message: "✅ Auth API is working" });
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new student
 * @access  Public
 */
router.post("/register", registerStudent);

/**
 * @route   POST /api/auth/login
 * @desc    Login student
 * @access  Public
 */
router.post("/login", loginStudent);

export default router;
