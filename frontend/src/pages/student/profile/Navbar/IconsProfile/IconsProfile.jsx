// import React from "react";

// function IconsProfile({ onProfileClick, onNotificationsClick }) {
//   return (
//     <div className="flex items-center gap-4">
//       <span
//         className="cursor-pointer text-gray-700 hover:text-green-600 transition-colors duration-200"
//         onClick={onNotificationsClick}
//       >
//         🔔
//       </span>
//       <img
//         src="https://i.pinimg.com/originals/d5/51/31/d5513130e30228fc090ed18965d43338.jpg"
//         alt="Profile"
//         className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-all duration-200"
//         onClick={onProfileClick}
//       />
//     </div>
//   );
// }

// export default IconsProfile;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import NotificationsDropdown from "./NotificationsDropdown";
// import ProfileMenu from "./ProfileMenu/ProfileMenu";

// function IconsProfile() {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const navigate = useNavigate();

//   // Fetch notifications
//   useEffect(() => {
//     axios
//       .get("/api/notifications")
//       .then((res) => setNotifications(res.data))
//       .catch(() =>
//         setNotifications([
//           { id: 1, text: "Scholarship last date is Sept 30" },
//           { id: 2, text: "New Career Guidance Workshop on Oct 10" },
//         ])
//       );
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="relative flex items-center gap-4">
//       {/* 🔔 Notification Icon */}
//       <span
//         className="cursor-pointer text-gray-700 hover:text-green-600 transition-colors duration-200"
//         onClick={() => setShowNotifications((prev) => !prev)}
//       >
//         🔔
//       </span>

//       {showNotifications && (
//         <NotificationsDropdown notifications={notifications} />
//       )}

//       👤 Profile Image
//       <img
//         src="https://i.pinimg.com/originals/d5/51/31/d5513130e30228fc090ed18965d43338.jpg"
//         alt="Profile"
//         className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-200 hover:border-green-500 transition-all duration-200"
//         onClick={() => setShowProfileMenu((prev) => !prev)}
//       />

//       {showProfileMenu && (
//         <ProfileMenu onLogout={handleLogout} navigate={navigate} />
//       )}
//     </div>
//   );
// }

// export default IconsProfile;




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBell, FaUserCircle } from "react-icons/fa"; // Common universal icons
import NotificationsDropdown from "./NotificationsDropdown";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

function IconsProfile() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("/api/notifications");
        setNotifications(res.data);
      } catch {
        // Fallback notifications if API fails
        setNotifications([
          { id: 1, text: "Scholarship last date is Sept 30" },
          { id: 2, text: "New Career Guidance Workshop on Oct 10" },
        ]);
      }
    };
    fetchNotifications();
  }, []);

  // ✅ Logout and clear session
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="relative flex items-center gap-4">
      {/* 🔔 Notification Icon */}
      <button
        className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-xl relative"
        onClick={() => setShowNotifications((prev) => !prev)}
        aria-label="Notifications"
      >
        <FaBell />
        {/* Optional red dot if notifications exist */}
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Notification Dropdown */}
      {showNotifications && (
        <NotificationsDropdown notifications={notifications} />
      )}

      {/* 👤 Universal Profile / Menu Icon */}
      <button
        className="text-gray-700 hover:text-green-600 transition-colors duration-200 text-2xl"
        onClick={() => setShowProfileMenu((prev) => !prev)}
        aria-label="Profile menu"
      >
        <FaUserCircle />
      </button>

      {/* Profile Menu Dropdown */}
      {showProfileMenu && (
        <ProfileMenu onLogout={handleLogout} navigate={navigate} />
      )}
    </div>
  );
}

export default IconsProfile;
