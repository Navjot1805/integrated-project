import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ added
import StudentCard from "../../components/StudentCard";

import { getAllStudents } from "../../api/studentApi";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const location = useLocation(); // ✅. to detect navigation changes

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getAllStudents();
        setStudents(data.students);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [location.key]); // ✅ refetch when navigating back

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>
      <StudentCard students={students} />
    </div>
  );
};

export default StudentPage;
