// import axios from "axios";

// const API_URL = "/api";

// // Fetch all students with optional filters
// export const getAllStudents = async (filters = {}) => {
//   try {
//     const params = new URLSearchParams();
//     if (filters.branch && filters.branch !== "all") params.append("branch", filters.branch);
//     if (filters.session && filters.session !== "all") params.append("session", filters.session);

//     const res = await axios.get(`${API_URL}/students?${params.toString()}`);
//     return res.data; // { success: true, count: X, students: [...] }
//   } catch (err) {
//     console.error("Error fetching students:", err);
//     return { success: false, students: [], message: err.message };
//   }
// };
// export const getStudentById = async (id) => {
//   try {
//     const res = await axios.get(`${API_URL}/students/${id}`);
//     return res.data; // { success: true, student: {...} }
//   } catch (err) {
//     console.error("Error fetching student by ID:", err);
//     return { success: false, student: null, message: err.message };
//   }
// };

import axios from "axios";

// Use your backend port and faculty route
const API_URL = "http://localhost:5000/api/faculty";

// Fetch all students with optional filters
export const getAllStudents = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.branch && filters.branch !== "all") params.append("branch", filters.branch);
    if (filters.session && filters.session !== "all") params.append("session", filters.session);

    const res = await axios.get(`${API_URL}/students?${params.toString()}`);
    return res.data; // { success: true, count: X, students: [...] }
  } catch (err) {
    console.error("Error fetching students:", err);
    return { success: false, students: [], message: err.message };
  }
};

export const getStudentById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/students/${id}`);
    return res.data; // { success: true, student: {...} }
  } catch (err) {
    console.error("Error fetching student by ID:", err);
    return { success: false, student: null, message: err.message };
  }
};
