import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  department: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Department" 
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Teacher" 
  },
  sem: { 
    type: Number, 
    enum: [1, 2, 3, 4, 5, 6, 7, 8], 
    required: true 
  },
  description: { type: String },
  credits: { type: Number },
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
