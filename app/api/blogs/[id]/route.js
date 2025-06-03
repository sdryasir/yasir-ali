import dbConnect from "@/lib/mongoose";
import Blog from "@/models/Blog";


export async function DELETE(request, { params }) {
  await dbConnect();
  const id = (await params).id
  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return new Response(JSON.stringify({ message: 'blog not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'blog deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to blog category' }), {
      status: 500,
    });
  }
}