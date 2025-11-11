import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String 
  },
  duration: { 
    type: String
  },
  attachments: [{ type: String }], // file URLs
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course" 
  },
  teacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Teacher" 
  },
}, { timestamps: true });

export default mongoose.model("Lesson", lessonSchema);
