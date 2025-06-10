import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },



  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ['admin', 'instructor', 'student'],
    default: 'student',
  },

  profilePicture: {
    type: String, // Cloudinary or external URL
  },

  phone: {
    type: String,
  },

  bio: {
    type: String,
    maxlength: 500,
  },

  socialLinks: {
    linkedin: String,
    github: String,
    website: String,
    twitter: String,
  },

  enrolledCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],

  teachingCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],

  progress: [
    {
      course: { type: Schema.Types.ObjectId, ref: 'Course' },
      completedVideos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
      lastAccessed: { type: Date },
    },
  ],

  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],

  notifications: [
    {
      message: String,
      type: { type: String }, // e.g., 'course-update', 'new-course', etc.
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  emailVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,

  resetPasswordToken: String,
  resetPasswordExpires: Date,

  loginHistory: [
    {
      ip: String,
      userAgent: String,
      date: { type: Date, default: Date.now },
    },
  ],
  pendingEnrollments: [
  {
      course: { type: Schema.Types.ObjectId, ref: 'Course' },
      receiptUrl: String,
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      uploadedAt: { type: Date, default: Date.now },
    }
  ],

  isActive: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});


export default mongoose.models.User || mongoose.model("User", userSchema)
