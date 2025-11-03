
// MainContent.jsx
import React from "react";
import Header from "../Header.jsx"; // adjust path if needed
import Navbar from "../Navbar.jsx"; // adjust path if needed
import UploadSection from "./UploadSection.jsx";
import CarouselInfo from "./CarouselInfo.jsx";
import NoticeBoard from "./NoticeBoard.jsx";

const MainContent = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload(); // optional: reload to update UI after logout
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Landing Page Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex-grow">
        {/* Welcome Section */}
        <div className="text-center mb-10">
          {/* <h1 className="text-3xl font-bold text-indigo-700">
            Welcome to the Scholarship System
          </h1> */}
          {/* <p className="text-gray-600 mt-2 text-lg">
            Track, upload, and apply for scholarships with ease.
          </p>
          <a
            href="https://scholarships.gov.in/Students"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
          >
            Apply for Scholarship
          </a> */}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UploadSection />
          <CarouselInfo />
          <NoticeBoard />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
