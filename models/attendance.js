import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course" 
  },
  date: { 
    type: Date, 
    required: true 
  },
  records: [{
    student: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Student" 
    },
    status: { 
      type: String, 
      enum: ["present", "absent"], 
      required: true 
    }
  }]
}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);
