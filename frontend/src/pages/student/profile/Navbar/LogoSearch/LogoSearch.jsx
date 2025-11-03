import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

function LogoSearch() {
  return (
    <div className="flex items-center gap-4">
      <Logo />
      <SearchBar />
    </div>
  );
}

export default LogoSearch;
