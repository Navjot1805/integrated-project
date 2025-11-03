import React from 'react';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-blue-500 text-center mb-6">About the Scholarship System</h1>
      <p className="text-lg text-gray-700 mb-4">
        Our Scholarship Management System is designed to streamline the entire scholarship process for students and administrators, ensuring transparency and efficiency.
      </p>
      <ul className="list-disc pl-6 text-gray-700 mb-6">
        <li>Apply for scholarships online with all necessary documents in one place.</li>
        <li>Upload valid proofs such as income certificates, academic transcripts, and other eligibility documents.</li>
        <li>Track application status in real-time and receive notifications for updates.</li>
        <li>Provide administrators with an easy way to verify, approve, and manage scholarship applications.</li>
      </ul>
      <p className="text-lg text-gray-700">
        The goal is to empower students to access financial aid easily while simplifying the administrative process, making scholarship management faster, transparent, and more reliable.
      </p>
    </div>
  );
}

export default About;
