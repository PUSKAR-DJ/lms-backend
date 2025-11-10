import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: { type: String, required: true, unique: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    designation: {
      type: String,
      enum: ["Head of Department", "Professor", "Assistant Professor"],
      required: true,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    specialization: { type: String },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("teacher", teacherSchema);
export default Teacher;
