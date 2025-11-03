



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function ProfileHeader() {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         setLoading(true);

//         // Get token from localStorage if using auth
//         const token = localStorage.getItem("token");

//         // Fetch student data from backend
//         const response = await axios.get("http://localhost:5000/api/students/me", {
//           headers: {
//             Authorization: `Bearer ${token}`, // if using JWT auth
//           },
//         });

//         setStudent(response.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch student data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudent();
//   }, []);

//   if (loading) return <p className="text-center mt-4">Loading profile...</p>;
//   if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
//   if (!student) return null;

//   return (
//     <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
//       <div className="flex items-center gap-6">
//         <img
//           src={student.photo ? `http://localhost:5000/${student.photo}` : "https://i.pinimg.com/originals/d5/51/31/d5513130e30228fc090ed18965d43338.jpg"}
//           alt="Profile"
//           className="h-24 w-24 rounded-full border-4 border-white"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{student.FullName}</h2>
//           <p className="text-gray-200">
//             {student.course} - {student.branch} | Roll No: {student.rollNo}
//           </p>
//           <button className="mt-2 px-4 py-1 bg-white text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200">
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfileHeader;




import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import EditProfileButton from "./EditProfileButton";

function ProfileHeader({ onEditClick }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:5000/api/students/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudent(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading profile...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!student) return null;

  return (
    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
      <div className="flex items-center gap-6">
        <ProfileImage photo={student.photo} />
        <ProfileInfo student={student} />
        <EditProfileButton onClick={onEditClick} />
      </div>
    </div>
  );
}

export default ProfileHeader;
