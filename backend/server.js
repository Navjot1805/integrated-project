


import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import otrRoutes from "./routes/otrRoutes.js"; // optional
import verifyRoutes from "./routes/verifyRoutes.js";
 import uploadRoutes from "./routes/uploadRoutes.js";
// import upload from "./routes/upload.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();   // ✅ define app FIRST

// ========================
// Middleware
// ========================
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Updated CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Updated Helmet (allow images/PDFs cross-origin)
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Ensure 'uploads' folder exists
const uploadDir = path.resolve("./uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(" Uploads folder created");
}

// Serve uploaded files
app.use("/uploads", express.static(uploadDir));

// ========================
// Routes
// ========================
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/faculty", facultyRoutes);
// app.use("/api/otr", otrRoutes); // optional
// app.use("/api/uploads", upload); // ✅ document upload route
 app.use("/api/uploads", uploadRoutes); 
app.use("/api", verifyRoutes);



// Root route
app.get("/", (req, res) => {
  res.json({ message: "🚀 Server is running" });
});

// ========================
// Error Handling Middleware
// ========================
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// ========================
// Start server
// ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








