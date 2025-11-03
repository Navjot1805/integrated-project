



import express from "express";
import { uploadDocuments } from "../middleware/multer.js";
import StudentDetail from "../models/Student.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/documents", authMiddleware, uploadDocuments, async (req, res) => {
  try {
    console.log("FILES received:", req.files); // 🔍 debug

    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ message: "No files uploaded" });

    const documents = {};
    for (const key in req.files) {
      if (req.files[key] && req.files[key][0]) {
        documents[key] = req.files[key][0].path; // store local path
      }
    }

    const student = await StudentDetail.findByIdAndUpdate(
      req.user._id,
      { $set: { documents } },
      { new: true, runValidators: true }
    );

    res.json({ success: true, message: "Documents uploaded successfully", student });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
});

export default router;
