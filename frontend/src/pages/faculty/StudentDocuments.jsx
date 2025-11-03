

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function StudentDocuments() {
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/admin/students/${id}/documents`);
        setDocuments(res.data.documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Uploaded Documents</h2>

      {documents.length === 0 ? (
        <p className="text-center text-gray-500">No documents uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 text-center bg-white"
            >
              <h3 className="font-semibold mb-2">{doc.name}</h3>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Document
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
