




import React, { useState } from "react";

function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("about");
  const tabs = ["about", "documents"];

  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`capitalize py-1 px-3 font-medium transition-all duration-200 ${
              activeTab === tab
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-green-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4 text-gray-700">
        {activeTab === "about" && <p>Student details and introduction.</p>}
        {/* {activeTab === "achievements" && <p>Sports, academics & extracurricular achievements.</p>} */}
        {activeTab === "documents" && <p>Uploaded scholarship documents.</p>}
        {/* {activeTab === "settings" && <p>Account preferences & privacy.</p>} */}
      </div>
    </div>
  );
}

export default ProfileTabs;
