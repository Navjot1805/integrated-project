import React from "react";

function ProgressBar({ step }) {
   const steps = ["Student", "Parent", "Certificates"];

  return (
    <div className="flex justify-between mb-6">
      {steps.map((label, index) => (
        <div key={index} className="flex-1 text-center">
          <div className={`w-8 h-8 mx-auto rounded-full ${step > index ? "bg-blue-600 text-white" : "bg-gray-300"}`}>
            {index + 1}
          </div>
          <p className="text-sm mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
