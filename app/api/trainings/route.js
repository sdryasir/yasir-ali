import dbConnect from "@/lib/mongoose"
import Course from "@/models/Course"

export async function GET() {
  await dbConnect()

  const courses = await Course.find({liveTraining: true})
  return Response.json(courses)
}