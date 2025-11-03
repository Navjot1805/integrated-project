// import express from 'express';
// import { uploadDocuments } from '../middlewares/uploadDocumentMiddleware';
// import { uploadDocumentsController } from '../controllers/uploadDocumentController.js';

// const router = express.Router();

// router.post('/upload-documents', uploadDocuments, uploadDocumentsController);

// export default router;




import express from "express";
import { uploadDocuments } from "../middleware/uploadMiddleware.js";
import { uploadStudentDocuments } from "../controllers/studentController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // middleware to get req.user

const router = express.Router();

router.post("/upload-documents", authMiddleware, uploadDocuments, uploadStudentDocuments);


export default router;
