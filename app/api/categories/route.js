// app/api/courses/route.js
import dbConnect from "@/lib/mongoose"
import Category from "@/models/Category"
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};






export async function GET() {
  await dbConnect()

  const categories = await Category.find({})

  return Response.json(categories)
}



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const name = formData.get("name");
  const slug = formData.get("slug");
  const description = formData.get("description");
  const file = formData.get("image");
  const status = formData.get("status");

  if (!file || !name || !description || !slug ||  !status) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const stream = Readable.from(buffer);

  const uploadToCloudinary = () =>
    new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { folder: "nextjs15_uploads" },
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
    const category = new Category({
      name,
      slug,
      description,
      imageUrl: result.secure_url,
      status
    });

    await category.save();

    return NextResponse.json({
      message: "Image uploaded and saved",
      data: category,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}