import mongoose from "mongoose";

const reportCardSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    grade: { type: String, required: true },
    totalPercentage: { type: Number },
    result: {
      type: String,
      enum: ["pass", "fail", "incomplete"],
      default: "incomplete",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReportCard", reportCardSchema);
