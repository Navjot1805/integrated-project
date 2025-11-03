// // import jwt from "jsonwebtoken";
// // // import bcrypt from "bcryptjs";
// // import Faculty from "../models/Faculty.js";

// // export const loginFaculty = async (req, res) => {
// //   const { username, password } = req.body;

// //   console.log(username, ", ", password);
// //   try {
// //     const user = await Faculty.findOne({ username });
// //     if (user) {
// //       console.log(' User found:', user);
// //     } else {
// //       console.log('No user found with this username');
// //     }



// //     if (!user) return res.status(400).json({ error: "User not found" });

// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
// //     res.json({ token, user });
// //   } catch (err) {
// //     console.log("error is: ",err);
// //     res.status(500).json({ error: "Server error" });
// //   }
// // };



// import mongoose from "mongoose";
// import twilio from "twilio";
// import dotenv from "dotenv";

// dotenv.config();

// // 🔍 Debug environment variables
// console.log("🔍 TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
// console.log("🔍 TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "Loaded ✅" : "Missing ❌");
// console.log("🔍 TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);

// // Initialize Twilio client
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// // In-memory storage for messages
// let messages = [];

// // /* ============================================================
// //    FETCH ALL STUDENTS
// // ============================================================ */
// export const getAllStudents = async (req, res) => {
//   try {
//     const { branch, session } = req.query;
//     const db = mongoose.connection.useDb("studentAcedmics");
//     const collection = db.collection("studentdetails");

//     const query = {};
//     if (branch && branch !== "all") query.branch = branch.trim();
//     if (session && session !== "all") query.session = session.trim();

//     const students = await collection.find(query).toArray();

//     if (!students || students.length === 0) {
//       return res.status(404).json({ message: "No students found" });
//     }

//     res.status(200).json({ success: true, count: students.length, students });
//   } catch (err) {
//     console.error("Error fetching students:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // /* ============================================================
// //    FETCH SINGLE STUDENT BY ID
// // ============================================================ */
// export const getStudentById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).json({ message: "Invalid student ID" });

//     const db = mongoose.connection.useDb("studentAcedmics");
//     const collection = db.collection("studentdetails");

//     const student = await collection.findOne({
//       _id: new mongoose.Types.ObjectId(id),
//     });

//     if (!student) return res.status(404).json({ message: "Student not found" });

//     const flatStudent = { ...student, ...(student.documents || {}) };
//     res.status(200).json({ success: true, student: flatStudent });
//   } catch (err) {
//     console.error("Error fetching student:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// /* ============================================================
//    SEND MESSAGE VIA TWILIO
// ============================================================ */
// export const sendMessage = async (req, res) => {
//   try {
//     const { studentId, message } = req.body;

//     if (!studentId || !message) {
//       return res
//         .status(400)
//         .json({ error: "Student ID and message are required" });
//     }

//     // Fetch student
//     const db = mongoose.connection.useDb("studentAcedmics");
//     const collection = db.collection("studentdetails");
//     const student = await collection.findOne({
//       _id: new mongoose.Types.ObjectId(studentId),
//     });

//     if (!student) return res.status(404).json({ error: "Student not found" });

//     // ✅ Fix phone format
//     let phoneToSend = student.phone?.toString().trim() || "";
//     if (!phoneToSend) {
//       return res
//         .status(400)
//         .json({ error: "Student does not have a phone number" });
//     }

//     // Add +91 if missing
//     const finalPhone = phoneToSend.startsWith("+")
//       ? phoneToSend
//       : `+91${phoneToSend}`;

//     console.log("📞 Sending message to:", finalPhone);

//     try {
//       const result = await client.messages.create({
//         body: message,
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: finalPhone,
//       });

//       console.log("✅ Twilio message SID:", result.sid);

//       const newMsg = {
//         studentId,
//         message,
//         timestamp: new Date().toISOString(),
//       };
//       messages.push(newMsg);

//       return res.json({
//         success: true,
//         sid: result.sid,
//         msg: "Message sent successfully via Twilio",
//       });
//     } catch (twilioError) {
//       console.error("❌ Twilio Error:", twilioError);
//       return res.status(500).json({
//         success: false,
//         msg: "Failed to send message via Twilio",
//         error: twilioError.message,
//       });
//     }
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({
//       success: false,
//       msg: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// // /* ============================================================
// //    GET MESSAGES
// // ============================================================ */
// export const getMessages = (req, res) => {
//   try {
//     const { id } = req.params;
//     const studentMessages = messages.filter((msg) => msg.studentId === id);
//     res.json({ messages: studentMessages });
//   } catch (error) {
//     console.error("Error fetching messages:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


import mongoose from "mongoose";
import twilio from "twilio";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Faculty from "../models/Faculty.js";

dotenv.config();

// 🔍 Debug environment variables
console.log("🔍 TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("🔍 TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN ? "Loaded ✅" : "Missing ❌");
console.log("🔍 TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// In-memory message storage
let messages = [];

/* ============================================================
   FACULTY LOGIN
============================================================ */
export const loginFaculty = async (req, res) => {
  const { username, password } = req.body;
  console.log("Faculty Login Attempt:", username);

  try {
    // 1️⃣ Check if user exists
    const user = await Faculty.findOne({ username });
    if (!user) {
      console.log("❌ No user found for:", username);
      return res.status(404).json({ error: "User not found" });
    }

    // 2️⃣ Password check (no bcrypt for now)
    if (user.password !== password) {
      console.log("❌ Invalid password for:", username);
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("✅ Faculty logged in:", username);
    return res.json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};



/* ============================================================
   FETCH ALL STUDENTS
============================================================ */
export const getAllStudents = async (req, res) => {
  try {
    const { branch, session } = req.query;
    const db = mongoose.connection.useDb("studentAcedmics");
    const collection = db.collection("studentdetails");

    const query = {};
    if (branch && branch !== "all") query.branch = branch.trim();
    if (session && session !== "all") query.session = session.trim();

    const students = await collection.find(query).toArray();
    if (!students.length) return res.status(404).json({ message: "No students found" });

    res.status(200).json({ success: true, count: students.length, students });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   FETCH SINGLE STUDENT BY ID
============================================================ */
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid student ID" });

    const db = mongoose.connection.useDb("studentAcedmics");
    const collection = db.collection("studentdetails");

    const student = await collection.findOne({ _id: new mongoose.Types.ObjectId(id) });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ success: true, student: { ...student, ...(student.documents || {}) } });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   SEND MESSAGE VIA TWILIO
============================================================ */
export const sendMessage = async (req, res) => {
  try {
    const { studentId, message } = req.body;
    if (!studentId || !message)
      return res.status(400).json({ error: "Student ID and message are required" });

    const db = mongoose.connection.useDb("studentAcedmics");
    const collection = db.collection("studentdetails");
    const student = await collection.findOne({ _id: new mongoose.Types.ObjectId(studentId) });

    if (!student) return res.status(404).json({ error: "Student not found" });

    const phone = student.phone?.toString().trim();
    if (!phone) return res.status(400).json({ error: "Student has no phone number" });

    const finalPhone = phone.startsWith("+") ? phone : `+91${phone}`;
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: finalPhone,
    });

    messages.push({ studentId, message, timestamp: new Date().toISOString() });

    res.json({ success: true, sid: result.sid, msg: "Message sent successfully via Twilio" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/* ============================================================
   GET MESSAGES
============================================================ */
export const getMessages = (req, res) => {
  try {
    const { id } = req.params;
    const studentMessages = messages.filter((m) => m.studentId === id);
    res.json({ messages: studentMessages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
