// import { motion } from "framer-motion";
// import {
//   FaCalendarAlt,
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaBell,
//   FaInfoCircle,
// } from "react-icons/fa";

// const NoticeBoard = () => {
//   // Reusable "NEW" badge
//   const NewBadge = () => (
//     <motion.span
//       className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md ml-2"
//       style={{
//         background:
//           "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)",
//         backgroundSize: "400% 400%",
//       }}
//       animate={{
//         backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//         opacity: [1, 0.5, 1],
//       }}
//       transition={{
//         duration: 3,
//         repeat: Infinity,
//         ease: "linear",
//       }}
//     >
//       NEW
//     </motion.span>
//   );

//   return (
//     <div className="bg-gradient-to-br from-green-50 to-white shadow-lg rounded-2xl p-6 flex flex-col min-h-[420px] border-l-4 border-green-600">
//       {/* Heading */}
//       <h2 className="font-bold text-xl mb-4 text-green-800 flex items-center gap-2">
//         📌 Scholarship Notice Board
//       </h2>

//       <ul className="space-y-4">
//         {/* Item 1 - NEW */}
//         <li className="flex items-start gap-3">
//           <FaExclamationCircle className="text-red-500 text-lg mt-1" />
//           <div>
//             <NewBadge />
//             <p className="text-gray-800 text-base mt-1">
//               Last date for <b>Scholarship Form Submission</b>:{" "}
//               <span className="font-semibold text-red-600">April 20</span>
//             </p>
//           </div>
//         </li>

//         {/* Item 2 */}
//         <li className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
//           <FaCheckCircle className="text-green-600 text-lg mt-1" />
//           <p className="text-gray-700 text-base">
//             Income & Category Certificate Verification starts: <b>April 25</b>
//           </p>
//         </li>

//         {/* Item 3 */}
//         <li className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
//           <FaCalendarAlt className="text-blue-500 text-lg mt-1" />
//           <p className="text-gray-700 text-base">
//             CGPA sync from university portal: <b>April 28</b>
//           </p>
//         </li>

//         {/* Item 4 */}
//         <li className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
//           <FaCheckCircle className="text-green-600 text-lg mt-1" />
//           <p className="text-gray-700 text-base">
//             Faculty verification window: <b>May 1 – May 15</b>
//           </p>
//         </li>

//         {/* Item 5 */}
//         <li className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
//           <FaExclamationCircle className="text-yellow-500 text-lg mt-1" />
//           <p className="text-gray-700 text-base">
//             Final merit list announcement: <b>May 25</b>
//           </p>
//         </li>

//         {/* Item 6 */}
//         <li className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
//           <FaCheckCircle className="text-green-600 text-lg mt-1" />
//           <p className="text-gray-700 text-base">
//             Disbursement of scholarships begins:{" "}
//             <b className="text-green-700">June 1</b>
//           </p>
//         </li>

//         {/* 🔔 Item 7 - NEW */}
//         <li className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
//           <FaBell className="text-purple-500 text-lg mt-1" />
//           <p className="text-gray-700 text-base">
//             Orientation for scholarship recipients:{" "}
//             <b className="text-purple-700">June 10</b>
//             <NewBadge />
//           </p>
//         </li>

//         {/* ℹ️ Item 8 - NEW */}
//         <li className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
//           <FaInfoCircle className="text-indigo-600 text-lg mt-1" />
//           <p className="text-gray-700 text-base">
//             Guidelines for document upload updated on:{" "}
//             <b>June 15</b>
//             <NewBadge />
//           </p>
//         </li>

//         {/* 📅 Item 9 - NEW */}
//         <li className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition">
//           <FaCalendarAlt className="text-pink-500 text-lg mt-1" />
//           <p className="text-gray-700 text-base">
//             Next round of applications opens:{" "}
//             <b className="text-pink-600">July 1</b>
//             <NewBadge />
//           </p>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default NoticeBoard;




// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaCalendarAlt,
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaBell,
//   FaInfoCircle,
// } from "react-icons/fa";

// const NoticeBoard = () => {
//   const [announcements, setAnnouncements] = useState([]);

//   // Load announcements from localStorage
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("announcements")) || [];
//     setAnnouncements(stored);
//   }, []);

//   // Reusable "NEW" badge
//   const NewBadge = () => (
//     <motion.span
//       className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md ml-2"
//       style={{
//         background:
//           "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)",
//         backgroundSize: "400% 400%",
//       }}
//       animate={{
//         backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//         opacity: [1, 0.5, 1],
//       }}
//       transition={{
//         duration: 3,
//         repeat: Infinity,
//         ease: "linear",
//       }}
//     >
//       NEW
//     </motion.span>
//   );

//   return (
//     <div className="bg-gradient-to-br from-green-50 to-white shadow-lg rounded-2xl p-6 flex flex-col min-h-[420px] border-l-4 border-green-600">
//       {/* Heading */}
//       <h2 className="font-bold text-xl mb-4 text-green-800 flex items-center gap-2">
//         📌 Scholarship Notice Board
//       </h2>

//       {announcements.length > 0 ? (
//         <ul className="space-y-4">
//           {announcements.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-start gap-3 hover:bg-green-50 p-2 rounded-lg transition"
//             >
//               {/* Pick an icon based on index (just for variety) */}
//               {index % 4 === 0 && (
//                 <FaExclamationCircle className="text-red-500 text-lg mt-1" />
//               )}
//               {index % 4 === 1 && (
//                 <FaCheckCircle className="text-green-600 text-lg mt-1" />
//               )}
//               {index % 4 === 2 && (
//                 <FaCalendarAlt className="text-blue-500 text-lg mt-1" />
//               )}
//               {index % 4 === 3 && (
//                 <FaInfoCircle className="text-indigo-600 text-lg mt-1" />
//               )}

//               <div>
//                 <p className="text-gray-800 text-base">{item.text}</p>
//                 <p className="text-xs text-gray-500">{item.date}</p>
//                 <NewBadge />
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500 italic">
//           No announcements available right now.
//         </p>
//       )}
//     </div>
//   );
// };

// export default NoticeBoard;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaCalendarAlt,
//   FaCheckCircle,
//   FaExclamationCircle,
//   FaInfoCircle,
// } from "react-icons/fa";

// const NoticeBoard = () => {
//   const [announcements, setAnnouncements] = useState([]);

//   // ✅ Permanent default notices
//   const permanentNotices = [
//     {
//       text: "Scholarship applications for 2025 are open. Submit before 30th September.",
//       date: "Permanent Notice",
//       type: "info",
//     },
//     {
//       text: "Contact scholarship cell at scholarship@gndec.ac.in for queries.",
//       date: "Permanent Notice",
//       type: "contact",
//     },
//   ];

//   // Load announcements from localStorage
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("announcements")) || [];
//     setAnnouncements([...permanentNotices, ...stored]);
//   }, []);

//   // Reusable "NEW" badge
//   const NewBadge = () => (
//     <motion.span
//       className="inline-block px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white shadow-md ml-2"
//       style={{
//         background:
//           "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)",
//         backgroundSize: "400% 400%",
//       }}
//       animate={{
//         backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//         opacity: [1, 0.5, 1],
//       }}
//       transition={{
//         duration: 3,
//         repeat: Infinity,
//         ease: "linear",
//       }}
//     >
//       NEW
//     </motion.span>
//   );

//   // Pick an icon based on type
//   const getIcon = (type, index) => {
//     if (type === "info")
//       return <FaInfoCircle className="text-indigo-600 text-sm mt-1" />;
//     if (type === "contact")
//       return <FaCheckCircle className="text-green-600 text-sm mt-1" />;
//     if (index % 4 === 0)
//       return <FaExclamationCircle className="text-red-500 text-sm mt-1" />;
//     if (index % 4 === 1)
//       return <FaCheckCircle className="text-green-600 text-sm mt-1" />;
//     if (index % 4 === 2)
//       return <FaCalendarAlt className="text-blue-500 text-sm mt-1" />;
//     return <FaInfoCircle className="text-indigo-600 text-sm mt-1" />;
//   };

//   return (
//     <div className="bg-gradient-to-br from-green-50 to-white shadow-lg rounded-2xl p-4 flex flex-col min-h-[360px] border-l-4 border-green-600">
//       {/* Heading */}
//       <h2 className="font-bold text-lg mb-3 text-green-800 flex items-center gap-2">
//         📌 Scholarship Notice Board
//       </h2>

//       {announcements.length > 0 ? (
//         <ul className="space-y-3">
//           {announcements.map((item, index) => (
//             <li
//               key={index}
//               className="flex items-start gap-2 hover:bg-green-50 p-2 rounded-lg transition"
//             >
//               {/* Icon */}
//               {getIcon(item.type, index)}

//               <div>
//                 <p className="text-gray-800 text-sm">{item.text}</p>
//                 <p className="text-[11px] text-gray-500">{item.date}</p>
//                 {/* Show NEW badge only for dynamic announcements */}
//                 {!item.type && <NewBadge />}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500 italic text-sm">
//           No announcements available right now.
//         </p>
//       )}
//     </div>
//   );
// };

// export default NoticeBoard;




import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("public_notices")) || [];
    const valid = stored.filter(
      (n) => new Date(n.expiryDate) > new Date()
    );
    setNotices(valid);
    localStorage.setItem("public_notices", JSON.stringify(valid));
  }, []);

  const isNewNotice = (datePosted) => {
    const postedDate = new Date(datePosted);
    const diffDays = (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const NewBadge = () => (
    <motion.span
      className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white ml-2 shadow-sm"
      style={{
        background:
          "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)",
        backgroundSize: "400% 400%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      NEW
    </motion.span>
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">📢 Latest Notices</h2>

      {notices.length === 0 ? (
        <p className="text-gray-500 italic">No current notices available.</p>
      ) : (
        <ul className="space-y-4">
          {notices.map((n) => (
            <li
              key={n.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 transition"
            >
              <h3 className="font-semibold text-gray-800 flex items-center">
                {n.title}
                {isNewNotice(n.datePosted) && <NewBadge />}
              </h3>
              <p className="text-gray-600">{n.message}</p>
              <p className="text-sm text-gray-400">
                📅 Posted on: {new Date(n.datePosted).toLocaleDateString()}
              </p>

              {n.file && (
                <a
                  href={n.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm mt-1 inline-block"
                >
                  📎 View Attachment
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
