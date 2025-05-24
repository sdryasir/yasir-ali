// app/api/courses/[courseId]/route.js
import dbConnect from '@/lib/mongoose'
import Course from '@/models/Course'

export async function GET(req, { params }) {
  await dbConnect()
  const { courseId } = params

  const course = await Course.findById(courseId).populate('videos')
  return Response.json(course)
}
