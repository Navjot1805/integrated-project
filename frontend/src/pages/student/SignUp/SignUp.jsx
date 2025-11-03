







// src/pages/student/SignUp/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentInfoForm from "./StudentInfoForm";
import ParentInfoForm from "./ParentInfoForm";
import CertificatesForm from "./CertificatesForm";
import ProgressBar from "./ProgressBar";
import axios from "axios";

function SignUp() {
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Student Info
    fullName: "",
    rollNo: "",
    email: "",
    phone: "",
    dateofbirth: "",
    gender: "",
    category: "",
    course: "",
    branch: "",
    session: "",
    address: "",
    username: "",
    password: "",
    applicationNumber: "",

    // Parent Info
    fatherName: "",
    motherName: "",
    parentContact: "",
    parentOccupation: "",
    parentIncome: "",

    // Certificates
    aadhaar: null,
    casteCert: null,
    residenceCert: null,
    dmc: null,
    photo: null,
  });

  // Handle input & file changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Step navigation
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // ================= VERIFY STUDENT =================
  const verifyStudent = async () => {
    if (!formData.rollNo || !formData.password) {
      alert("⚠️ Please enter Roll No and Password first!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/verify-student", {
        rollNo: formData.rollNo,
        password: formData.password,
      });

      if (res.data.success) {
        const student = res.data.student;
        alert("✅ Student verified successfully!");

        setFormData((prev) => ({
          ...prev,
          ...{
            fullName: student.fullName || "",
            rollNo: student.rollNo || "",
            email: student.email || "",
            phone: student.phone || "",
            dateofbirth: student.dateofbirth
              ? new Date(student.dateofbirth).toISOString().split("T")[0]
              : "",
            gender: student.gender || "",
            address: student.address || "",
            fatherName: student.fatherName || "",
            motherName: student.motherName || "",
            category: student.category || "",
            course: student.course || "",
            branch: student.branch || "",
            session: student.session || "",
            applicationNumber: student.applicationNumber || "",
            username: formData.username,
            password: formData.password,
          },
        }));
        setVerified(true);
      } else {
        alert(res.data.message || "❌ Invalid Roll No or Password");
      }
    } catch (err) {
      console.error("Error verifying student:", err);
      alert("⚠️ Error verifying student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= FINAL SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      // Prepare form data
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") form.append(key, value);
      });

      // 1️⃣ Register student
      const registerRes = await fetch(
        "http://localhost:5000/api/students/register",
        {
          method: "POST",
          body: form,
        }
      );

      const result = await registerRes.json();
      console.log("Registration result:", result);

      if (!registerRes.ok) {
        alert("❌ " + (result.error || "Something went wrong during registration"));
        return;
      }

      alert("✅ Registration successful!");

      // 2️⃣ Auto login the student
      const loginRes = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rollNo: formData.rollNo,
          password: formData.password,
        }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok && loginData.token) {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.student));
        alert("🎉 Some documents are pending to upload!");
        navigate("/Layout/profile");
      } else {
        alert("⚠️ Registered but login failed. Please login manually.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("⚠️ Failed to connect to server!");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="max-w-2xl mx-auto mt-5 mb-5 bg-white shadow-lg rounded-xl p-6">
      <ProgressBar step={step} />

      {step === 1 && (
        <StudentInfoForm
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          verifyStudent={verifyStudent}
          verified={verified}
          loading={loading}
        />
      )}

      {step === 2 && (
        <ParentInfoForm
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 3 && (
        <CertificatesForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          prevStep={prevStep}
          loading={loading}
        />
      )}
    </div>
  );
}

export default SignUp;
