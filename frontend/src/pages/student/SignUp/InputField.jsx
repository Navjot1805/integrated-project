import React from "react";

function InputField({ label, name, type = "text", value, handleChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg"
        required
      />
    </div>
  );
}

export default InputField;
