import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import Video from '@/models/Video';

export async function GET(req, { params }) {
  await dbConnect();
  const { courseId } = await params;
  const course = await Course.findById(courseId).populate('videos');
  return Response.json(course);
}


export async function DELETE(request, { params }) {
  await dbConnect();
  const id = (await params).courseId
  try {
    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return new Response(JSON.stringify({ message: 'course not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'course deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete course' }), {
      status: 500,
    });
  }
}