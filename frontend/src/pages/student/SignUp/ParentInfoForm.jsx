import React from "react";
import InputField from "./InputField";

function ParentInfoForm({ formData, handleChange, nextStep, prevStep }) {
  // Predefined income ranges
  const incomeOptions = [
    { label: "₹2,00,000 - 3,00,000", value: 200000 },
    { label: "₹3,00,001 - 5,00,000", value: 300001 },
    { label: "₹5,00,001 - 7,00,000", value: 500001 },
    { label: "₹7,00,001 - 10,00,000", value: 700001 },
    { label: "Above ₹10,00,000", value: 1000001 },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // Validate contact
        if (!/^\d{10}$/.test(formData.parentContact)) {
          alert("Parent Contact must be a 10-digit number");
          return;
        }

        nextStep();
      }}
      className="p-6 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-6">Parent Information</h2>

      <InputField
        label="Father's Name *"
        name="fatherName"
        value={formData.fatherName || ""}
        handleChange={handleChange}
        required
      />

      <InputField
        label="Mother's Name *"
        name="motherName"
        value={formData.motherName || ""}
        handleChange={handleChange}
        required
      />

      <InputField
        label="Parent Contact *"
        name="parentContact"
        value={formData.parentContact || ""}
        type="tel"
        placeholder="10-digit number"
        handleChange={handleChange}
        required
      />

      <InputField
        label="Parent Occupation *"
        name="parentOccupation"
        value={formData.parentOccupation || ""}
        handleChange={handleChange}
        required
      />

      {/* Dropdown for Annual Income */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Parent Annual Income</label>
        <select
          name="parentIncome"
          value={formData.parentIncome || ""} // <-- FIX
          onChange={(e) =>
            handleChange({
              target: { name: "parentIncome", value: Number(e.target.value) },
            })
          }
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Select Income (Min ₹2,00,000)</option>
          {incomeOptions.map((inc, index) => (
            <option key={index} value={inc.value}>
              {inc.label}
            </option>
          ))}
        </select>
      </div>

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

export default ParentInfoForm;




