




// import StudentDetail from "../models/Student.js";
// import DetailsVerification from "../models/DetailsVerification.js"; // for verification
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// // ================= Multer Setup =================
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
//   cb(null, allowedTypes.includes(file.mimetype));
// };

// export const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter,
// });

// // ================= Register Student =================
// export const registerStudent = async (req, res) => {
//   try {
//     const {
//       fullName, rollNo, email, phone, dateofbirth, gender, category,
//       course, branch, session, address, applicationNumber,
//       fatherName, motherName, parentContact, parentOccupation, parentIncome,
//       password,
//     } = req.body;

//     // Validate required fields
//     const requiredFields = ["fullName","rollNo","email","phone","dateofbirth","gender","course","branch","session","address","applicationNumber","password"];
//     for (let field of requiredFields) {
//       if (!req.body[field] || req.body[field].toString().trim() === "")
//         return res.status(400).json({ error: `${field} is required` });
//     }

//     const existingStudent = await StudentDetail.findOne({ rollNo });
//     if (existingStudent) return res.status(400).json({ error: "Student already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newStudent = new StudentDetail({
//       fullName, rollNo, email, phone, dateofbirth, gender, category,
//       password: hashedPassword, course, branch, session, address, applicationNumber,
//       fatherName, motherName, parentContact, parentOccupation, parentIncome,
//       aadhaar: req.files?.aadhaar?.map(f => f.path) || [],
//       casteCert: req.files?.casteCert?.map(f => f.path) || [],
//       residenceCert: req.files?.residenceCert?.map(f => f.path) || [],
//       dmc: req.files?.dmc?.map(f => f.path) || [],
//       photo: req.files?.photo?.map(f => f.path) || [],
//     });

//     await newStudent.save();

//     const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

//     res.status(201).json({
//       message: "Student registered successfully",
//       token,
//       student: { ...newStudent.toObject(), password: undefined, _id: newStudent._id.toString() }
//     });

//   } catch (error) {
//     console.error("registerStudent error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



// export const verifyStudent = async (req, res) => {
//   try {
//     const { rollNo, password } = req.body;

//     // ✅ Validate input
//     if (!rollNo || !password) {
//       return res.status(400).json({ success: false, message: "Roll No and Password required" });
//     }

//     // ✅ Find student by roll number
//     const student = await DetailsVerification.findOne({ rollNo }).lean();
//     if (!student) {
//       return res.status(404).json({ success: false, message: "Invalid Roll No or Password" });
//     }

//     // ✅ Compare password
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid Roll No or Password" });
//     }

//     // ✅ Format Date of Birth for frontend input[type="date"]
//     let dob = "";
//     if (student.dateofbirth) {
//       const date = new Date(student.dateofbirth);
//       if (!isNaN(date.getTime())) {
//         // Adjust for timezone to prevent off-by-one errors
//         const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
//         dob = localDate.toISOString().split("T")[0]; // YYYY-MM-DD
//       }
//     }

//     // ✅ Prepare student object for frontend
//     const responseStudent = {
//       ...student,
//       password: undefined, // never send password
//       dateofbirth: dob,
//       rollNo: student.rollNo || "",
//       fullName: student.fullName || "",
//       email: student.email || "",
//       phone: student.phone || "",
//       gender: student.gender || "",
//       category: student.category || "",
//       course: student.course || "",
//       branch: student.branch || "",
//       session: student.session || "",
//       address: student.address || "",
//       applicationNumber: student.applicationNumber || "",
//     };

//     // ✅ Send success response
//     res.json({ success: true, student: responseStudent });

//   } catch (err) {
//     console.error("verifyStudent error:", err);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };





//  // ================= Login Student =================
// export const loginStudent = async (req, res) => {
//   try {
//     const { rollNo, password } = req.body;
//     if (!rollNo || !password) return res.status(400).json({ error: "Roll Number and Password required" });

//     const student = await StudentDetail.findOne({ rollNo }).select("+password");
//     if (!student) return res.status(401).json({ error: "Invalid Roll Number or Password" });

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid Roll Number or Password" });

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
//     res.json({ message: "Login successful", token, student: { ...student.toObject(), password: undefined } });
//   } catch (error) {
//     console.error("loginStudent error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// // ================= Get Profile =================
// export const getStudentProfile = async (req, res) => {
//   try {
//     const student = await StudentDetail.findById(req.user.id).select("-password");
//     if (!student) return res.status(404).json({ error: "Student not found" });

//     res.json(student);
//   } catch (error) {
//     console.error("getStudentProfile error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };










// // ================= Update Profile =================
// export const updateStudentProfile = async (req, res) => {
//   try {
//     const updates = { ...req.body };
//     for (let key in req.files) updates[key] = req.files[key].map(f => f.path);

//     const student = await StudentDetail.findByIdAndUpdate(
//       req.user.id,
//       { $set: updates },
//       { new: true, runValidators: true }
//     ).select("-password");

//     if (!student) return res.status(404).json({ error: "Student not found" });
//     res.json({ message: "Profile updated successfully", student });
//   } catch (error) {
//     console.error("updateStudentProfile error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



// //============= upload documents ================
// // import StudentDetail from "../models/Student.js";


// export const uploadStudentDocuments = async (req, res) => {
//   try {
//     const { rollNo } = req.params;

//     const student = await StudentDetail.findOne({ rollNo });
//     if (!student)
//       return res.status(404).json({ error: "Student not found" });

//     if (!req.files || req.files.length === 0)
//       return res.status(400).json({ error: "No files uploaded" });

//     // Initialize if missing
//     if (!student.documents) student.documents = {};

//     req.files.forEach((file) => {
//       const field = file.fieldname;
//       const filePath = `/uploads/${file.filename}`;
//       student.documents[field] = filePath;
//     });

//     await student.save();

//     res.status(200).json({
//       message: "Documents uploaded successfully",
//       documents: student.documents,
//     });
//   } catch (error) {
//     console.error("uploadStudentDocuments error:", error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// };

import StudentDetail from "../models/Student.js";
import DetailsVerification from "../models/DetailsVerification.js"; // for verification
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";

// ================= Multer Setup =================
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
  cb(null, allowedTypes.includes(file.mimetype));
};

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

// ================= Register Student =================
export const registerStudent = async (req, res) => {
  try {
    const {
      fullName, rollNo, email, phone, dateofbirth, gender, category,
      course, branch, session, address, applicationNumber,
      fatherName, motherName, parentContact, parentOccupation, parentIncome,
      password,
    } = req.body;

    // Validate required fields
    const requiredFields = ["fullName","rollNo","email","phone","dateofbirth","gender","course","branch","session","address","applicationNumber","password"];
    for (let field of requiredFields) {
      if (!req.body[field] || req.body[field].toString().trim() === "")
        return res.status(400).json({ error: `${field} is required` });
    }

    const existingStudent = await StudentDetail.findOne({ rollNo });
    if (existingStudent) return res.status(400).json({ error: "Student already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new StudentDetail({
      fullName, rollNo, email, phone, dateofbirth, gender, category,
      password: hashedPassword, course, branch, session, address, applicationNumber,
      fatherName, motherName, parentContact, parentOccupation, parentIncome,
      aadhaar: req.files?.aadhaar?.map(f => f.path) || [],
      casteCert: req.files?.casteCert?.map(f => f.path) || [],
      residenceCert: req.files?.residenceCert?.map(f => f.path) || [],
      dmc: req.files?.dmc?.map(f => f.path) || [],
      photo: req.files?.photo?.map(f => f.path) || [],
    });

    await newStudent.save();

    const token = jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

    res.status(201).json({
      message: "Student registered successfully",
      token,
      student: { ...newStudent.toObject(), password: undefined, _id: newStudent._id.toString() }
    });

  } catch (error) {
    console.error("registerStudent error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const verifyStudent = async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    // ✅ Validate input
    if (!rollNo || !password) {
      return res.status(400).json({ success: false, message: "Roll No and Password required" });
    }

    // ✅ Find student by roll number
    const student = await DetailsVerification.findOne({ rollNo }).lean();
    if (!student) {
      return res.status(404).json({ success: false, message: "Invalid Roll No or Password" });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Roll No or Password" });
    }

    // ✅ Format Date of Birth for frontend input[type="date"]
    let dob = "";
    if (student.dateofbirth) {
      const date = new Date(student.dateofbirth);
      if (!isNaN(date.getTime())) {
        // Adjust for timezone to prevent off-by-one errors
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        dob = localDate.toISOString().split("T")[0]; // YYYY-MM-DD
      }
    }

    // ✅ Prepare student object for frontend
    const responseStudent = {
      ...student,
      password: undefined, // never send password
      dateofbirth: dob,
      rollNo: student.rollNo || "",
      fullName: student.fullName || "",
      email: student.email || "",
      phone: student.phone || "",
      gender: student.gender || "",
      category: student.category || "",
      course: student.course || "",
      branch: student.branch || "",
      session: student.session || "",
      address: student.address || "",
      applicationNumber: student.applicationNumber || "",
    };

    // ✅ Send success response
    res.json({ success: true, student: responseStudent });

  } catch (err) {
    console.error("verifyStudent error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





 // ================= Login Student =================
export const loginStudent = async (req, res) => {
  try {
    const { rollNo, password } = req.body;
    if (!rollNo || !password) return res.status(400).json({ error: "Roll Number and Password required" });

    const student = await StudentDetail.findOne({ rollNo }).select("+password");
    if (!student) return res.status(401).json({ error: "Invalid Roll Number or Password" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid Roll Number or Password" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
    res.json({ message: "Login successful", token, student: { ...student.toObject(), password: undefined } });
  } catch (error) {
    console.error("loginStudent error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// ================= Get Profile =================
export const getStudentProfile = async (req, res) => {
  try {
    const student = await StudentDetail.findById(req.user.id).select("-password");
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json(student);
  } catch (error) {
    console.error("getStudentProfile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};










// ================= Update Profile =================
export const updateStudentProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    for (let key in req.files) updates[key] = req.files[key].map(f => f.path);

    const student = await StudentDetail.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Profile updated successfully", student });
  } catch (error) {
    console.error("updateStudentProfile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//============= upload documents ================
// import StudentDetail from "../models/Student.js";


export const uploadStudentDocuments = async (req, res) => {
  try {
    const { rollNo } = req.params;

    const student = await StudentDetail.findOne({ rollNo });
    if (!student)
      return res.status(404).json({ error: "Student not found" });

    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });

    // Initialize if missing
    if (!student.documents) student.documents = {};

    req.files.forEach((file) => {
      const field = file.fieldname;
      const filePath = `/uploads/${file.filename}`;
      student.documents[field] = filePath;
    });

    await student.save();

    res.status(200).json({
      message: "Documents uploaded successfully",
      documents: student.documents,
    });
  } catch (error) {
    console.error("uploadStudentDocuments error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
};