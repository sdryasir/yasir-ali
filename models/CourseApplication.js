import mongoose from 'mongoose';
import { getCurrentDate } from '../lib/dateUtils';

const courseApplicationSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, enum: ['JavaScript', 'MRN Stack', 'ReactJS', 'NEXTJS', 'Python'], required: true },
  city: { type: String, required: true },
  preference: { type: String, enum: ['online', 'physical'], required: true },
  createdAt: { type: Date, default: getCurrentDate },
});

export default mongoose.models.CourseApplication || mongoose.model('CourseApplication', courseApplicationSchema);
