// models/Video.js
import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeId: { type: String, required: true },
  description: { type: String },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

export default mongoose.models.Video || mongoose.model("Video", VideoSchema)
