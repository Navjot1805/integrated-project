



import multer from "multer";
import path from "path";

// Create storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // files will be stored in "uploads" folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + "-" + Date.now() + ext;
    cb(null, name);
  },
});

// File filter
const allowedFormats = ["pdf", "jpg", "jpeg", "png"];
const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop().toLowerCase();
  if (allowedFormats.includes(ext)) cb(null, true);
  else cb(new Error("Only PDF or images are allowed"));
};

export const uploadDocuments = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter,
}).fields([
  { name: "bank", maxCount: 1 },
  { name: "feeReceipt", maxCount: 1 },
  { name: "freeshipCardNo", maxCount: 1 },
  { name: "studentUndertaking", maxCount: 1 },
  { name: "applicationForm", maxCount: 1 },
  { name: "affidavit", maxCount: 1 },
  { name: "collegeIDCard", maxCount: 1 },
  { name: "incomeCert", maxCount: 1 },
  { name: "itr", maxCount: 1 },
  { name: "fatherAadhaar", maxCount: 1 },
  { name: "motherAadhaar", maxCount: 1 },
]);


