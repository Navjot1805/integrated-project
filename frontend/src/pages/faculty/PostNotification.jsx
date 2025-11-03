// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function PostNotification() {
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [notices, setNotices] = useState([]);
//   const [search, setSearch] = useState("");

//   // ✅ Load notices on mount and auto-remove expired ones
//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("admin_notices")) || [];
//     const valid = stored.filter((n) => new Date(n.expiryDate) > new Date());
//     setNotices(valid);
//     localStorage.setItem("admin_notices", JSON.stringify(valid));
//     localStorage.setItem("public_notices", JSON.stringify(valid));
//   }, []);

//   // ✅ Post new notice
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !message) {
//       alert("Please enter both title and message");
//       return;
//     }

//     let fileData = null;
//     if (file) {
//       fileData = {
//         name: file.name,
//         url: URL.createObjectURL(file),
//       };
//     }

//     const newNotice = {
//       id: Date.now(),
//       title,
//       message,
//       file: fileData,
//       datePosted: new Date().toISOString(),
//       expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // +3 months
//     };

//     const updated = [...notices, newNotice];
//     setNotices(updated);
//     localStorage.setItem("admin_notices", JSON.stringify(updated));
//     localStorage.setItem("public_notices", JSON.stringify(updated));

//     alert("Notice posted successfully!");
//     setTitle("");
//     setMessage("");
//     setFile(null);
//   };

//   // ✅ Delete notice
//   const handleDelete = (id) => {
//     const updated = notices.filter((n) => n.id !== id);
//     setNotices(updated);
//     localStorage.setItem("admin_notices", JSON.stringify(updated));
//     localStorage.setItem("public_notices", JSON.stringify(updated));
//   };

//   // ✅ Check if a notice is NEW (less than 7 days old)
//   const isNewNotice = (datePosted) => {
//     const postedDate = new Date(datePosted);
//     const diffDays = (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24);
//     return diffDays <= 7;
//   };

//   // ✅ Animated NEW badge component
//   const NewBadge = () => (
//     <motion.span
//       className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white ml-2 shadow-sm"
//       style={{
//         background:
//           "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)",
//         backgroundSize: "400% 400%",
//       }}
//       animate={{
//         backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
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

//   // ✅ Filter notices by title
//   const filteredNotices = notices.filter((n) =>
//     n.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 mt-10 rounded-xl sm:p-8">
//       <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-700">
//         📰 Admin Notice Board
//       </h2>

//       {/* Notice Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//         <div>
//           <label className="block text-gray-600 mb-1 font-medium">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter notice title"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600 mb-1 font-medium">Message</label>
//           <textarea
//             rows="4"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Write message..."
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
//           ></textarea>
//         </div>

//         <div>
//           <label className="block text-gray-600 mb-1 font-medium">
//             Attach Document (Optional)
//           </label>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.xls,.xlsx"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Post Notice
//         </button>
//       </form>

//       {/* Search Bar */}
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="🔍 Search notices..."
//         className="w-full mb-4 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400"
//       />

//       {/* Posted Notices */}
//       <h3 className="text-lg font-semibold mb-3 text-gray-700">📋 Posted Notices</h3>
//       {filteredNotices.length === 0 ? (
//         <p className="text-gray-500">No notices found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {filteredNotices.map((n) => (
//             <li
//               key={n.id}
//               className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
//             >
//               <h4 className="font-semibold text-gray-800 flex items-center">
//                 {n.title}
//                 {isNewNotice(n.datePosted) && <NewBadge />}
//               </h4>

//               <p className="text-gray-600">{n.message}</p>

//               <p className="text-gray-400 text-sm">
//                 📅 Posted on: {new Date(n.datePosted).toLocaleDateString()}
//               </p>
//               <p className="text-gray-400 text-sm">
//                 ⏰ Expires on: {new Date(n.expiryDate).toLocaleDateString()}
//               </p>

//               {n.file && (
//                 <a
//                   href={n.file.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline text-sm mt-1 inline-block"
//                 >
//                   📎 {n.file.name}
//                 </a>
//               )}

//               <button
//                 onClick={() => handleDelete(n.id)}
//                 className="block mt-2 text-red-600 hover:text-red-800 text-sm"
//               >
//                 🗑 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function PostNotification() {
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [notices, setNotices] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("admin_notices")) || [];
//     const valid = stored.filter((n) => new Date(n.expiryDate) > new Date());
//     setNotices(valid);
//     localStorage.setItem("admin_notices", JSON.stringify(valid));
//     localStorage.setItem("public_notices", JSON.stringify(valid));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !message) {
//       alert("Please enter both title and message");
//       return;
//     }

//     let fileData = null;
//     if (file) {
//       fileData = { name: file.name, url: URL.createObjectURL(file) };
//     }

//     const newNotice = {
//       id: Date.now(),
//       title,
//       message,
//       file: fileData,
//       datePosted: new Date().toISOString(),
//       expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
//     };

//     const updated = [...notices, newNotice];
//     setNotices(updated);
//     localStorage.setItem("admin_notices", JSON.stringify(updated));
//     localStorage.setItem("public_notices", JSON.stringify(updated));

//     alert("Notice posted successfully!");
//     setTitle("");
//     setMessage("");
//     setFile(null);
//   };

//   const handleDelete = (id) => {
//     const updated = notices.filter((n) => n.id !== id);
//     setNotices(updated);
//     localStorage.setItem("admin_notices", JSON.stringify(updated));
//     localStorage.setItem("public_notices", JSON.stringify(updated));
//   };

//   const isNewNotice = (datePosted) => {
//     const postedDate = new Date(datePosted);
//     const diffDays = (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24);
//     return diffDays <= 7;
//   };

//   const NewBadge = () => (
//     <motion.span
//       className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full text-white ml-2 shadow-sm"
//       style={{
//         background:
//           "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)",
//         backgroundSize: "400% 400%",
//       }}
//       animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
//       transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//     >
//       NEW
//     </motion.span>
//   );

//   const filteredNotices = notices.filter((n) =>
//     n.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="max-w-3xl mx-auto bg-white shadow-xl p-8 mt-10 ">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-700 flex items-center justify-center gap-2">
//           Admin Notice Board
//         </h2>
//         <div className="mt-2 h-1 w-32 mx-auto bg-green-600 rounded-full"></div>
//       </div>

//       {/* Notice Form */}
//       <form onSubmit={handleSubmit} className="space-y-5 mb-8">
//         <div>
//           <label className="block text-gray-600 mb-1 font-medium">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter notice title"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none text-gray-700"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-600 mb-1 font-medium">Message</label>
//           <textarea
//             rows="4"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Write message..."
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none text-gray-700"
//           ></textarea>
//         </div>

//         <div>
//           <label className="block text-gray-600 mb-1 font-medium">
//             Attach Document (Optional)
//           </label>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx,.xls,.xlsx"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-500 focus:outline-none"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow-md"
//         >
//           Post Notice
//         </button>
//       </form>

//       {/* Search */}
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="🔍 Search notices..."
//         className="w-full mb-5 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 text-gray-700"
//       />

//       {/* Notices */}
//       <h3 className="text-xl font-semibold mb-3 text-gray-700 flex items-center gap-2">
//          Posted Notices
//       </h3>

//       {filteredNotices.length === 0 ? (
//         <p className="text-gray-500 italic">No notices found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {filteredNotices.map((n) => (
//             <li
//               key={n.id}
//               className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-green-50 transition-all shadow-sm"
//             >
//               <h4 className="font-semibold text-gray-800 flex items-center">
//                 {n.title}
//                 {isNewNotice(n.datePosted) && <NewBadge />}
//               </h4>

//               <p className="text-gray-600 mt-1">{n.message}</p>

//               <div className="text-sm text-gray-400 mt-2 space-y-0.5">
//                 <p>Posted: {new Date(n.datePosted).toLocaleDateString()}</p>
//                 <p>Expires: {new Date(n.expiryDate).toLocaleDateString()}</p>
//               </div>

//               {n.file && (
//                 <a
//                   href={n.file.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-green-700 underline text-sm mt-2 inline-block"
//                 >
//                   {n.file.name}
//                 </a>
//               )}

//               <button
//                 onClick={() => handleDelete(n.id)}
//                 className="block mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PostNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Load existing notices
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("admin_notices")) || [];
    const valid = stored.filter((n) => new Date(n.expiryDate) > new Date());
    setNotices(valid);
    localStorage.setItem("admin_notices", JSON.stringify(valid));
    localStorage.setItem("public_notices", JSON.stringify(valid));
  }, []);

  // ✅ Handle new post
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !message) {
      alert("Please enter both title and message");
      return;
    }

    let fileData = null;
    if (file) {
      fileData = { name: file.name, url: URL.createObjectURL(file) };
    }

    const newNotice = {
      id: Date.now(),
      title,
      message,
      file: fileData,
      datePosted: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    };

    const updated = [...notices, newNotice];
    setNotices(updated);
    localStorage.setItem("admin_notices", JSON.stringify(updated));
    localStorage.setItem("public_notices", JSON.stringify(updated));

    alert("Notice posted successfully!");
    setTitle("");
    setMessage("");
    setFile(null);
  };

  // ✅ Delete notice
  const handleDelete = (id) => {
    const updated = notices.filter((n) => n.id !== id);
    setNotices(updated);
    localStorage.setItem("admin_notices", JSON.stringify(updated));
    localStorage.setItem("public_notices", JSON.stringify(updated));
  };

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
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      NEW
    </motion.span>
  );

  const filteredNotices = notices.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-xl p-8 mt-10 mb-20 rounded-xl border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-700 flex items-center justify-center gap-2">
          Admin Notice Board
        </h2>
        <div className="mt-2 h-1 w-32 mx-auto bg-green-600 rounded-full"></div>
      </div>

      {/* Notice Form */}
      <form onSubmit={handleSubmit} className="space-y-5 mb-8">
        <div>
          <label className="block text-gray-600 mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 font-medium">Message</label>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write message..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none text-gray-700"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-600 mb-1 font-medium">
            Attach Document (Optional)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition duration-200 font-semibold shadow-md"
        >
          Post Notice
        </button>
      </form>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Search notices..."
        className="w-full mb-5 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 text-gray-700"
      />

      {/* Posted Notices */}
      <h3 className="text-xl font-semibold mb-3 text-gray-700 flex items-center gap-2">
        Posted Notices
      </h3>

      {filteredNotices.length === 0 ? (
        <p className="text-gray-500 italic">No notices found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredNotices.map((n) => (
            <li
              key={n.id}
              className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-green-50 transition-all shadow-sm"
            >
              <h4 className="font-semibold text-gray-800 flex items-center">
                {n.title}
                {isNewNotice(n.datePosted) && <NewBadge />}
              </h4>

              <p className="text-gray-600 mt-1">{n.message}</p>

              <div className="text-sm text-gray-400 mt-2 space-y-0.5">
                <p>Posted: {new Date(n.datePosted).toLocaleDateString()}</p>
                <p>Expires: {new Date(n.expiryDate).toLocaleDateString()}</p>
              </div>

              {n.file && (
                <a
                  href={n.file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline text-sm mt-2 inline-block"
                >
                  {n.file.name}
                </a>
              )}

              <button
                onClick={() => handleDelete(n.id)}
                className="block mt-3 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
