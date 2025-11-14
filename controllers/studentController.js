import User from "../models/user.js";
import Lesson from "../models/lesson.js";
import Student from "../models/student.js";
import Attendance from "../models/attendance.js";
import Assignment from "../models/assignment.js";
import ReportCard from "../models/reportCard.js";
import Fee from "../models/fee.js";

export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id })
      .populate("userId", "name email profileImage")
      .populate("department", "name")
      .populate("course", "name");

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getMyClass = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id })
      .populate("department", "name head")
      .populate("course");

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getMyCourse = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id }).populate(
      "course"
    );

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getMyLessons = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });

    const lessons = await Lesson.find({
      course: student.course,
    });

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });

    const attendance = await Attendance.find({
      "records.student": student._id,
    }).populate("course");

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getMyAssignments = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });

    const assignments = await Assignment.find({
      course: student.course,
    }).populate("course");

    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getMyResults = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });

    const results = await ReportCard.find({
      student: student._id,
    }).populate("course");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getMyFees = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });

    const fees = await Fee.findOne({
      student: student._id,
    });

    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

export const submitAssignment = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
      return res.status(404).json({ message: "Student record not found" });
    }

    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const now = new Date();
    if (now > assignment.deadline) {
      return res.status(400).json({
        message: "Deadline has passed! Submission is not allowed now.",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const cloudUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "assignments" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer); // send multer buffer
      });

    const uploaded = await cloudUpload();

    assignment.submissions.push({
      student: student._id,
      fileUrl: uploaded.secure_url,
      submittedAt: new Date(),
    });

    return res.status(200).json({
      message: "Assignment submitted successfully",
      fileUrl: uploaded.secure_url,
    });
    
  } catch (error) {
    console.error("Submit assignment error:", error);
    return res.status(500).json({
      message: "Failed to submit assignment",
      error: error.message,
    });
  }
};
