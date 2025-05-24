// app/api/courses/[courseId]/videos/route.js
import dbConnect from '@/lib/mongoose'
import Course from '@/models/Course'
import Video from '@/models/Video'

export async function POST(req, { params }) {
  await dbConnect()
  const { courseId } = params
  const body = await req.json()

  try {
    const video = await Video.create(body)

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { videos: video._id } },
      { new: true }
    ).populate('videos')

    return Response.json(updatedCourse)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
