import dbConnect from "@/lib/mongoose";
import Comment from "@/models/Comment";


export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const total = await Comment.countDocuments();
    const comments = await Comment.find()
      .sort({ publishedAt: -1 }) // most recent first
      .skip(skip)
      .limit(limit);

    return Response.json({
      comments,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}
