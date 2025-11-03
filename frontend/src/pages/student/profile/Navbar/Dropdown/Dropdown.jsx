import React from "react";
import { useNavigate } from "react-router-dom";

function Dropdown() {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "events") {
      navigate("/Layout/events"); // ✅ Corrected path
    } else if (value === "opportunities") {
      navigate("/Layout/opportunities"); // ✅ Corrected path
    }
  };

  return (
    <select
      onChange={handleChange}
      defaultValue=""
      className="border border-gray-300 rounded-lg px-2 py-1 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="" disabled>
        More
      </option>
      <option value="events">Events</option>
      <option value="opportunities">Opportunities</option>
    </select>
  );
}

export default Dropdown;
