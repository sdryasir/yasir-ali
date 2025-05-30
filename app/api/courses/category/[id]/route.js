// app/api/courses/category/[id]/route.js
import dbConnect from '@/lib/mongoose'
import Course from '@/models/Course'
import Category from '@/models/Category';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await dbConnect()
  const { id } = await params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid category ID", { status: 400 });
  }


  try {
    const courses = await Course.find({ category: id }).populate('category')
    return Response.json(courses)
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: error.message }, { status: 500 })
  }
}
