




// // routes/verifyRoutes.js
// import express from "express";
// import DetailsVerification from "../models/DetailsVerification.js";

// const router = express.Router();

// // ✅ Verify student & return details (including parents)
// router.post("/verify-student", async (req, res) => {
//   const { rollNo, password } = req.body;

//   console.log("📩 Incoming Request:", req.body);

//   try {
//     // Match rollNo + password (support both login styles)
//     const student = await DetailsVerification.findOne({
//       $or: [
//         { rollNo: rollNo, password: password },
//         { regNo: rollNo, regPassword: password },
//       ],
//     }).select("-password -regPassword"); // ❌ Do not send plain passwords

//     console.log("🔍 Student found:", student);

//     if (!student) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     // ✅ Build response with parent + student info
//     const responseData = {
//       rollNo: student.rollNo,
//       regNo: student.regNo,
//       email: student.email,
//       phone: student.phone,

//       // Student academics
//       course: student.course,
//       branch: student.branch,
//       // year: student.year,
//       address: student.address,

//       // Parent details (for auto-fill)
//       fatherName: student.fatherName,
//       motherName: student.motherName,
//       // parentContact: student.parentContact || student.phone, // fallback
//       // parentOccupation: student.parentOccupation,
//       // parentIncome: student.parentIncome,
//     };

//     return res.json({
//       success: true,
//       message: "Verification successful",
//       student: responseData,
//     });
//   } catch (error) {
//     console.error("❌ Error in verification:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;




// routes/verifyRoutes.js
import express from "express";
import DetailsVerification from "../models/DetailsVerification.js";

const router = express.Router();

// POST /api/verify-student
router.post("/verify-student", async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    if (!rollNo || !password) {
      return res.status(400).json({ success: false, message: "Roll No and Password required" });
    }

    const student = await DetailsVerification.findOne({ rollNo, password }).lean(); // .lean() returns plain JS object

    if (!student) {
      return res.status(404).json({ success: false, message: "Invalid Roll No or Password" });
    }

    // Format dateofbirth to YYYY-MM-DD
    if (student.dateofbirth) {
      student.dateofbirth = new Date(student.dateofbirth).toISOString().split("T")[0];
    }

    res.json({ success: true, student });
  } catch (err) {
    console.error("Error verifying student:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;




// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import DetailsVerification from "../models/DetailsVerification.js";

// const router = express.Router();

// // POST /api/verify-student
// router.post("/verify-student", async (req, res) => {
//   try {
//     const { rollNo, password } = req.body;

//     if (!rollNo || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Roll No and Password are required" });
//     }

//     // Find student by roll number
//     const student = await DetailsVerification.findOne({ rollNo });
//     if (!student) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Invalid Roll No or Password" });
//     }

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid Roll No or Password" });
//     }

//     // ✅ Safely format date (handle DD-MM-YYYY)
//     let formattedDOB = "";
//     if (student.dateofbirth) {
//       const parts = student.dateofbirth.split("-");
//       if (parts.length === 3) {
//         // Convert DD-MM-YYYY → YYYY-MM-DD
//         formattedDOB = `${parts[2]}-${parts[1]}-${parts[0]}`;
//       }
//     }

//     // ✅ Create JWT
//     const token = jwt.sign(
//       { id: student._id, rollNo: student.rollNo },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // ✅ Send token as HTTP-only cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // secure in production
//       sameSite: "lax",
//     });

//     // ✅ Remove sensitive data
//     const { password: _, ...safeStudent } = student.toObject();
//     safeStudent.dateofbirth = formattedDOB;

//     res.status(200).json({
//       success: true,
//       student: safeStudent,
//       message: "Student verified successfully",
//     });
//   } catch (err) {
//     console.error("Error verifying student:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// });

// export default router;
