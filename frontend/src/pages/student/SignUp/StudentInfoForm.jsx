




// import React, { useState } from "react";
// import InputField from "./InputField";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function StudentInfoForm({ formData, handleChange, nextStep }) {
//   const [verified, setVerified] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const verifyStudent = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("http://localhost:5000/api/verify-student", {
//         rollNo: formData.rollNo,
//         password: formData.password,
//       });

//       if (res.data.success) {
//         setVerified(true);
//         const student = res.data.student;

//         const fieldsToFill = {
//           fullName: student.fullName || "",
//           rollNo: student.rollNo || "",
//           email: student.email || "",
//           phone: student.phone || "",
//           dateofbirth: student.dateofbirth
//             ? new Date(student.dateofbirth).toISOString().split("T")[0]
//             : "",
//           gender: student.gender || "",
//           category: student.category || "",
//           course: student.course || "",
//           branch: student.branch || "",
//           // year: student.year || "",
//           session: student.session || "",
//           // sessionEnd: student.sessionEnd || "",

//           address: student.address || "",
//           applicationNumber: student.applicationNumber|| "",
//           // otr: student.applicationNumber || "",
//         };

//         Object.entries(fieldsToFill).forEach(([key, value]) => {
//           handleChange({ target: { name: key, value } });
//         });
//       } else {
//         setError("Invalid credentials");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       autoComplete="off"
//       onSubmit={(e) => {
//         e.preventDefault();
//         if (verified) nextStep();
//         else verifyStudent(e);
//       }}
//       className="relative p-6 border rounded-lg shadow-md bg-white"
//     >
//       <h2 className="text-xl font-bold mb-4 text-blue-700">
//         Student Information
//       </h2>

//       <InputField
//         label="Roll No. (College Username) *"
//         name="rollNo"
//         placeholder="e.g., 21CSE101"
//         value={formData.rollNo}
//         handleChange={handleChange}
//         disabled={verified}
//         required={!verified}
//       />

//       <div className="relative">
//         <InputField
//           label="Password (Provided by College) *"
//           name="password"
//           type={showPassword ? "text" : "password"}
//           placeholder="College password"
//           value={verified ? "********" : formData.password}
//           handleChange={handleChange}
//           readOnly={verified}
//           required={!verified}
//         />
//         <span
//           className="absolute right-3 top-9 cursor-pointer text-gray-600"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <FaEyeSlash /> : <FaEye />}
//         </span>
//       </div>

//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       {verified && (
//         <p className="text-green-600 mb-2">
//           ✅ Verification successful! Your details are auto-filled. Please review
//           & continue.
//         </p>
//       )}

//       {verified && (
//         <>
//           <InputField
//             label="Full Name *"
//             name="fullName"
//             placeholder="Enter your full name"
//             value={formData.fullName}
//             handleChange={handleChange}
//             required
//           />
//           <InputField
//             label="Email *"
//             name="email"
//             type="email"
//             placeholder="example@college.com"
//             value={formData.email}
//             handleChange={handleChange}
//             required
//           />
//           <InputField
//             label="Contact Number *"
//             name="phone"
//             type="tel"
//             placeholder="Enter 10-digit number"
//             value={formData.phone}
//             handleChange={handleChange}
//             required
//           />
//           <InputField
//             label="Date of Birth *"
//             name="dateofbirth"
//             type="date"
//             value={formData.dateofbirth || ""}
//             handleChange={handleChange}
//             required
//           />
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Gender *
//             </label>
//             <select
//               name="gender"
//               value={formData.gender || ""}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-md p-2"
//             >
//               <option value="" disabled>Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div className="mb-4">
//   <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
//     Category *
//   </label>
//   <select
//     id="category"
//     name="category"
//     value={formData.category}
//     onChange={handleChange}
//     required
//     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//   >
//     <option value="">-- Select Category --</option>
//     <option value="SC">SC</option>
//     <option value="ST">ST</option>
//     <option value="OBC">OBC</option>
//   </select>
// </div>
// <div className="mb-4">
//   <label htmlFor="course" className="block text-gray-700 font-semibold mb-2">
//     Course *
//   </label>
//   <select
//     id="course"
//     name="course"
//     value={formData.course}
//     onChange={handleChange}
//     required
//     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//   >
//     <option value="">-- Select Course --</option>
//     <option value="B.Tech">B.Tech</option>
//     <option value="M.Tech">M.Tech</option>
//     <option value="MBA">MBA</option>
//     <option value="MCA">MCA</option>
//   </select>
// </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">
//               Department <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="branch"
//               value={formData.branch}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             >
//               <option value="">Select Branch</option>
//               <option value="CSE">Computer Science & Engineering (CSE)</option>
//               <option value="ECE">Electronics & Communication Engineering (ECE)</option>
//               <option value="ME">Mechanical Engineering (ME)</option>
//               <option value="CE">Civil Engineering (CE)</option>
//               <option value="EE">Electrical Engineering (EE)</option>
//               <option value="IT">Information Technology (IT)</option>
//               <option value="IT">Master Of Business and Administration (MBA)</option>
//               <option value="IT">Master Of Computer Application (MCA)</option>
//             </select>
//           </div>
//           {/* <InputField
//             label="Academic Year(current) *"
//             name="year"
//             type="number"
//             placeholder="e.g., 2"
//             value={formData.year}
//             handleChange={handleChange}
//             min="1"
//             max="4"
//             required
//           /> */}
//           {/* <InputField */}
//           {/* //   label="Session *"
//           //   name="session"
//           //   type="number"
//           //   placeholder="e.g., 2022-2026"
//           //   value={formData.session}
//           //   handleChange={handleChange}
//           //   required
//           //  */}

//           {/* <InputField */}
// {/* //   label="Session*"
// //   name="sessionStart"
// //   // name="session"
// //   type="number"
// //   placeholder="e.g., 2022-2026"
// //   value={formData.sessionStart}
// //   //   value={formData.session}
// //   handleChange={handleChange}
// //   required
// // /> */}

// <div className="mb-4">
//   <label
//     htmlFor="session"
//     className="block text-gray-700 font-semibold mb-2"
//   >
//     Session *
//   </label>

//   <input
//     type="text"
//     id="session"
//     name="session"
//     placeholder="e.g., 2022-2026"
//     value={formData.session}
//     onChange={handleChange}
//     required
//     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//   />
// </div>


// {/* <InputField
//   label="Session End *"
//   name="sessionEnd"
//   type="number"
//   placeholder="e.g., 2026"
//   value={formData.sessionEnd}
//   handleChange={handleChange}
//   required
// /> */}

//           <InputField
//             label="Full Address *"
//             name="address"
//             placeholder="Enter your full address"
//             value={formData.address}
//             handleChange={handleChange}
//             required
//           />
//           <InputField
//             label="Scholarship Application Number*"
//             name="applicationNumber"
//             //  name="applicationNumber"
//             type="number"
//             placeholder="Enter your Scholarship Application Number"
//             value={formData.applicationNumber}
//             // value={formData.applicationNumber}
//             handleChange={handleChange}
//             required
//           />
//         </>
//       )}

//       <div className="flex justify-end mt-6">
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
//         >
//           {verified ? "Next →" : loading ? "Verifying..." : "Verify"}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default StudentInfoForm;



// src/components/StudentInfoForm.jsx
import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function StudentInfoForm({ formData, handleChange, nextStep, verifyStudent, verified }) {
  const [showPassword, setShowPassword] = useState(false);

  // 🧠 Debug log
  useEffect(() => {
    console.log("🎯 formData received in StudentInfoForm:", formData);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verified) nextStep();
    else verifyStudent();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative p-6 border rounded-lg shadow-md bg-white"
      autoComplete="off"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        Student Information
      </h2>

      {/* Roll Number */}
      <InputField
        label="Roll No. (College Username) *"
        name="rollNo"
        placeholder="e.g., 21CSE101"
        value={formData.rollNo}
        handleChange={handleChange}
        disabled={verified}
        required
      />

      {/* Password */}
      <div className="relative">
        <InputField
          label="Password (Provided by College) *"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="College password"
          value={formData.password}
          handleChange={handleChange}
          readOnly={verified}
          required
        />
        <span
          className="absolute right-3 top-9 cursor-pointer text-gray-600"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {verified && (
        <>
          <p className="text-green-600 mb-4">
            ✅ Verified! Your data has been auto-filled.
          </p>

          <InputField
            label="Full Name *"
            name="fullName"
            value={formData.fullName}
            handleChange={handleChange}
            required
          />

          <InputField
            label="Email *"
            name="email"
            type="email"
            value={formData.email}
            handleChange={handleChange}
            required
          />

          <InputField
            label="Contact Number *"
            name="phone"
            type="tel"
            value={formData.phone}
            handleChange={handleChange}
            required
          />

          <InputField
            label="Date of Birth *"
            name="dateofbirth"
            type="date"
            value={formData.dateofbirth}
            handleChange={handleChange}
            required
          />

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">-- Select Category --</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Course */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course *
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">-- Select Course --</option>
              <option value="B.Tech">B.Tech</option>
              <option value="M.Tech">M.Tech</option>
              <option value="MBA">MBA</option>
              <option value="MCA">MCA</option>
            </select>
          </div>

          {/* Department */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department *
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
              <option value="EE">EE</option>
              <option value="IT">IT</option>
            </select>
          </div>

          {/* Session */}
          <InputField
            label="Session *"
            name="session"
            placeholder="e.g., 2022-2026"
            value={formData.session}
            handleChange={handleChange}
            required
          />

          {/* Address */}
          <InputField
            label="Address *"
            name="address"
            placeholder="Enter your full address"
            value={formData.address}
            handleChange={handleChange}
            required
          />

          {/* Application Number */}
          <InputField
            label="Scholarship Application Number *"
            name="applicationNumber"
            type="text"
            value={formData.applicationNumber}
            handleChange={handleChange}
            required
          />
        </>
      )}

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          {verified ? "Next →" : "Verify"}
        </button>
      </div>
    </form>
  );
}

export default StudentInfoForm;
