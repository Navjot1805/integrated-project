



import React from "react";
import ProfileHeader from "./ProfileHeader/ProfileHeader.jsx";
import ProfileTabs from "./ProfileTabs/ProfileTabs.jsx";

function ProfileContent() {
  return (
    <div className="flex-1 p-6">
      <ProfileHeader />
      <ProfileTabs />
    </div>
  );
}

export default ProfileContent;

