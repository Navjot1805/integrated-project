

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaDownload, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// =============================
// 🔧 Configuration
// =============================
const SERVER_URL = "http://localhost:5000";

const registrationDocsList = [
  { key: "aadhaar", label: "Aadhaar" },
  { key: "casteCert", label: "Caste Certificate" },
  { key: "residenceCert", label: "Residence Certificate" },
  { key: "dmc", label: "DMC" },
  { key: "photo", label: "Photo" },
];

const postRegistrationDocsList = [
  { key: "bank", label: "Bank Document" },
  { key: "feeReceipt", label: "Fee Receipt" },
  { key: "freeshipCardNo", label: "Freeship Card" },
  { key: "studentUndertaking", label: "Student Undertaking" },
  { key: "applicationForm", label: "Application Form" },
  { key: "affidavit", label: "Affidavit" },
  { key: "collegeIDCard", label: "College ID Card" },
  { key: "incomeCert", label: "Income Certificate" },
  { key: "itr", label: "ITR" },
  { key: "fatherAadhaar", label: "Father Aadhaar" },
  { key: "motherAadhaar", label: "Mother Aadhaar" },
];

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const profileRef = useRef();

  // =============================
  // 📦 Fetch Profile Data
  // =============================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated.");

        const res = await axios.get(`${SERVER_URL}/api/students/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(
          err.response?.data?.error ||
            err.message ||
            "Failed to load profile data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // =============================
  // 🔗 Build File URLs Safely
  // =============================
  const getFileURL = (filePath) => {
    if (!filePath) return null;
    const normalized = filePath.replace(/\\/g, "/");
    return normalized.startsWith("http")
      ? normalized
      : `${SERVER_URL}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
  };

  // =============================
  // 🧾 PDF Generation (Multi-page + High Quality)
  // =============================
  const downloadProfilePDF = async () => {
    try {
      const element = profileRef.current;
      if (!element) return alert("Profile section not found!");

      // Scroll to top to capture full section
      window.scrollTo(0, 0);

      const canvas = await html2canvas(element, {
        scale: 2, // for higher quality
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${user?.fullName || "student"}_profile.pdf`);
      alert("✅ Profile PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("⚠️ Error while generating PDF. Please try again.");
    }
  };

  // =============================
  // 🧩 Render Each Document Card
  // =============================
  const renderDocumentCard = (key, label, isArray = false) => {
    const files = isArray
      ? user?.[key] || []
      : user?.documents?.[key]
      ? [user.documents[key]]
      : [];

    if (!files.length) {
      return (
        <div
          key={key}
          className="border rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 bg-gray-50 shadow-sm"
        >
          <p className="font-medium mb-2">{label}</p>
          <p className="text-sm italic">Not Uploaded</p>
        </div>
      );
    }

    return files.map((file, index) => {
      const fileURL = getFileURL(file);
      return (
        <div
          key={`${key}-${index}`}
          className="border rounded-lg p-4 flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition"
        >
          <p className="font-medium mb-2 text-center">{label}</p>
          <div className="flex gap-2 mt-2">
            <a
              href={fileURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 flex items-center gap-1"
            >
              <FaEye /> View
            </a>
            <a
              href={fileURL}
              download
              className="bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700 flex items-center gap-1"
            >
              <FaDownload /> Download
            </a>
          </div>
        </div>
      );
    });
  };

  // =============================
  // 🧠 Conditional Rendering
  // =============================
  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  if (error)
    return <p className="text-red-600 text-center mt-10 font-medium">{error}</p>;

  // =============================
  // 🖼️ Main UI
  // =============================
  return (
    <div
      ref={profileRef}
      className="max-w-6xl mx-auto mt-6 space-y-6 px-4 pb-10"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-xl shadow-md space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <img
            src={
              getFileURL(user?.photo?.[0]) || "https://via.placeholder.com/100"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {user?.fullName || "N/A"}
            </h1>
            <p className="text-gray-600 text-sm">{user?.email || "N/A"}</p>
            <p className="text-gray-600 text-sm">{user?.rollNo || "N/A"}</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link
            to="/Layout/edit-profile"
            className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>
          <button
            onClick={downloadProfilePDF}
            className="bg-green-600 text-white px-3 py-1.5 text-sm rounded hover:bg-green-700 flex items-center transition"
          >
            <FaDownload className="mr-1 text-sm" /> Download PDF
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="p-4 bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {Object.entries({
          "Full Name": user.fullName,
          "Roll No": user.rollNo,
          Email: user.email,
          Phone: user.phone,
          "Date of Birth": user.dateofbirth
            ? new Date(user.dateofbirth).toLocaleDateString("en-GB")
            : "N/A",
          Gender: user.gender,
          Category: user.category,
          Course: user.course,
          Branch: user.branch,
          "Scholarship Application Number": user.applicationNumber,
          "Father's Name": user.fatherName,
          "Mother's Name": user.motherName,
          "Parent Contact": user.parentContact,
          "Parent Occupation": user.parentOccupation,
          "Annual Income": user.parentIncome
            ? `₹${user.parentIncome}`
            : "N/A",
          Address: user.address,
        }).map(([label, value], idx) => (
          <InfoItem
            key={idx}
            label={label}
            value={value}
            fullWidth={label === "Address"}
          />
        ))}
      </div>

      {/* Uploaded Documents */}
      <div className="p-4 bg-white rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center text-blue-700">
          Uploaded Documents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {registrationDocsList.map((doc) =>
            renderDocumentCard(doc.key, doc.label, true)
          )}
          {postRegistrationDocsList.map((doc) =>
            renderDocumentCard(doc.key, doc.label, false)
          )}
        </div>
      </div>
    </div>
  );
}

// =============================
// ℹ️ Info Item Component
// =============================
const InfoItem = ({ label, value, fullWidth }) => (
  <div
    className={`flex justify-between items-center p-2 bg-gray-50 rounded shadow-sm ${
      fullWidth ? "md:col-span-2" : ""
    }`}
  >
    <span className="font-medium text-gray-700">{label}:</span>
    <span className="text-gray-900 text-right break-words">
      {value || "N/A"}
    </span>
  </div>
);

export default UserProfile;
