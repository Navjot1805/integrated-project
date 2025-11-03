// import React, { useState } from "react";
// import { FaBell, FaUserCircle } from "react-icons/fa";
// import Sidebar from "./Sidebar";

// const Navbar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <header className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
//         {/* Left: Logo */}
//         <div className="flex items-center gap-2">
//           <img
//             src="/images/logo.png"
//             alt="Logo"
//             className="h-10 w-10 rounded-full"
//           />
//           <h1 className="text-lg font-bold text-gray-700">
//             Scholarship Admin
//           </h1>
//         </div>

//         {/* Right: Notifications + Profile */}
//         <div className="flex items-center gap-6">
         

//           {/* Profile Icon (Toggle Sidebar) */}
//           <button
//             onClick={toggleSidebar}
//             className="text-gray-600 hover:text-blue-600 focus:outline-none"
//           >
//             <FaUserCircle size={28} />
//           </button>
//         </div>
//       </header>

//       {/* Sidebar Panel (Below Navbar) */}
//       {isSidebarOpen && (
//         <div className="absolute right-0 top-[64px] z-40">
//           {/* Adjust `top-[64px]` if navbar height changes */}
//           <Sidebar />
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;
