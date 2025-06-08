// models/Course.js
import mongoose from "mongoose"
import { getCurrentDate } from '../lib/dateUtils';


const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String,
}, { _id: false });

const WeeklyBreakdownSchema = new mongoose.Schema({
  weekTitle: { type: String, required: true },
  description: String,
  githubLink: String,
  assignmentTitle: String,
}, { _id: false });

const FeaturesSchema = new mongoose.Schema({
  mode: { type: String, enum: ['Online', 'Physical', 'Hybrid'], default: 'Online' },
  accessType: { type: String, enum: ['Free', 'Paid'], default: 'Paid' },
  recordingAvailable: { type: Boolean, default: false },
  startType: { type: String, enum: ['Expected Date', 'On Demand'], default: 'On Demand' },
  expectedStartDate: Date,
  prerequisites: [String],
  language: String,
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescription: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  instructor: String,
  price: Number,
  discountedPrice: Number,
  duration: String,
  level: String,
  liveTraining: { type: Boolean, default: false },
  tags: [String],
  thumbnail: String,
  introVideo: String,
  bonuses: [String],
  activeUsers: { type: Number, default: 0 },
  weeklyBreakdown: [WeeklyBreakdownSchema],
  faqs: [FaqSchema],
  features: FeaturesSchema,
  whyTakeThisCourse: [String],
  createdAt: { type: Date, default: getCurrentDate },
})

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)
