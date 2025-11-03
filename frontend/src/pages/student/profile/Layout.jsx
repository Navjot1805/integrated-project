



// import React from "react";
// import Navbar from "./Navbar/Navbar.jsx";
// // import Sidebar from "./Sidebar/Sidebar.jsx";
// // import ProfileContent from "./ProfileContent";

// function Layout() {
//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <Navbar />
//       <div className="flex flex-1">
//         {/* <Sidebar /> */}
//         {/* <ProfileContent /> */}
//       </div>
//     </div>
//   );
// }

// export default Layout;



import React from "react";
import { Outlet } from "react-router-dom";   // <-- Import Outlet
import Navbar from "./Navbar/Navbar.jsx";
// import Sidebar from "./Sidebar/Sidebar.jsx";
// import ProfileContent from "./ProfileContent";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <div className="flex-1 p-4">
          {/* 🔥 This is where nested pages like Opportunities & Events will load */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
