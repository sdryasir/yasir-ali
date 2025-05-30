// models/Category.js
import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  imageUrl:String,
  status:{ type: String, required: true },
})

export default mongoose.models.Category || mongoose.model("Category", CategorySchema)
