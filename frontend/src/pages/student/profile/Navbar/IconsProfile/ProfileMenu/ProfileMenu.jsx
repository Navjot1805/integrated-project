


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import ProfileMenuItem from "./ProfileMenuItem";

// function ProfileMenu({ onLogout }) {
//   const navigate = useNavigate();

//   const menuItems = [
//     { label: "My Profile", path: "/profile" },
//     { label: "Edit Profile", path: "/edit-profile" },
//     { label: "Settings", path: "/settings" },
//     { label: "Logout", action: onLogout, danger: true },
//   ];

//   return (
//     <div className="absolute top-12 right-2 w-48 bg-white shadow-lg rounded-lg border p-3 z-50">
//       <ul className="text-sm">
//         {menuItems.map((item, index) => (
//           <ProfileMenuItem
//             key={index}
//             label={item.label}
//             onClick={item.action ? item.action : () => navigate(item.path)}
//             danger={item.danger}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProfileMenu;





import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenuItem from "./ProfileMenuItem";

function ProfileMenu({ onLogout }) {
  const navigate = useNavigate();

  const menuItems = [
    { label: "My Profile", path: "/Layout/profile" },
    { label: "Edit Profile", path: "/Layout/edit-profile" },
    { label: "Upload Documents", path: "/Layout/upload-documents" },
     { label: "Upload Otr", path: "/Layout/upload-ort" },
    { label: "Settings", path: "/Layout/settings" },
    
    { label: "Logout", action: onLogout, danger: true },
  ];

  return (
    <div className="absolute top-12 right-2 w-48 bg-white shadow-lg rounded-lg border p-3 z-50">
      <ul className="text-sm">
        {menuItems.map((item, index) => (
          <ProfileMenuItem
            key={index}
            label={item.label}
            onClick={item.action ? item.action : () => navigate(item.path)}
            danger={item.danger}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProfileMenu;



