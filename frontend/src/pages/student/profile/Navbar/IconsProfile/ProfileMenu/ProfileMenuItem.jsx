import React from "react";

function ProfileMenuItem({ label, onClick, danger = false }) {
  return (
    <li
      className={`py-2 px-3 cursor-pointer hover:bg-gray-100 ${
        danger ? "text-red-600 hover:bg-red-100" : "text-gray-700"
      }`}
      onClick={onClick}
    >
      {label}
    </li>
  );
}

export default ProfileMenuItem;
