






import React, { useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import axios from "axios";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FORMATS = ["pdf", "jpg", "jpeg", "png"];

function UploadDocuments() {
  const [files, setFiles] = useState({});
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const documentList = [
    { key: "bank", label: "Bank Passbook" },
    { key: "feeReceipt", label: "Fee Receipt" },
    { key: "freeshipCardNo", label: "Freeship Card No." },
    { key: "studentUndertaking", label: "Student Undertaking" },
    { key: "applicationForm", label: "Application Form" },
    { key: "affidavit", label: "Affidavit" },
    { key: "collegeIDCard", label: "College ID Card" },
    { key: "incomeCert", label: "Income Certificate" },
    { key: "itr", label: "ITR (if any)" },
    { key: "fatherAadhaar", label: "Father Aadhaar" },
    { key: "motherAadhaar", label: "Mother Aadhaar" },
  ];

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    if (!ALLOWED_FORMATS.includes(ext)) {
      alert("Invalid file type! Only PDF or image allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds 5MB limit!");
      return;
    }

    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleRemove = (key) => {
    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setProgress(0);

    if (!Object.keys(files).length) {
      setMessage("Select at least one document to upload");
      return;
    }

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file);
    });

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Login required!");
      return;
    }

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/uploads/documents",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setProgress(percent);
          },
        }
      );

      setMessage("✅ Documents uploaded successfully!");
      console.log(response.data);
      setFiles({});
      setProgress(0);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Upload Documents</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        {documentList.map(({ key, label }) => (
          <div key={key} className="p-2 border rounded flex flex-col">
            <label className="mb-1 font-medium">{label}</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, key)}
              className="mb-2"
            />
            {files[key] && (
              <div className="flex gap-2 items-center">
                <a
                  href={URL.createObjectURL(files[key])}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  <FaEye />
                </a>
                <button
                  type="button"
                  onClick={() => handleRemove(key)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
                <span className="text-sm text-gray-600">{files[key].name}</span>
              </div>
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {uploading ? "Uploading..." : "Upload All"}
          </button>
        </div>
      </form>

      {progress > 0 && (
        <div className="mt-2 w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-blue-600 h-2 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {message && (
        <p
          className={`mt-2 text-center font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default UploadDocuments;
