// app/api/users/[id]/route.js
import dbConnect from "@/lib/mongoose"
import Category from "@/models/Category"
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

export async function DELETE(request, { params }) {
  await dbConnect();

  try {
    const category = await Category.findByIdAndDelete(await params.id);

    if (!category) {
      return new Response(JSON.stringify({ message: 'category not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ message: 'category deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete category' }), {
      status: 500,
    });
  }
}

export async function PATCH(req, { params }) {
  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const file = formData.get("image"); // can be null if not updating image

  if (!name || !description) {
    return NextResponse.json({ error: "Name and description are required" }, { status: 400 });
  }

  let imageUrl;

  if (file && typeof file === 'object') {
    try {
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

      const result = await uploadToCloudinary();
      imageUrl = result.secure_url;
    } catch (err) {
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }
  }

  try {
    await dbConnect();

    const updated = await Category.findByIdAndUpdate(
      params.id,
      {
        name,
        description,
        ...(imageUrl && { imageUrl }), // update image only if new image is provided
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category updated", data: updated });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}