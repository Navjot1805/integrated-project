import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 👇 This line both defines and exports the component
export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all saved data (login info, notices, etc.)
    localStorage.clear();

    // Redirect to faculty login page after logout
    navigate("/MainContent ");
  }, [navigate]);

  // Nothing to show on screen
  return null;
}
