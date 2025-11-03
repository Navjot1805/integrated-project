import React from "react";

function ProfileImage({ photo }) {
  const src = photo
    ? `http://localhost:5000/${photo}`
    : "https://i.pinimg.com/originals/d5/51/31/d5513130e30228fc090ed18965d43338.jpg";

  return (
    <img
      src={src}
      alt="Profile"
      className="h-24 w-24 rounded-full border-4 border-white"
    />
  );
}

export default ProfileImage;
