import dbConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { slug } = await params;
    const blog = await Blog.find({slug});
    return Response.json(blog);
  } catch (error) {
    console.log("Error single blog based on slug", error);
    
  }
}