




import { useState, useEffect } from "react";
import carouselImage1 from "/images/carousel1.jpg";
import carouselImage2 from "/images/carousel2.jpg";

const MainContent = () => {
  const [currentImage, setCurrentImage] = useState(carouselImage1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === carouselImage1 ? carouselImage2 : carouselImage1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Upload Activity - Left */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-start min-h-[420px] border-l-4 border-indigo-500 pl-4 text-center sm:text-left">
          <h2 className="font-bold text-xl mb-2 text-indigo-700">Upload Your Achievements</h2>
          <p className="text-lg text-gray-700 mb-4">
            Students can submit records of their achievements with proof:
          </p>
          <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
            <li>Academic Performance (CGPA, Results)</li>
            <li>Co-Curricular Activities (Clubs, Workshops)</li>
            <li>Extra-Curricular Activities (Fests, Debates, Art)</li>
            <li>Sports & Fitness Achievements</li>
            <li>Other Certifications or Awards</li>
          </ul>
          <p className="text-lg text-gray-700 mt-4">
            <span className="font-semibold text-indigo-600">Note:</span> Each submission must include proper documentation like certificates or event participation proofs.
          </p>
          <a href="/upload-activity" className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Upload Activity
          </a>
        </div>

        {/* Carousel & Info - Center */}
        <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden relative flex flex-col">
          <div className="w-full h-[280px] flex items-center justify-center">
            <img
              src={currentImage}
              alt="Student Activities"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out rounded-lg"
            />
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg mt-4">
            <h3 className="text-xl font-bold text-indigo-700">Student Activity Tracker</h3>
            <p className="text-gray-700 text-lg mt-2">
              This platform enables holistic development tracking of each student. 
              All uploaded activities are verified and reviewed by respective faculty members.
            </p>
            <ul className="list-disc pl-5 text-gray-700 text-lg mt-2">
              <li>Automated academic data via result portal integration.</li>
              <li>Real-time status on activity verification.</li>
              <li>Faculty evaluation and score assignment.</li>
              <li>One-click export of student profiles for internships or scholarships.</li>
            </ul>
          </div>
        </div>

        {/* Notice Board - Right */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-start min-h-[420px] border-l-4 border-green-500 pl-4 text-center sm:text-left">
          <h2 className="font-bold text-xl mb-2 text-green-700">Notice Board</h2>
          <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
            <li><span className="text-red-600 font-bold animate-blink">NEW</span> Activity upload deadline: April 20</li>
            <li>Annual Achievement Report generation starts May 1</li>
            <li>Integrated CGPA sync from result portal on April 10</li>
            <li>Faculty review cycle: April 15 – April 30</li>
            <li>New badge system for verified achievements coming soon!</li>
            <li>Join SkillUP Bootcamp – Registrations open!</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default MainContent;
