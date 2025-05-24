// app/api/courses/category/[id]/route.js
import dbConnect from '@/lib/mongoose'
import Course from '@/models/Course'

export async function GET(req, { params }) {
  await dbConnect()
  const { id } = await params

  try {
    const courses = await Course.find({ category: id }).populate('category')
    return Response.json(courses)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
