


// import React from "react";
// import NavLinkItem from "./NavLinkItem";

// function NavLinks() {
//   const links = [
//    { label: "Home", path: "/" },
//     { label: "Info", path: "/info" },
//     // { label: "Vision & Mission", path: "/vision-mission" },
//     { label: "Help", path: "/help" },
//   ];

//   return (
//     <div className="flex gap-6">
//       {links.map((link) => (
//         <NavLinkItem key={link.label} label={link.label} path={link.path} />
//       ))}
//     </div>
//   );
// }

// export default NavLinks;



import React from "react";
import NavLinkItem from "./NavLinkItem";
import Home from "./Home";
// import Info from "./Info";
import Help from "./Help";

function NavLinks() {
  const links = [
    { label: "Home", path: "/" },
    // { label: "Info", path: "/info" },
    // { label: "Help", path: "/help" },
    { label: "Help", path: "/Layout/help" },

  ];

  return (
    <div className="flex gap-6">
      {links.map((link) => (
        <NavLinkItem key={link.label} label={link.label} path={link.path} />
      ))}
    </div>
  );
}

// Re-export all components for easy import elsewhere
export { Home,  Help, NavLinkItem };
export default NavLinks;
