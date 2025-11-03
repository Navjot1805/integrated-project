import React from "react";

function ProfileInfo({ student }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{student.fullName}</h2>
      <p className="text-gray-200">
        {student.course} - {student.branch} | Roll No: {student.rollNo}
      </p>
    </div>
  );
}

export default ProfileInfo;
