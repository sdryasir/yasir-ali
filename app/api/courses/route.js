// app/api/courses/route.js
import dbConnect from "@/lib/mongoose"
import Course from "@/models/Course"

export async function GET() {
  await dbConnect()

  const courses = await Course.find({})
  return Response.json(courses)
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()

  try {
    const course = await Course.create(body)
    return Response.json(course, { status: 201 })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
