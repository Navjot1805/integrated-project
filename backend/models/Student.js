


import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  // Student Info
  fullName: { type: String, required: true },
  rollNo: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
    lowercase: true,
    trim: true,
  },
  category: { type: String },
  password: { type: String, required: true, select: false },
  course: String,
  branch: String,
  session: { type: String },
  address: String,
  applicationNumber: { type: Number },

  // Parent Info
  fatherName: String,
  motherName: String,
  parentContact: String,
  parentOccupation: String,
  parentIncome: { type: Number },

  // ✅ Documents uploaded during registration
  aadhaar: [String],
  casteCert: [String],
  dmc: [String],
  residenceCert: [String],
  photo: [String],

  // ✅ Documents uploaded after registration
  documents: {
    bank: String,
    feeReceipt: String,
    freeshipCardNo: String,
    studentUndertaking: String,
    applicationForm: String,
    affidavit: String,
    collegeIDCard: String,
    incomeCert: String,
    itr: String,
    fatherAadhaar: String,
    motherAadhaar: String,
  },
});

export default mongoose.model("StudentDetail", studentSchema);
