// import React, { useState } from "react";
// import ProfileTabs from "./ProfileTabs";

// // Dummy content components for each tab
// const DashboardContent = () => <div>📊 Admin Dashboard Overview</div>;
// const StudentsContent = () => <div>🎓 Manage Students</div>;
// const FacultyContent = () => <div>👩‍🏫 Manage Faculty</div>;
// const DocumentsContent = () => <div>📁 Manage Documents</div>;
// const SettingsContent = () => <div>⚙️ Admin Settings</div>;

// const ProfileContent = () => {
//   const [activeTab, setActiveTab] = useState("dashboard");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return <DashboardContent />;
//       case "students":
//         return <StudentsContent />;
//       case "faculty":
//         return <FacultyContent />;
//       case "documents":
//         return <DocumentsContent />;
//       case "settings":
//         return <SettingsContent />;
//       default:
//         return <DashboardContent />;
//     }
//   };

//   return (
//     <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-inner">
//       {/* Tabs */}
//       <ProfileTabs onTabChange={(tab) => setActiveTab(tab)} />

//       {/* Content */}
//       <div className="mt-4">{renderContent()}</div>
//     </div>
//   );
// };

// export default ProfileContent;
