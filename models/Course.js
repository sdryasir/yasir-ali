// models/Course.js
import mongoose from "mongoose"
import { getCurrentDate } from '../lib/dateUtils';


const FaqSchema = new mongoose.Schema({
  question: String,
  answer: String,
}, { _id: false });

const TopicBreakdownSchema = new mongoose.Schema({
  topicTitle: { type: String, required: true },
  description: String,
  githubLink: String,
  assignmentTitle: String,
  videos:[{
    title:String,
    link:String,
    videoLength:String,
    previewAvailable:Boolean
  }]
}, { _id: false });

const FeaturesSchema = new mongoose.Schema({
  mode: { type: String, enum: ['Online'], default: 'Online' },
  accessType: { type: String, enum: ['Free', 'Paid'], default: 'Free' },
  startType: { type: String, enum: ['On Demand'], default: 'On Demand' },
  prerequisites: [String],
  language: {type: String, default: 'Urdu'},
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  shortDescription: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  level: String,
  tags: [String],
  thumbnail: String,
  introVideo: String,
  price: Number,
  discountedPrice: Number,
  duration: String,
  instructor: String,
  features: FeaturesSchema,
  topicBreakdown: [TopicBreakdownSchema],
  faqs: [FaqSchema],
  bonuses: [String],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  whyTakeThisCourse: [String],
  createdAt: { type: Date, default: getCurrentDate },
})

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)
