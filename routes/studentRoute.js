import express from "express";  
import {
  getMyProfile,
  getMyClass,
  getMyCourse,
  getMyLessons,
  getMyAttendance,
  getMyAssignments,
  getMyResults,
  getMyFees,
  submitAssignment
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router();


router.get("/my-profile", protect, getMyProfile);
router.get("/my-class", protect, getMyClass);
router.get("/my-course", protect, getMyCourse);
router.get("/my-lessons", protect, getMyLessons);
router.get("/my-attendance", protect, getMyAttendance);
router.get("/my-assignments", protect, getMyAssignments);
router.get("/my-results", protect, getMyResults);
router.get("/my-fees", protect, getMyFees);
router.post("/submit-assignment/:assignmentId", protect, submitAssignment);

export default router;