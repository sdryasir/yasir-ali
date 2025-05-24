// models/Category.js
import mongoose from "mongoose"

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  imageUrl:String
})

export default mongoose.models.Category || mongoose.model("Category", CategorySchema)
