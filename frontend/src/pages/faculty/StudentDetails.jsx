import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getStudentById } from "../../api/studentApi";
import axios from "axios";

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMessageCard, setShowMessageCard] = useState(false);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [sending, setSending] = useState(false);

  const preBuiltMessages = [
    "Submit your documents",
    "Upload your 10th marksheet",
    "Upload your 12th marksheet",
    "Complete your profile",
  ];

  // ✅ Fetch student details + messages
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data.student || data);

        // Fetch messages for this student
        const res = await axios.get(`http://localhost:5000/api/faculty/messages/${id}`);
        setMessagesList(res.data.messages || []);
      } catch (err) {
        console.error("Error fetching student or messages:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchStudent();
  }, [id]);

  // ✅ Back button (with preserved filters)
  const handleBackToStudents = () => {
    if (location.state?.fromList && location.state?.students) {
      navigate("/students", { state: { students: location.state.students } });
    } else {
      navigate("/students");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading student details...</p>;
  if (!student)
    return <p className="text-center mt-10 text-red-600">Student not found</p>;

  // ✅ Send message via backend
  const sendMessage = async () => {
    if (!message.trim()) return alert("Message cannot be empty!");
    setSending(true);
    try {
      const res = await axios.post("http://localhost:5000/api/faculty/sendMessage", {
        studentId: student._id,
        message,
      });

      if (!res.data.success) throw new Error(res.data.error || "Unknown error");

      alert(`✅ Message sent successfully!`);
      setMessage("");
      setShowMessageCard(false);

      setMessagesList((prev) => [
        ...prev,
        { studentId: student._id, message, timestamp: new Date().toISOString() },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      alert(`❌ Failed to send message:\n${err.response?.data?.error || err.message}`);
    } finally {
      setSending(false);
    }
  };

  const documents = [
    { name: "Aadhar Card", url: student.aadhaar },
    { name: "DMC", url: student.dmc },
    { name: "Caste Certificate", url: student.casteCert },
    { name: "Residence Certificate", url: student.residenceCert },
    { name: "Photo", url: student.photo },
    { name: "Bank", url: student.documents?.bank },
    { name: "Fee Receipt", url: student.documents?.feeReceipt },
    { name: "Freeship Card", url: student.documents?.freeshipCardNo },
    { name: "Student Undertaking", url: student.documents?.studentUndertaking },
    { name: "Application Form", url: student.documents?.applicationForm },
    { name: "Affidavit", url: student.documents?.affidavit },
    { name: "College ID Card", url: student.documents?.collegeIDCard },
    { name: "Income Certificate", url: student.documents?.incomeCert },
    { name: "ITR", url: student.documents?.itr },
    { name: "Father Aadhaar", url: student.documents?.fatherAadhaar },
    { name: "Mother Aadhaar", url: student.documents?.motherAadhaar },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg mt-10">
      {/* ✅ Back Button */}
      <button
        onClick={handleBackToStudents}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        ← Back to Students
      </button>

      {/* ✅ Basic Info */}
      <section className="mb-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          {student.fullName}'s Profile
        </h2>
        <h3 className="text-xl font-bold mb-2 border-b pb-1">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <p><strong>Application No:</strong> {student.applicationNumber}</p>
          <p><strong>Roll No:</strong> {student.rollNo}</p>
          <p><strong>Course:</strong> {student.course}</p>
          <p><strong>Branch:</strong> {student.branch}</p>
          <p><strong>Session:</strong> {student.session}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Category:</strong> {student.category}</p>
          <p><strong>Date of Birth:</strong> {new Date(student.dateofbirth).toLocaleDateString()}</p>
        </div>

        {/* ✅ Send Message Section */}
        <div className="mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowMessageCard(true)}
          >
            Send Message to Student
          </button>
        </div>

        {/* ✅ Message Box */}
        {showMessageCard && (
          <div className="mt-4 p-4 border rounded shadow-md bg-gray-50">
            <h4 className="font-semibold mb-2">
              Send Message to {student.fullName}
            </h4>
            <textarea
              className="w-full border p-2 rounded mb-2"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <div className="mb-2">
              <span className="mr-2 font-medium">Pre-built Messages:</span>
              {preBuiltMessages.map((msg, idx) => (
                <button
                  key={idx}
                  className="bg-gray-200 px-2 py-1 rounded mr-2 mb-2 hover:bg-gray-300 text-sm"
                  onClick={() => setMessage(msg)}
                >
                  {msg}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
                  sending ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={sendMessage}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send"}
              </button>
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowMessageCard(false)}
                disabled={sending}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ✅ Previous Messages */}
        {messagesList.length > 0 && (
          <div className="mt-4 p-4 border rounded shadow-md bg-gray-50">
            <h4 className="font-semibold mb-2">Previous Messages</h4>
            <ul>
              {messagesList.map((m, idx) => (
                <li key={idx} className="mb-1">
                  <span className="font-medium">
                    {new Date(m.timestamp).toLocaleString()}:
                  </span>{" "}
                  {m.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* ✅ Contact Info */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-2 border-b pb-1">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Address:</strong> {student.address}</p>
        </div>
      </section>

      {/* ✅ Parent Info */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-2 border-b pb-1">Parent Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <p><strong>Father's Name:</strong> {student.fatherName}</p>
          <p><strong>Mother's Name:</strong> {student.motherName}</p>
          <p><strong>Parent Contact:</strong> {student.parentContact}</p>
          <p><strong>Occupation:</strong> {student.parentOccupation}</p>
          <p><strong>Annual Income:</strong> ₹{student.parentIncome?.toLocaleString()}</p>
        </div>
      </section>

      {/* ✅ Uploaded Documents */}
      <section className="mb-6">
        <h3 className="text-xl font-bold mb-2 border-b pb-1">
          Uploaded Documents
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Document Name</th>
                <th className="border px-4 py-2 text-left">Status / File</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium">{doc.name}</td>
                  <td className="border px-4 py-2">
                    {doc.url ? (
                      <span className="text-green-700 font-semibold">Uploaded</span>
                    ) : (
                      <span className="text-gray-500">Not Uploaded</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {doc.url ? (
                      <a
                        href={`http://localhost:5000/${doc.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
