


// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const router = express.Router();

// // =============================
// // Setup Upload Storage
// // =============================
// const uploadDir = path.resolve("uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${ext}`);
//   },
// });

// // Allowed file formats
// const allowedFormats = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (allowedFormats.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type"));
//     }
//   },
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// });

// // =============================
// // POST: Upload Documents
// // =============================
// router.post("/documents", upload.any(), async (req, res) => {
//   try {
//     console.log("📥 Incoming upload...");
//     console.log("Files received:", req.files);

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ error: "No files uploaded" });
//     }

//     const uploaded = req.files.map((file) => ({
//       fieldname: file.fieldname,
//       filename: file.filename,
//       path: `/uploads/${file.filename}`,
//     }));

//     res.status(200).json({
//       message: "✅ Files uploaded successfully!",
//       files: uploaded,
//     });
//   } catch (err) {
//     console.error("❌ Upload error:", err.message);
//     res.status(400).json({ error: err.message || "Upload failed" });
//   }
// });

// export default router;


import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyToken } from "../middleware/verifyToken.js";
import StudentDetail from "../models/Student.js";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const allowedFormats = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (allowedFormats.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Invalid file type"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

// =============================
// POST: Upload + Save to DB
// =============================
router.post("/documents", verifyToken, upload.any(), async (req, res) => {
  try {
    console.log("📥 Uploading files for student:", req.user.id);

    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });

    const student = await StudentDetail.findById(req.user.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    // Ensure student.documents exists
    if (!student.documents) student.documents = {};

    req.files.forEach((file) => {
      const field = file.fieldname;
      const filePath = `/uploads/${file.filename}`;
      student.documents[field] = filePath;
    });

    await student.save();

    res.status(200).json({
      message: "✅ Documents uploaded successfully!",
      documents: student.documents,
    });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(400).json({ error: err.message || "Upload failed" });
  }
});

export default router;

