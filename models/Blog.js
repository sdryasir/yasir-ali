// models/Category.js
import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  content: String,
  imageUrl:String,
  status:{ type: String, required: true },
  author:{
    name:{type:String},
  }
}, {timestamps:true})

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)
