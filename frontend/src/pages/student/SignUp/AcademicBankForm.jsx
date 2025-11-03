




import React, { useState } from "react";
import InputField from "./InputField";

function StudentBankForm({ formData, handleChange, nextStep, prevStep }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // Bank Name
    if (!formData.bankName || formData.bankName.trim() === "") {
      newErrors.bankName = "Bank name is required";
    }

    // Account Number (9–18 digits only)
    if (!/^\d{9,18}$/.test(formData.accountNumber || "")) {
      newErrors.accountNumber = "Account Number must be 9 to 18 digits";
    }

    // IFSC Code (4 letters + 0 + 6 digits/alphanumeric)
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc || "")) {
      newErrors.ifsc = "Invalid IFSC Code (e.g., SBIN0123456)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleNext} className="p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">🏦 Bank Details</h2>

      {/* Bank Name */}
      <InputField
        label="Bank Name"
        name="bankName"
        value={formData.bankName || ""}
        handleChange={handleChange}
        placeholder="e.g., State Bank of India"
        required
      />
      {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}

      {/* Account Number */}
      <InputField
        label="Account Number"
        name="accountNumber"
        value={formData.accountNumber || ""}
        handleChange={handleChange}
        type="text"
        placeholder="Enter account number (9–18 digits)"
        required
      />
      {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}

      {/* IFSC Code */}
      <InputField
        label="IFSC Code"
        name="ifsc"
        value={formData.ifsc || ""}
        handleChange={handleChange}
        placeholder="e.g., SBIN0123456"
        required
      />
      {errors.ifsc && <p className="text-red-500 text-sm">{errors.ifsc}</p>}

      {/* Navigation Buttons */}
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
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Next →
        </button>
      </div>
    </form>
  );
}

export default StudentBankForm;
