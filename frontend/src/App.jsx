import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// Pages
import MainContent from "./components/LandingPage/MainContent.jsx";
import Footer from "./components/Footer.jsx";

import StudentLogin from "./pages/student/StudentLogin.jsx";
import ViewDetails from "./pages/student/ViewStudentDetail.jsx";

import SubmitOtr from "./pages/student/SubmitOtr.jsx";
import UploadDocument from "./pages/student/UploadDocuments.jsx";
import VisionMission from "./pages/student/VisionMission.jsx";
import FAQ from "./pages/student/FAQ.jsx";
import About from "./components/About.jsx";
import ContactUs from "./components/ContactUs.jsx";
import SignUp from "./pages/student/SignUp/SignUp.jsx";
import Layout from "./pages/student/profile/Layout.jsx";


import Help from "./pages/student/profile/Navbar/NavLinks/Help.jsx";
import UserProfile from "./pages/student/profile/Navbar/IconsProfile/ProfileMenu/UserProfile.jsx";
import Navbar from "./pages/student/profile/Navbar/Navbar.jsx";
import Opportunities from "./pages/student/profile/Navbar/Dropdown/Opportunities.jsx"
import Events from "./pages/student/profile/Navbar/Dropdown/Events.jsx"
import IconsProfile from "./pages/student/profile/Navbar/IconsProfile/IconsProfile.jsx"
import NotificationsDropdown from "./pages/student/profile/Navbar/IconsProfile/NotificationsDropdown.jsx";
import LogoSearch from "./pages/student/profile/Navbar/LogoSearch/LogoSearch.jsx";

import SearchBar from "./pages/student/profile/Navbar/LogoSearch/SearchBar.jsx";
import ProfileMenu from "./pages/student/profile/Navbar/IconsProfile/ProfileMenu/ProfileMenu.jsx"
import ProfileMenuItem from "./pages/student/profile/Navbar/IconsProfile/ProfileMenu/ProfileMenuItem.jsx"
import SettingPage from "./pages/student/profile/Navbar/IconsProfile/ProfileMenu/SettingPage.jsx"
// import UserProfile from "./pages/student/profile/Navbar/ProfileMenu/UserProfile.jsx"
import EditProfile from "./pages/student/profile/Navbar/IconsProfile/ProfileMenu/EditProfile.jsx"
import UploadDocuments from "./pages/student/profile/Navbar/IconsProfile/ProfileMenu/UploadDocuments.jsx";


// faculty section imports

import FacultyLogin from "./pages/faculty/FacultyLogin.jsx";
import StudentDetails from "./pages/faculty/StudentDetails.jsx";
import StudentDocuments from "./pages/faculty/StudentDocuments.jsx";
import Student from "./pages/faculty/Student.jsx";
import FacultyMain from './pages/faculty/FacultyMain.jsx';
import PostNotification from "./pages/faculty/PostNotification.jsx";
import Logout from "./pages/faculty/Logout";





const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  // Test backend connection
  useEffect(() => {
    axios
      .get("/api/authRoutes")
      .then((response) => console.log("✅ Backend Response:", response.data))
      .catch((error) =>
        console.error("❌ Error connecting to backend:", error.message)
      );
  }, []);

  // Handle Login
  const handleLogin = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Routes */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<MainContent />} />


          {/* <Route
            path="/AdminLayout"
            element={
              isAuthenticated ? <AdminLayout /> : <Navigate to="/faculty-login" />
            }
          /> */}

          <Route path="/faculty-login" element={<FacultyLogin onLogin={handleLogin} />}/>
          <Route path="/post-notification" element={<PostNotification />} />
          <Route path="/logout" element={<Logout />} />



          
          <Route path="/students/:id/details" element={<StudentDetails />} />
                  <Route path="/facultyLogin" element={<FacultyLogin />} />
        <Route path="/facultyMain" element={<FacultyMain />} /> {/* ✅ Must match navigate() */}
       
          



          {/* student */}

          <Route path="/login" element={<StudentLogin onLogin={handleLogin} />} />
          <Route path="/upload-documents" element={<UploadDocument />} />
          <Route path="/upload-otr" element={<SubmitOtr />} />
          <Route path="/vision-mission" element={<VisionMission />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />


          {/* Admin Routes */}
          {/* <Route path="/faculty" element={<AdminLayout />}>
                */}


          {/* Student Section */}
          {/* <Route path="/Layout" element={<Layout />}>
             
              <Route path="help" element={<Help />} />
              <Route path="profile" element={<UserProfile  />} />
              <Route path="Navbar" element={<Navbar/>} />
               <Route path="Opportunities" element={<Opportunities/>} />
               <Route path="Help" element={<Help />} />
               <Route path="Events" element={<Events/>}/>
                <Route path="IconsProfile" element={<IconsProfile/>}/>
                <Route path="LogoSearch " element={<LogoSearch />}/>
                <Route path="SearchBar" element={<SearchBar/>}/>
                <Route path="NotificationsDropdown.jsx" element={<NotificationsDropdown/>}/>
                <Route path="ProfileMenu" element={<ProfileMenu />}/>
                 <Route path="ProfileMenuItem" element={<ProfileMenuItem />}/>
                <Route path="SettingPage " element={<SettingPage />}/>
                <Route path="EditProfile " element={<EditProfile />}/>
                
               

          </Route>
           */}


          {/* Student Section */}
          <Route path="/Layout" element={<Layout />}>
            <Route path="help" element={<Help />} />
            <Route path="profile" element={<UserProfile />} />

            {/* Corrected case + no duplicates */}
            <Route path="opportunities" element={<Opportunities />} />
            <Route path="events" element={<Events />} />

            {/* Profile-related routes */}
            <Route path="icons-profile" element={<IconsProfile />} />
            <Route path="logo-search" element={<LogoSearch />} />
            <Route path="search-bar" element={<SearchBar />} />
            <Route path="notifications" element={<NotificationsDropdown />} />
            <Route path="profile-menu" element={<ProfileMenu />} />
            <Route path="profile-menu-item" element={<ProfileMenuItem />} />
            <Route path="settings" element={<SettingPage />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="upload-documents" element={<UploadDocuments />} />
            <Route path="upload-otr" element={<SubmitOtr />} />

          </Route>


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;



