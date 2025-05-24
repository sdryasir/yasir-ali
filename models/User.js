// models/User.js
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: String,
  password: String, // store hashed passwords!
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
