'use server';

import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createCourse(formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const category = formData.get('category');
  const instructor = formData.get('instructor');
  const price = parseFloat(formData.get('price'));
  const duration = formData.get('duration');
  const level = formData.get('level');
  const tags = formData.getAll('tags[]').filter(Boolean);
  const file = formData.get('thumbnail');

  if (!title || !description || !category || !instructor) {
    throw new Error('Missing required fields');
  }

  await dbConnect();

  let imageUrl = '';
  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const stream = Readable.from(buffer);

    const uploadToCloudinary = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'course_thumbnails' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.pipe(uploadStream);
      });

    imageUrl = await uploadToCloudinary();
  }

  const course = new Course({
    title,
    description,
    category,
    instructor,
    price,
    duration,
    level,
    tags,
    thumbnail: imageUrl,
  });

  await course.save();
}
