import dbConnect from "@/lib/mongoose"
import Blog from "@/models/Blog"
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from 'next-auth'
import { authOptions } from "../auth/[...nextauth]/route";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function GET() {
  await dbConnect()

  try {
    const blogs = await Blog.find({status:'public'});
    return Response.json(blogs);
  } catch (error) {
    console.log('Server error - fetching blogs', error);
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  const formData = await req.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const content = formData.get("content");
  const file = formData.get("image");
  const status = formData.get("status");
  const author = {
    name:session.user?.name,
  }

  console.log("====", author);
  

  if (!file || !title || !content || !slug ||  !status) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  if(!author){
    return NextResponse.json({ error: "Author is required" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const stream = Readable.from(buffer);

  const uploadToCloudinary = () =>
    new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { folder: "nextjs15_uploads/blogs" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.pipe(cloudinaryStream);
    });

  try {
    const result = await uploadToCloudinary();

    // Connect to MongoDB
    await dbConnect()


    // Save to DB
    const blog = new Blog({
      title,
      slug,
      content,
      imageUrl: result.secure_url,
      status,
      author
    });

    await blog.save();

    return NextResponse.json({
      message: "Image uploaded and saved",
      data: blog,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}