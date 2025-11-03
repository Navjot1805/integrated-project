

// // src/components/admin/Announcements.jsx
// import React, { useState, useEffect } from "react";

// const Announcements = () => {
//   const [announcements, setAnnouncements] = useState([]);
//   const [newAnnouncement, setNewAnnouncement] = useState("");

//   // ✅ Default announcements (can be deleted by admin)
//   const defaultAnnouncements = [
//     {
//       text: "Scholarship applications for 2025 are open. Submit before 30th September.",
//       date: new Date().toLocaleString(),
//     },
//     {
//       text: "Contact scholarship cell at scholarship@gndec.ac.in for queries.",
//       date: new Date().toLocaleString(),
//     },
//     {
//       text: "New scholarship for women in STEM announced. Apply by August 10, 2025.",
//       date: new Date().toLocaleString(),
//     },
//     {
//       text: "Scholarship orientation webinar will be held on July 15, 2025. Register online.",
//       date: new Date().toLocaleString(),
//     },
//   ];

//   // Load announcements from localStorage
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("announcements"));
//     if (stored && stored.length > 0) {
//       setAnnouncements(stored);
//     } else {
//       // Initialize with default announcements if nothing stored
//       setAnnouncements(defaultAnnouncements);
//       localStorage.setItem("announcements", JSON.stringify(defaultAnnouncements));
//     }
//   }, []);

//   // Save announcements to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("announcements", JSON.stringify(announcements));
//   }, [announcements]);

//   // Add a new announcement
//   const handleAdd = () => {
//     if (newAnnouncement.trim() === "") return;

//     const updated = [
//       { text: newAnnouncement, date: new Date().toLocaleString() },
//       ...announcements,
//     ];
//     setAnnouncements(updated);
//     setNewAnnouncement("");
//   };

//   // Delete an announcement
//   const handleDelete = (index) => {
//     const updated = announcements.filter((_, i) => i !== index);
//     setAnnouncements(updated);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold text-gray-700 mb-4">
//         📢 Manage Announcements
//       </h2>

//       {/* Admin input */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           value={newAnnouncement}
//           onChange={(e) => setNewAnnouncement(e.target.value)}
//           placeholder="Enter new announcement..."
//           className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={handleAdd}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           Add
//         </button>
//       </div>

//       {/* List of announcements */}
//       {announcements.length > 0 ? (
//         <ul className="space-y-2">
//           {announcements.map((item, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center bg-gray-50 border p-2 rounded-md"
//             >
//               <div>
//                 <p className="text-gray-800">{item.text}</p>
//                 <p className="text-xs text-gray-500">{item.date}</p>
//               </div>
//               <button
//                 onClick={() => handleDelete(index)}
//                 className="text-red-500 hover:text-red-700 text-sm"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500 italic">No announcements yet.</p>
//       )}
//     </div>
//   );
// };

// export default Announcements;


