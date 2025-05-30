import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';

export async function GET(req, { params }) {
  await dbConnect();
  const { slug } = await params;
  const course = await Course.find({slug});
  return Response.json(course);
}