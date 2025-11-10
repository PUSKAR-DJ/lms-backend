import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
  deadline: { type: Date, required: true },
  marks: { type: Number, required: true },
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    fileUrl: { type: String },
    grade: { type: String },
    submittedAt: { type: Date }
  }]
}, { timestamps: true });

export default mongoose.model("Assignment", assignmentSchema);
