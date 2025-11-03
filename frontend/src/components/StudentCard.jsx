import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/admin/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <p>Loading student details...</p>;
  if (!student) return <p>Student not found</p>;

  // helper for document lists
  const renderDocs = (docs, label) => {
    if (!docs || docs.length === 0) return null;
    return (
      <div className="mb-4">
        <h4 className="font-semibold mb-2">{label}:</h4>
        {docs.map((file, idx) => (
          <div key={idx}>
            <a
              href={`http://localhost:5000/${file.replace("\\", "/")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {label} {idx + 1}
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Students
      </Link>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {student.fullName}'s Details
      </h2>

      <div className="space-y-3">
        <p><strong>Application ID:</strong> {student.applicationNumber}</p>
        <p><strong>Roll No:</strong> {student.rollNo}</p>
        <p><strong>Branch:</strong> {student.branch}</p>
        <p><strong>Session:</strong> {student.session}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Date of Birth:</strong> {student.dob}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>Father’s Name:</strong> {student.fatherName}</p>
        <p><strong>Mother’s Name:</strong> {student.motherName}</p>
        <p><strong>10th Percentage:</strong> {student.tenthPercent}</p>
        <p><strong>12th Percentage:</strong> {student.twelfthPercent}</p>
        <p><strong>CGPA:</strong> {student.cgpa}</p>
      </div>

      <hr className="my-6" />

      <div>
        <h3 className="text-xl font-semibold mb-3">Uploaded Documents</h3>
        {renderDocs(student.aadharCard, "Aadhar Card")}
        {renderDocs(student.marksheet10, "10th Marksheet")}
        {renderDocs(student.marksheet12, "12th Marksheet")}
        {renderDocs(student.semesterMarksheets, "Semester Marksheets")}
        {renderDocs(student.resume, "Resume")}
        {renderDocs(student.photo, "Profile Photo")}
      </div>
    </div>
  );
}
