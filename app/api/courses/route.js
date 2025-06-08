// app/api/courses/route.js
import dbConnect from "@/lib/mongoose"
import Course from "@/models/Course"

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function GET() {
  await dbConnect()

  const courses = await Course.find({})
  return Response.json(courses)
}

// export async function POST(req) {
//   await dbConnect()
//   const body = await req.json()

//   try {
//     const course = await Course.create(body)
//     return Response.json(course, { status: 201 })
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 400 })
//   }
// }

export async function POST(req) {
  await dbConnect();

  try {
    const formData = await req.formData();

    // Extract string/text fields
    const title = formData.get('title');
    const slug = formData.get('slug');
    const shortDescription = formData.get('shortDescription');
    const description = formData.get('description');
    const category = formData.get('category');
    const instructor = formData.get('instructor');
    const price = parseFloat(formData.get('price') || '0');
    const discountedPrice = parseFloat(formData.get('discountedPrice') || '0');
    const duration = formData.get('duration');
    const level = formData.get('level');
    const liveTraining = formData.get('liveTraining');
    const introVideo = formData.get('introVideo');

    // Parse JSON fields
    const tags = JSON.parse(formData.get('tags') || '[]');
    const bonuses = JSON.parse(formData.get('bonuses') || '[]');
    const weeklyBreakdown = JSON.parse(formData.get('weeklyBreakdown') || '[]');
    const faqs = JSON.parse(formData.get('faqs') || '[]');
    const features = JSON.parse(formData.get('features') || '{}');
    const whyTakeThisCourse = JSON.parse(formData.get('whyTakeThisCourse') || '[]');

    // Handle file upload to Cloudinary
    const file = formData.get('thumbnail');

    let thumbnailUrl = '';
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'courses' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      thumbnailUrl = uploadRes.secure_url;
    }

    // Create and save course
    const course = new Course({
      title,
      slug,
      shortDescription,
      description,
      category,
      instructor,
      price,
      discountedPrice,
      duration,
      level,
      liveTraining,
      tags,
      thumbnail: thumbnailUrl,
      introVideo,
      bonuses,
      weeklyBreakdown,
      faqs,
      features,
      whyTakeThisCourse,
    });

    await course.save();

    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error('Error saving course:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
