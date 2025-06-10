import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  videoId: String,
  videoTitle: String,
  videoUrl: String,
  text: String,
  author: String,
  authorImage: String,
  publishedAt: Date,
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
