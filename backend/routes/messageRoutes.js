/// admin_backend/routes/messageRoutes.js
import express from "express";
const router = express.Router();

// In-memory storage for messages
const messages = [];

// Send message
router.post("/sendMessage", (req, res) => {
  const { studentId, message } = req.body;
  if (!studentId || !message) {
    return res.status(400).json({ success: false, error: "Student ID and message required" });
  }

  messages.push({
    studentId,
    message,
    timestamp: new Date(),
  });

  console.log("Message stored:", { studentId, message });
  res.json({ success: true });
});

// Get messages for a student
router.get("/messages/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const studentMessages = messages.filter((m) => m.studentId === studentId);
  res.json({ success: true, messages: studentMessages });
});

export default router;
