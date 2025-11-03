import mongoose from "mongoose";

const detailsVerificationSchema = new mongoose.Schema({



 fullName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  rollNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  dateofbirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male','Female','Other'],
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  fatherName: {
    type: String
  },
  motherName: {
    type: String
  }
}, {
  timestamps: true
});

const DetailsVerification = mongoose.model(
  "DetailsVerification",
  detailsVerificationSchema,
  "detailsVerification" // ✅ exact name in MongoDB
);

export default DetailsVerification;
