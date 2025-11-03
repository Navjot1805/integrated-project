



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";

const SERVER_URL = "http://localhost:5000";

function EditProfile() {
  const navigate = useNavigate();
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");
        await axios.get(`${SERVER_URL}/api/students/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      Object.entries(files).forEach(([key, file]) => {
        if (file) formDataToSend.append(key, file);
      });

      await axios.put(`${SERVER_URL}/api/students/profile`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Documents updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.error || "Failed to update documents");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-sm">Loading...</p>
    );

  const documents = [
    { key: "itr", label: "ITR (If applicable)" },
    { key: "affidavit", label: "Income Affidavit" },
    { key: "incomeCert", label: "Income Certificate" },
    { key: "feeReceipt", label: "Latest Fee Receipt" },
    { key: "applicationForm", label: "Application Form" },
    { key: "studentUndertaking", label: "Student Undertaking" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-5 bg-white shadow rounded-xl mt-6">
      <h1 className="text-2xl font-semibold text-center mb-5 text-blue-600">
        Update Your Documents
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {documents.map(({ key, label }) => (
          <div
            key={key}
            className="bg-gray-50 p-3 rounded-md border border-gray-200 hover:border-blue-400 transition"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            <input
              type="file"
              name={key}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="block w-full text-xs text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400 py-1 px-2"
            />
          </div>
        ))}

        {/* Full-width Save Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2 text-sm font-medium mt-3 disabled:opacity-60"
          >
            <FaFileUpload size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
