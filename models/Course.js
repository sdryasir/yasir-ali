// models/Course.js
import mongoose from "mongoose"
import { getCurrentDate } from '../lib/dateUtils';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  instructor: String,
  price: Number,
  duration: String,
  level: String,
  tags: [String],
  thumbnail: String,
  createdAt: { type: Date, default: getCurrentDate },
})

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)
