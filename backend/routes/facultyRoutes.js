// import express from "express";
// import { getAllStudents, getStudentById, sendMessage, getMessages } from "../controllers/facultyController.js";


// const router = express.Router();

// // Students
// router.get("/students", getAllStudents);
// router.get("/students/:id", getStudentById);

// // Messages
// router.post("/sendMessage", sendMessage);
// router.get("/messages/:id", getMessages);

// export default router;

import express from "express";
import { loginFaculty, getAllStudents, getStudentById, sendMessage, getMessages } from "../controllers/facultyController.js";

const router = express.Router();

router.post("/loginfaculty", loginFaculty);
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.post("/sendMessage", sendMessage);
router.get("/messages/:id", getMessages);
router.post("/login", loginFaculty);



export default router;
