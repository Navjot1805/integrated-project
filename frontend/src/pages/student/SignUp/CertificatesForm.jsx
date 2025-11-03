

import React from "react";
import { FaFilePdf, FaFileImage } from "react-icons/fa";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

function CertificatesForm({ formData, handleChange, handleSubmit, prevStep, removeFile }) {
  // File validation
  const validateFile = (file, type) => {
    if (!file) return false;
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be <= 2MB");
      return false;
    }
    if (type === "pdf" && file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return false;
    }
    if (type === "image" && !file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return false;
    }
    return true;
  };

  // Generic input renderer
  const renderFileInput = (label, name, type = "pdf") => (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        name={name}
        accept={type === "pdf" ? ".pdf" : "image/*"}
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          if (!validateFile(file, type)) {
            e.target.value = "";
            return;
          }
          handleChange(e);
        }}
        className="border p-2 rounded w-full"
        required
      />

      {/* Preview Section */}
      {formData[name] && (
        <div className="mt-2 flex items-center justify-between bg-gray-100 p-2 rounded">
          {type === "image" ? (
            <img
              src={URL.createObjectURL(formData[name])}
              alt={`${label} Preview`}
              className="w-20 h-20 rounded object-cover border"
            />
          ) : (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <FaFilePdf className="text-red-600 text-xl" />
              <span>{formData[name].name}</span>
            </div>
          )}
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => removeFile(name)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
            <label className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer transition">
              Edit
              <input
                type="file"
                accept={type === "pdf" ? ".pdf" : "image/*"}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (!validateFile(file, type)) {
                    e.target.value = "";
                    return;
                  }
                  handleChange({ target: { name, files: e.target.files } });
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg shadow-md space-y-4 bg-white"
    >
      <h2 className="text-xl font-bold mb-6 text-gray-800">Upload Certificates</h2>

      {/* {renderFileInput("Income Certificate", "incomeCert")} */}
      {/* {renderFileInput("Student Aadhaar Card", "aadhaar")} */}
      {/* {renderFileInput("Father's Aadhaar Card", "fatherAadhaar")} */}
      {/* {renderFileInput("Mother's Aadhaar Card", "motherAadhaar")} */}


      {renderFileInput("Student Aadhaar Card", "aadhaar")}
      {renderFileInput("Caste Certificate", "casteCert")}
      {renderFileInput("Residence Certificate", "residenceCert")}
      {renderFileInput("DMCs (10th & 12th)", "dmc")}
      {renderFileInput("Passport Size Photo", "photo", "image")}

      
        {/* {renderFileInput("ITR", "itr")} */}
      {/* {renderFileInput("Bank Passbook (First Page)", "bank")} */}
      {/* {renderFileInput("Latest Fee Receipt", "feeReceipt")} */}
      {/* {renderFileInput("Freeship Card", "freeshipCardNo")} */}
      {/* new  */}
      
      {/* {renderFileInput("Student Undertaking attested by notary", "studentUndertaking")}
      {renderFileInput("Application Form(current)", "applicationForm")}
      {renderFileInput("Affidavit of Parents Income", "affidavit")}
      {renderFileInput("College ID Card", "collegeIDCard")}
       */}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CertificatesForm;
