// models/Video.js
import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  duration: String
})

export default mongoose.models.Video || mongoose.model("Video", VideoSchema)
