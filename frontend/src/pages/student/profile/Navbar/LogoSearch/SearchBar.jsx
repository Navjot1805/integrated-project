
import React, { useState } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    console.log("🔍 Searching for:", e.target.value);
    // later: filter scholarships, events, students, etc.
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search..."
      className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
}

export default SearchBar;
