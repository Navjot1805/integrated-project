

import React, { useState, useRef, useEffect } from "react";
import LogoSearch from "./LogoSearch/LogoSearch";
import NavLinks from "./NavLinks/NavLinks";
import Dropdown from "./Dropdown/Dropdown";
import IconsProfile from "./IconsProfile/IconsProfile";

function Navbar() {
  // activeMenu can be: null | "mobile" | "dropdown" | "profile"
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      {/* Left: Logo + Search */}
      <LogoSearch />

      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => toggleMenu("mobile")}
      >
        {activeMenu === "mobile" ? "✖" : "☰"}
      </button>

      {/* Right: Nav + Dropdown + Icons */}
      <div className="hidden md:flex items-center gap-6">
        <NavLinks />
        <Dropdown
          isOpen={activeMenu === "dropdown"}
          onToggle={() => toggleMenu("dropdown")}
        />
        <IconsProfile
          isOpen={activeMenu === "profile"}
          onToggle={() => toggleMenu("profile")}
        />
      </div>

      {/* Mobile Menu */}
      {activeMenu === "mobile" && (
        <div
          ref={menuRef}
          className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden"
        >
          <NavLinks />
          <Dropdown
            isOpen={activeMenu === "dropdown"}
            onToggle={() => toggleMenu("dropdown")}
          />
          <IconsProfile
            isOpen={activeMenu === "profile"}
            onToggle={() => toggleMenu("profile")}
          />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
