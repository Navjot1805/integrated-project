
import DetailsVerification from "../models/DetailsVerification.js";

export const verifyStudent = async (req, res) => {
  try {
    const { rollNo, password } = req.body;

    console.log("🔎 Searching for student:", rollNo, password);

    const student = await DetailsVerification.findOne({ rollNo, password });

    if (!student) {
      console.log("❌ Student not found in DB");
      return res.status(400).json({ success: false, message: "Student not found" });
    }

    console.log("✅ Student verified:", student.rollNo);
    return res.json({ success: true, message: "Verification successful", student });
  } catch (err) {
    console.error("❌ Error in verifyStudent:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



