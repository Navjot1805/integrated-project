import React from "react";
import { NavLink } from "react-router-dom";

function NavLinkItem({ label, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `font-medium transition-colors duration-200 ${
          isActive
            ? "text-green-600 underline"
            : "text-gray-700 hover:text-green-600"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default NavLinkItem;
