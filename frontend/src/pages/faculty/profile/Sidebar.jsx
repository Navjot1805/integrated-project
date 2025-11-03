




// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaUser,
//   FaFileAlt,
//   FaCogs,
//   FaSignOutAlt,
//   FaBullhorn,
// } from "react-icons/fa";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/admin-login");
//   };

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//       isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-200"
//     }`;

//   return (
//     <div
//       className={`h-[calc(100vh-64px)] ${
//         isOpen ? "w-48" : "w-16"
//       } bg-white shadow-lg flex flex-col transition-all duration-300`}
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <div className="flex-1 p-3 space-y-1">
//         <NavLink to="/admin/dashboard" className={linkClass}>
//           <FaTachometerAlt size={16} />
//           {isOpen && <span>Dashboard</span>}
//         </NavLink>

//         <NavLink to="/faculty/announcements" className={linkClass}>
//           <FaBullhorn size={16} />
//           {isOpen && <span>Announcements</span>}
//         </NavLink>

//         <NavLink to="/admin/filter-students" className={linkClass}>
//           <FaUser size={16} />
//           {isOpen && <span>Get Details</span>}
//         </NavLink>

//         <NavLink to="/admin/settings" className={linkClass}>
//           <FaCogs size={16} />
//           {isOpen && <span>Settings</span>}
//         </NavLink>
//       </div>

//       <div className="p-3 border-t">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-100 rounded-md font-semibold transition-colors duration-200"
//         >
//           <FaSignOutAlt size={16} />
//           {isOpen && <span>Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;



// // import React from "react"; import { NavLink, useNavigate } from "react-router-dom"; import Announcements from "./Announcements"; import { FaTachometerAlt, FaUser, FaUsers, FaFileAlt, FaCogs, FaSignOutAlt, FaBullhorn, FaFilter, } from "react-icons/fa"; const Sidebar = () => { const navigate = useNavigate(); const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/admin-login"); }; const linkClass = ({ isActive }) => flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors duration-200 ${ isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-200" }; return ( <div className="h-[calc(100vh-64px)] w-48 bg-white shadow-lg flex flex-col"> <div className="flex-1 p-3 space-y-1"> <NavLink to="/admin/dashboard" className={linkClass}> <FaTachometerAlt size={14} /> Dashboard </NavLink> {/* <NavLink to="/admin/students" className={linkClass}> <FaUser size={14} /> Students </NavLink> */} {/* <NavLink to="/admin/documents" className={linkClass}> <FaFileAlt size={14} /> Documents </NavLink> */} <NavLink to="/admin/announcements" className={linkClass}> <FaBullhorn size={14} /> Announcements </NavLink> <NavLink to="/admin/filter-students" className={linkClass}> Get Details of Students </NavLink> <NavLink to="/admin/settings" className={linkClass}> <FaCogs size={14} /> Settings </NavLink> </div> <div className="p-3 border-t"> <button onClick={handleLogout} className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-100 rounded-md font-semibold transition-colors duration-200" > <FaSignOutAlt size={14} /> Logout </button> </div> </div> ); };


// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaTachometerAlt, FaUser, FaCogs, FaSignOutAlt, FaBullhorn } from "react-icons/fa";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/admin-login");
//   };

//   const linkClass = ({ isActive }) =>
//     `flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors duration-200 ${
//       isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-200"
//     }`;

//   return (
//     <div
//       className={`h-[calc(100vh-64px)] bg-white shadow-lg flex flex-col overflow-hidden 
//                   transition-all duration-300 ${isOpen ? "w-48" : "w-16"}`}
//       onMouseEnter={() => setIsOpen(true)}
//       onMouseLeave={() => setIsOpen(false)}
//     >
//       <div className="flex-1 p-3 space-y-1">
//         <NavLink to="/admin/dashboard" className={linkClass}>
//           <FaTachometerAlt size={20} />
//           <span
//             className={`ml-2 whitespace-nowrap transition-opacity duration-300 ${
//               isOpen ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             Dashboard
//           </span>
//         </NavLink>

//         <NavLink to="/admin/announcements" className={linkClass}>
//           <FaBullhorn size={20} />
//           <span
//             className={`ml-2 whitespace-nowrap transition-opacity duration-300 ${
//               isOpen ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             Announcements
//           </span>
//         </NavLink>

//         <NavLink to="/admin/filter-students" className={linkClass}>
//           <FaUser size={20} />
//           <span
//             className={`ml-2 whitespace-nowrap transition-opacity duration-300 ${
//               isOpen ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             Get Details
//           </span>
//         </NavLink>

//         <NavLink to="/admin/settings" className={linkClass}>
//           <FaCogs size={20} />
//           <span
//             className={`ml-2 whitespace-nowrap transition-opacity duration-300 ${
//               isOpen ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             Settings
//           </span>
//         </NavLink>
//       </div>

//       <div className="p-3 border-t">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 w-full p-2 text-sm text-red-600 hover:bg-red-100 rounded-md font-semibold transition-colors duration-200"
//         >
//           <FaSignOutAlt size={20} />
//           <span
//             className={`ml-2 whitespace-nowrap transition-opacity duration-300 ${
//               isOpen ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             Logout
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
