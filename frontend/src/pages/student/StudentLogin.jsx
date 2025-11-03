




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";

// const StudentLogin = ({ onLogin }) => {
//   const [formData, setFormData] = useState({ rollNo: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Only allow numbers for rollNo
//     if (name === "rollNo" && value && !/^\d*$/.test(value)) {
//       setError("Roll Number should contain only numbers.");
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const rollNo = formData.rollNo.trim();
//     const password = formData.password.trim();

//     if (!rollNo || !password) {
//       setError("Please enter both Roll Number and Password.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:5000/api/students/login",
//         { rollNo, password },
//         { timeout: 5000 }
//       );

//       // Corrected: backend sends 'student', not 'user'
//       const { token, student, error: backendError } = response.data;

//       if (token && student) {
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(student));

//         if (onLogin) onLogin(token, student);

//         navigate("/Layout");
//       } else {
//         setError(backendError || "Login failed. Check credentials.");
//       }
//     } catch (err) {
//       console.error("❌ Login error:", err);
//       if (err.response) {
//         setError(err.response.data?.error || "Invalid Roll Number or Password.");
//       } else if (err.request) {
//         setError("Server not responding. Check your connection.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
//         {/* Logo */}
//         <div className="flex justify-center mb-4">
//           <img
//             src="/images/logo.png"
//             alt="Logo"
//             className="h-16 w-16 bg-gray-100 rounded-full p-2"
//           />
//         </div>

//         <h2 className="text-2xl font-bold mb-6 text-gray-700">Student Login</h2>

//         {/* Error message */}
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Roll Number */}
//           <div>
//             <label
//               htmlFor="rollNo"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Roll Number
//             </label>
//             <input
//               id="rollNo"
//               type="text"
//               name="rollNo"
//               value={formData.rollNo}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring focus:ring-blue-300 outline-none"
//               placeholder="Enter your Roll Number"
//               required
//             />
//           </div>

//           {/* Password
//           <div className="relative">
//             <label
//               htmlFor="password"
//               className="block text-gray-700 font-medium mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border rounded focus:ring focus:ring-blue-300 outline-none pr-10"
//               placeholder="Enter your password"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div> */}

//           {/* Password */}
// <div className="relative">
//   <label
//     htmlFor="password"
//     className="block text-gray-700 font-medium mb-1"
//   >
//     Password
//   </label>
//   <input
//     id="password"
//     type={showPassword ? "text" : "password"}
//     name="password"
//     value={formData.password}
//     onChange={handleChange}
//     className="w-full p-2 border rounded focus:ring focus:ring-blue-300 outline-none pr-10"
//     placeholder="Enter your password"
//     required
//   />
//   <button
//     type="button"
//     onClick={() => setShowPassword((prev) => !prev)}
//     // className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 hover:text-gray-700"
//      className="absolute right-2 top-1/2-translate-y-1/2 text-gray-500 hover:text-gray-700"
//     aria-label={showPassword ? "Hide password" : "Show password"}
//   >
//     {showPassword ? <FaEyeSlash /> : <FaEye />}
//   </button>
// </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex items-center justify-center gap-2 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             } text-white p-2 rounded font-semibold transition duration-300`}
//           >
//             {loading && (
//               <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
//             )}
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {/* Sign Up link */}
//           <p className="mt-4 text-gray-700">
//             Don&apos;t have an account?{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/signup")}
//               className="text-blue-600 underline"
//             >
//               Sign Up
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";

// const StudentLogin = ({ onLogin }) => {
//   const [formData, setFormData] = useState({ rollNo: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "rollNo" && value && !/^\d*$/.test(value)) {
//       setError("Roll Number should contain only numbers.");
//       return;
//     }

//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const rollNo = formData.rollNo.trim();
//     const password = formData.password.trim();

//     if (!rollNo || !password) {
//       setError("Please enter both Roll Number and Password.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await axios.post(
//         "http://localhost:5000/api/students/login",
//         { rollNo, password },
//         { timeout: 5000 }
//       );

//       const { token, student, error: backendError } = response.data;

//       if (token && student) {
//         // Store token and student data
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(student));

//         if (onLogin) onLogin(token, student);

//         navigate("/Layout");
//       } else {
//         setError(backendError || "Login failed. Check your credentials.");
//       }
//     } catch (err) {
//       console.error("❌ Login error:", err);
//       if (err.response) {
//         setError(err.response.data?.error || "Invalid Roll Number or Password.");
//       } else if (err.request) {
//         setError("Server not responding. Please check your connection.");
//       } else {
//         setError("An unexpected error occurred.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
//         {/* Logo */}
//         <div className="flex justify-center mb-4">
//           <img
//             src="/images/logo.png"
//             alt="GNDEC Logo"
//             className="h-16 w-16 rounded-full p-2 bg-gray-50 border"
//           />
//         </div>

//         <h2 className="text-2xl font-bold mb-6 text-gray-700">Student Login</h2>

//         {/* Error Message */}
//         {error && (
//           <p className="text-red-500 text-sm font-medium bg-red-50 border border-red-200 p-2 rounded mb-4">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Roll Number */}
//           <div>
//             <label
//               htmlFor="rollNo"
//               className="block text-gray-700 font-medium mb-1 text-left"
//             >
//               Roll Number
//             </label>
//             <input
//               id="rollNo"
//               type="text"
//               name="rollNo"
//               value={formData.rollNo}
//               onChange={handleChange}
//               autoComplete="off"
//               placeholder="Enter your Roll Number"
//               required
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label
//               htmlFor="password"
//               className="block text-gray-700 font-medium mb-1 text-left"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               autoComplete="new-password"
//               placeholder="Enter your Password"
//               required
//               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none pr-10 transition-all"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full flex items-center justify-center gap-2 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             } text-white p-2 rounded font-semibold transition duration-300`}
//           >
//             {loading && (
//               <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
//             )}
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {/* Signup Link */}
//           <p className="mt-4 text-gray-700 text-sm">
//             Don&apos;t have an account?{" "}
//             <button
//               type="button"
//               onClick={() => navigate("/signup")}
//               className="text-blue-600 hover:underline font-medium"
//             >
//               Sign Up
//             </button>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StudentLogin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const StudentLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({ rollNo: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rollNo" && value && !/^\d*$/.test(value)) {
      setError("Roll Number should contain only numbers.");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { rollNo, password } = formData;

    if (!rollNo.trim() || !password.trim()) {
      setError("Please enter both Roll Number and Password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post("http://localhost:5000/api/students/login",{ rollNo, password },{ timeout: 7000 });

      const { token, student, message } = response.data;

      if (token && student) {
        // ✅ Save data for future requests
        localStorage.setItem("token", token);
        localStorage.setItem("studentId", student._id); // 👈 needed for uploads
        localStorage.setItem("user", JSON.stringify(student));

        if (onLogin) onLogin(token, student);

        alert("✅ Login successful!");
        navigate("/Layout"); // redirect after login
      } else {
        setError(message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);

      if (err.response) {
        // Backend returned an error response
        setError(err.response.data?.message || "Invalid Roll Number or Password.");
      } else if (err.request) {
        // No response from server
        setError("⚠️ Server not responding. Please check your internet or backend server.");
      } else {
        // Other errors
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/images/logo.png"
            alt="GNDEC Logo"
            className="h-16 w-16 rounded-full p-2 bg-gray-50 border"
          />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-gray-700">Student Login</h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Roll Number */}
          <div>
            <label
              htmlFor="rollNo"
              className="block text-gray-700 font-medium mb-1 text-left"
            >
              Roll Number
            </label>
            <input
              id="rollNo"
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter your Roll Number"
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1 text-left"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Enter your Password"
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 outline-none pr-10 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="mt-4 text-gray-700 text-sm">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;