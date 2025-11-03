import React from "react";

function EditProfileButton({ onClick }) {
  return (
    <button
      onClick={onClick} // Trigger parent callback when clicked
      className="mt-2 px-4 py-1 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200"
    >
      Edit Profile
    </button>
  );
}

export default EditProfileButton;
