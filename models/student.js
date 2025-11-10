import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    enrollment: { type: String, required: true, unique: true },
    registration: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    year: { type: Number, enum: [1, 2, 3, 4], required: true },
    sem: { type: Number, enum: [1, 2, 3, 4, 5, 6, 7, 8], required: true },
    section: { type: String },
    guardianName: { type: String },
    guardianPhone: { type: String },
  },
  { timestamps: true }
);

const Student = mongoose.model("student", studentSchema);
export default Student;
