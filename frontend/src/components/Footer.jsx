import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer Section */}
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="https://scholarships.punjab.gov.in/sp/" className="hover:text-white transition">Dr. Ambedkar Portal</a></li>
            <li><a href="https://scholarships.gov.in/" className="hover:text-white transition">NSP Portal</a></li>
            <li><a href="/help" className="hover:text-white transition">Help</a></li>
          </ul>
        </div>

        {/* Download Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Download</h3>
          <ul className="space-y-2">
            {/* <li>
              <a href="/images/First Page.pdf" download className="flex items-center gap-2 hover:text-white transition">
                <FaDownload /> First Page
              </a>
            </li> */}
            <a
  href="/images/First Page.pdf"
  download="First Page.pdf"
  className="flex items-center gap-2 hover:text-white transition"
>
  <FaDownload /> First Page
</a>

            <li>
              <a href="/images/Acknowledgement of Scholarship for Renewal Students (1).pdf" download className="flex items-center gap-2 hover:text-white transition">
                <FaDownload /> Acknowledgement of Scholarship for Renewal Students
              </a>
            </li>
            <li>
              <a href="/images/Latest Guidelines for Post Matric Scholarship Scheme.pdf" download className="flex items-center gap-2 hover:text-white transition">
                <FaDownload /> Guidelines for Post Matric Scholarship 
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400" /> gndec@college.edu
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-gray-400" /> +91 12345 67890
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400" /> GNDEC College, Ludhiana, 141013, India
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-center text-gray-400 py-4 text-sm">
        © {new Date().getFullYear()} GNDEC College. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
