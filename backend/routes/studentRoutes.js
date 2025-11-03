










// import express from "express";
// import {
//   registerStudent,
//   upload,
//   loginStudent,
//   getStudentProfile,
//   updateStudentProfile,
//   verifyStudent // ✅ add this
// } from "../controllers/studentController.js";

// import { verifyToken } from "../middleware/verifyToken.js";

// const router = express.Router();

// // ✅ Verification route
// router.post("/verify", verifyStudent);

// // ✅ Registration route
// router.post(
//   "/register",
//   upload.fields([
//     { name: "aadhaar", maxCount: 1 },
//     { name: "casteCert", maxCount: 1 },
//     { name: "residenceCert", maxCount: 1 },
//     { name: "dmc", maxCount: 1 },
//     { name: "photo", maxCount: 1 }
//   ]),
//   registerStudent
// );

// // ✅ Login route
// router.post("/login", loginStudent);

// // ✅ Profile routes
// router.get("/profile", verifyToken, getStudentProfile);
// router.put("/profile", verifyToken, updateStudentProfile);

// export default router;





import express from "express";
import {
  registerStudent,
  upload,
  loginStudent,
  getStudentProfile,
  updateStudentProfile,
  verifyStudent // ✅ add this
} from "../controllers/studentController.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// ✅ Verification route
router.post("/verify", verifyStudent);

// ✅ Registration route
router.post(
  "/register",
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "casteCert", maxCount: 1 },
    { name: "residenceCert", maxCount: 1 },
    { name: "dmc", maxCount: 1 },
    { name: "photo", maxCount: 1 }
  ]),
  registerStudent
);

// ✅ Login route
router.post("/login", loginStudent);

// ✅ Profile routes
router.get("/profile", verifyToken, getStudentProfile);
router.put("/profile", verifyToken, updateStudentProfile);

export default router;