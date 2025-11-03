// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ all in one import
// import { getAllStudents } from "../../api/studentApi";

// export default function AdminForm() {
//   const location = useLocation();
//   const navigate = useNavigate(); // ✅ must be inside component

//   const [branch, setBranch] = useState("");
//   const [session, setSession] = useState("");
//   const [all, setAll] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     handleSubmitWithFilters(branch, session);
//   };

//   const handleSubmitWithFilters = async (branchValue, sessionValue) => {
//     setLoading(true);
//     try {
//       const data = await getAllStudents({ branch: branchValue, session: sessionValue });
//       setStudents(data.students || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch students. Check backend logs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load filters if coming back from StudentDetails
//   useEffect(() => {
//     if (location.state?.filters) {
//       const { branch: prevBranch, session: prevSession } = location.state.filters;
//       setBranch(prevBranch || "");
//       setSession(prevSession || "");
//       handleSubmitWithFilters(prevBranch, prevSession);
//     }
//   }, [location.state]);

//   return (
//     <div className="min-h-screen bg-gray-50 m-0 p-0">
//       {/* ✅ Navbar */}
//       <nav className="bg-blue-700 text-white px-6 py-0.5 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50">
//         <div className="flex items-center gap-6"></div>

//         {/* ✅ Admin Dropdown */}
//         <div className="relative">
//           <button
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="bg-white text-blue-700 font-semibold px-3 py-1 rounded-full hover:bg-gray-100 transition"
//           >
//             Admin
//           </button>

//           {showDropdown && (
//             <div className="absolute right-0 mt-1 w-44 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200">
//               <Link
//                 to="/post-notification"
//                 className="block px-4 py-2 hover:bg-gray-100"
//                 onClick={() => setShowDropdown(false)}
//               >
//                 📢 Post Notification
//               </Link>

//               <button
//                 onClick={() => {
//                   setShowDropdown(false);
//                   navigate("/logout"); // ✅ logout redirection
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* ✅ Main Content */}
//       <div className="p-6 pt-16">
//         <h2 className="text-2xl font-semibold mb-4">Student List</h2>

//         <form
//           onSubmit={handleSubmit}
//           className="mb-6 flex flex-wrap gap-4 items-center"
//         >
//           <select
//             value={branch}
//             onChange={(e) => setBranch(e.target.value)}
//             disabled={all}
//             className="border px-3 py-2 rounded"
//           >
//             <option value="">Select Branch</option>
//             <option value="CSE">CSE</option>
//             <option value="IT">IT</option>
//             <option value="ECE">ECE</option>
//             <option value="CIVIL">CIVIL</option>
//             <option value="MECH">MECH</option>
//           </select>

//           <select
//             value={session}
//             onChange={(e) => setSession(e.target.value)}
//             disabled={all}
//             className="border px-3 py-2 rounded"
//           >
//             <option value="">Select Session</option>
//             <option value="2021-2025">2021-2025</option>
//             <option value="2022-2026">2022-2026</option>
//             <option value="2023-2027">2023-2027</option>
//           </select>

//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={all}
//               onChange={(e) => setAll(e.target.checked)}
//             />
//             Show All Students
//           </label>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Fetch Students"}
//           </button>
//         </form>

//         {loading ? (
//           <p>Loading students...</p>
//         ) : students.length === 0 ? (
//           <p>No students to display</p>
//         ) : (
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-4 py-2">Full Name</th>
//                 <th className="border px-4 py-2">Branch</th>
//                 <th className="border px-4 py-2">Session</th>
//                 <th className="border px-4 py-2">Roll No</th>
//                 <th className="border px-4 py-2">Email</th>
//                 <th className="border px-4 py-2">Phone</th>
//                 <th className="border px-4 py-2">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((s) => (
//                 <tr key={s._id} className="hover:bg-gray-50">
//                   <td className="border px-4 py-2">{s.fullName}</td>
//                   <td className="border px-4 py-2">{s.branch}</td>
//                   <td className="border px-4 py-2">{s.session}</td>
//                   <td className="border px-4 py-2">{s.rollNo}</td>
//                   <td className="border px-4 py-2">{s.email}</td>
//                   <td className="border px-4 py-2">{s.phone}</td>
//                   <td className="border px-4 py-2 text-center">
//                     <Link
//                       to={`/students/${s._id}/details`}
//                       state={{ filters: { branch, session } }}
//                       className="text-blue-600 underline"
//                     >
//                       View Details
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { getAllStudents } from "../../api/studentApi";

// export default function AdminForm() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [branch, setBranch] = useState("");
//   const [session, setSession] = useState("");
//   const [all, setAll] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showForm, setShowForm] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     handleSubmitWithFilters(branch, session);
//   };

//   const handleSubmitWithFilters = async (branchValue, sessionValue) => {
//     setLoading(true);
//     try {
//       const data = await getAllStudents({ branch: branchValue, session: sessionValue });
//       setStudents(data.students || []);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch students. Check backend logs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (location.state?.filters) {
//       const { branch: prevBranch, session: prevSession } = location.state.filters;
//       setBranch(prevBranch || "");
//       setSession(prevSession || "");
//       handleSubmitWithFilters(prevBranch, prevSession);
//     }
//   }, [location.state]);

//   return (
//     <div className="min-h-screen bg-[#faf8f0] flex flex-col items-center py-8 px-4">
//       {/* Navbar */}
//       <nav className="bg-blue-700 text-white px-6 py-2 flex justify-between items-center shadow-md w-full fixed top-0 left-0 z-50">
//         <h1 className="font-semibold text-lg">Admin Dashboard</h1>
//         <div className="relative">
//           <button
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="bg-white text-blue-700 font-semibold px-3 py-1 rounded-full hover:bg-gray-100 transition"
//           >
//             Admin
//           </button>

//           {showDropdown && (
//             <div className="absolute right-0 mt-1 w-44 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200">
//               <Link
//                 to="/post-notification"
//                 className="block px-4 py-2 hover:bg-gray-100"
//                 onClick={() => setShowDropdown(false)}
//               >
//                 📢 Post Notification
//               </Link>
//               <button
//                 onClick={() => {
//                   setShowDropdown(false);
//                   navigate("/logout");
//                 }}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 🚪 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Page Header */}
//       <div className="pt-20 text-center">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-2">📋 View Students</h2>
//         <p className="text-red-600 text-lg font-medium">
//           For viewing student records and details.
//         </p>
//         <button
//           onClick={() => setShowForm(true)}
//           className="mt-2 text-red-700 font-bold text-lg hover:underline"
//         >
//           CLICK HERE
//         </button>
//       </div>

//       {/* Form Section */}
//       {showForm && (
//         <div className="mt-6 w-full max-w-3xl bg-gray-50 border border-gray-200 shadow-md rounded-lg p-6">
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-wrap gap-4 justify-center items-center mb-4"
//           >
//             <div>
//               <label className="block text-gray-700 mb-1">Branch</label>
//               <select
//                 value={branch}
//                 onChange={(e) => setBranch(e.target.value)}
//                 disabled={all}
//                 className="border px-3 py-2 rounded text-gray-700"
//               >
//                 <option value="">Select Branch</option>
//                 <option value="CSE">CSE</option>
//                 <option value="IT">IT</option>
//                 <option value="ECE">ECE</option>
//                 <option value="CIVIL">CIVIL</option>
//                 <option value="MECH">MECH</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-gray-700 mb-1">Session</label>
//               <select
//                 value={session}
//                 onChange={(e) => setSession(e.target.value)}
//                 disabled={all}
//                 className="border px-3 py-2 rounded text-gray-700"
//               >
//                 <option value="">Select Session</option>
//                 <option value="2021-2025">2021-2025</option>
//                 <option value="2022-2026">2022-2026</option>
//                 <option value="2023-2027">2023-2027</option>
//               </select>
//             </div>

//             <label className="flex items-center gap-2 text-gray-700">
//               <input
//                 type="checkbox"
//                 checked={all}
//                 onChange={(e) => setAll(e.target.checked)}
//               />
//               Show All Students
//             </label>

//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-medium"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Submit"}
//             </button>
//           </form>

//           {loading ? (
//             <p className="text-gray-500 text-center mt-4">Loading students...</p>
//           ) : students.length === 0 ? (
//             <p className="text-gray-500 text-center mt-4">No students to display</p>
//           ) : (
//             <div className="overflow-x-auto mt-6">
//               <table className="min-w-full border border-gray-300">
//                 <thead className="bg-gray-100 text-gray-700">
//                   <tr>
//                     <th className="border px-4 py-2">Full Name</th>
//                     <th className="border px-4 py-2">Branch</th>
//                     <th className="border px-4 py-2">Session</th>
//                     <th className="border px-4 py-2">Roll No</th>
//                     <th className="border px-4 py-2">Email</th>
//                     <th className="border px-4 py-2">Phone</th>
//                     <th className="border px-4 py-2">Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((s) => (
//                     <tr key={s._id} className="hover:bg-gray-50 text-gray-700">
//                       <td className="border px-4 py-2">{s.fullName}</td>
//                       <td className="border px-4 py-2">{s.branch}</td>
//                       <td className="border px-4 py-2">{s.session}</td>
//                       <td className="border px-4 py-2">{s.rollNo}</td>
//                       <td className="border px-4 py-2">{s.email}</td>
//                       <td className="border px-4 py-2">{s.phone}</td>
//                       <td className="border px-4 py-2 text-center">
//                         <Link
//                           to={`/students/${s._id}/details`}
//                           state={{ filters: { branch, session } }}
//                           className="text-blue-600 underline"
//                         >
//                           View
//                         </Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//           <p className="text-center text-red-700 font-medium mt-4 cursor-pointer hover:underline">
//             Show All Results
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllStudents } from "../../api/studentApi";
import { FaUserCircle, FaBell } from "react-icons/fa";

export default function AdminForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [branch, setBranch] = useState("");
  const [session, setSession] = useState("");
  const [all, setAll] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSubmitWithFilters(branch, session);
  };

  const handleSubmitWithFilters = async (branchValue, sessionValue) => {
    setLoading(true);
    try {
      const data = await getAllStudents({ branch: branchValue, session: sessionValue });
      setStudents(data.students || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch students. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.filters) {
      const { branch: prevBranch, session: prevSession } = location.state.filters;
      setBranch(prevBranch || "");
      setSession(prevSession || "");
      handleSubmitWithFilters(prevBranch, prevSession);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center">
      {/* Top Header */}
      <header className="w-full bg-gray-50-600 text-gray-500 shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
          {/* Logo & Search */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 rounded-full border border-white"
            />
            
          </div>

          {/* Icons & Dropdown */}
          <div className="flex items-center space-x-6">
            <button className="relative">
              <FaBell size={22} />
              <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>

            {/* Admin Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-white text-green-700 px-3 py-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                <FaUserCircle size={24} />
                <span className="font-semibold">Admin</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200">
                  <Link
                    to="/post-notification"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    📢 Post Notification
                  </Link>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/logout");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <div className="pt-28 text-center">
        <h2 className="text-2xl font-semibold text-blue-400-700 mb-2">📋 View Students</h2>
        <p className="text-blue-400-700 text-lg font-medium">
          For viewing student records and details.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="mt-2 text-blue-400-600 font-bold text-lg hover:underline"
        >
          CLICK HERE
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="mt-8 w-full max-w-6xl bg-white border border-gray-200 shadow-lg rounded-2xl p-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-6 justify-center items-center mb-6"
          >
            <div>
              <label className="block text-gray-700 mb-1">Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                disabled={all}
                className="border px-4 py-2 rounded text-gray-700"
              >
                <option value="">Select Branch</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="CIVIL">CIVIL</option>
                <option value="MECH">MECH</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Session</label>
              <select
                value={session}
                onChange={(e) => setSession(e.target.value)}
                disabled={all}
                className="border px-4 py-2 rounded text-gray-700"
              >
                <option value="">Select Session</option>
                <option value="2021-2025">2021-2025</option>
                <option value="2022-2026">2022-2026</option>
                <option value="2023-2027">2023-2027</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                checked={all}
                onChange={(e) => setAll(e.target.checked)}
              />
              Show All Students
            </label>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>

          {/* Table Section */}
          {loading ? (
            <p className="text-gray-500 text-center mt-6">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">No students to display</p>
          ) : (
            <div className="overflow-x-auto mt-6 rounded-lg shadow-sm border border-gray-200">
              <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="border px-4 py-2">Full Name</th>
                    <th className="border px-4 py-2">Branch</th>
                    <th className="border px-4 py-2">Session</th>
                    <th className="border px-4 py-2">Roll No</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Phone</th>
                    <th className="border px-4 py-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id} className="hover:bg-gray-50 text-gray-700">
                      <td className="border px-4 py-2">{s.fullName}</td>
                      <td className="border px-4 py-2">{s.branch}</td>
                      <td className="border px-4 py-2">{s.session}</td>
                      <td className="border px-4 py-2">{s.rollNo}</td>
                      <td className="border px-4 py-2">{s.email}</td>
                      <td className="border px-4 py-2">{s.phone}</td>
                      <td className="border px-4 py-2 text-center">
                        <Link
                          to={`/students/${s._id}/details`}
                          state={{ filters: { branch, session } }}
                          className="text-green-600 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-center text-green-700 font-medium mt-6 cursor-pointer hover:underline">
            Show All Results
          </p>
        </div>
      )}
    </div>
  );
}
