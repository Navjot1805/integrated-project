const UploadSection = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-center items-start min-h-[480px] border-l-4 border-indigo-500">
      {/* Heading */}
      <h2 className="font-bold text-lg mb-2 text-indigo-700">
        📂 Scholarship Document Upload
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-2">
        Students must upload the required scholarship documents for verification. 
        Incomplete or unclear submissions may lead to rejection of your application.
      </p>

      {/* Document List */}
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-3">
        <li>Income Certificate (signed by competent authority)</li>
        <li>Caste / Category Certificate</li>
        <li>Aadhaar / Identity Proof</li>
        <li>Academic Records (DMCs, CGPA reports, previous year result)</li>
        <li>Bank Passbook (first page scan)</li>
        <li>Other Relevant Certificates (if applicable)</li>
      </ul>

      {/* Upload Guidelines */}
      <div className="bg-gray-50 p-3 rounded-lg border text-xs text-gray-600 w-full mb-3">
        <p className="mb-1">
          <b className="text-indigo-600">Upload Guidelines:</b>
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>All documents must be <b>scanned & clearly visible</b>.</li>
          <li>Only <b>PDF format</b> is allowed.</li>
          <li>Maximum file size: <b>2 MB per document</b>.</li>
          <li>Rename files before upload (e.g., <i>IncomeCertificate.pdf</i>).</li>
        </ul>
      </div>

      {/* Eligibility Note */}
      <p className="text-sm text-gray-700 mb-3">
        <span className="font-semibold text-indigo-600">Eligibility:</span> Only 
        students enrolled in the current academic year are eligible to apply. 
        Ensure your details match with your college records.
      </p>

      {/* Important Dates */}
      <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200 text-xs text-gray-700 w-full mb-3">
        <p className="font-semibold text-indigo-700">📅 Important Dates:</p>
        <p>Application Start: <b>1st September 2025</b></p>
        <p>Last Date to Upload Documents: <b>30th September 2025</b></p>
        <p>Verification Window: <b>1st – 15th October 2025</b></p>
      </div>

      {/* Admin & Contact Info */}
      <div className="text-xs text-gray-600 space-y-1 mt-2">
        <p><b>Admin:</b> Mr. Rajesh Sharma</p>
        <p><b>Location:</b> Scholarship Cell, GNDEC College, Ludhiana</p>
        <p><b>Contact No:</b> +91 98765 43210</p>
        <p><b>Email:</b> scholarships@gndec.ac.in</p>
        <p><b>Timings:</b> Mon–Fri, 10:00 AM – 4:00 PM</p>
      </div>

      {/* Button */}
      <a
        href="/upload-documents"
        className="mt-4 inline-block bg-indigo-600 text-white px-3 py-1.5 rounded text-sm hover:bg-indigo-700 transition"
      >
        Upload Documents
      </a>
    </div>
  );
};

export default UploadSection;
