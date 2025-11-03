// import React, { useState } from "react";

// const ProfileTabs = ({ onTabChange }) => {
//   const tabs = [
//     { name: "Dashboard", key: "dashboard" },
//     { name: "Students", key: "students" },
//     { name: "Faculty", key: "faculty" },
//     { name: "Documents", key: "documents" },
//     { name: "Settings", key: "settings" },
//   ];

//   const [activeTab, setActiveTab] = useState("dashboard");

//   const handleTabClick = (key) => {
//     setActiveTab(key);
//     if (onTabChange) onTabChange(key); // callback to parent to show content
//   };

//   return (
//     <div className="border-b border-gray-300 mb-6">
//       <ul className="flex space-x-4 px-4">
//         {tabs.map((tab) => (
//           <li
//             key={tab.key}
//             className={`cursor-pointer px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200 ${
//               activeTab === tab.key
//                 ? "bg-blue-600 text-white"
//                 : "text-gray-700 hover:bg-gray-200"
//             }`}
//             onClick={() => handleTabClick(tab.key)}
//           >
//             {tab.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProfileTabs;
