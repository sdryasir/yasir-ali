import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import Video from '@/models/Video';

export async function GET(req, { params }) {
  await dbConnect();
  const { courseId } = await params;

  const course = await Course.findById(courseId).populate('videos');
  return Response.json(course);
}