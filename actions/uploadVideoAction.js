'use server';

import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';
import Video from '@/models/Video';

export async function uploadVideoAction(prevState, formData) {
  const title = formData.get('title');
  const youtubeId = formData.get('youtubeId');
  const description = formData.get('description');
  const courseId = formData.get('courseId');

  if (!title || !youtubeId || !courseId) {
    return { error: 'Required fields are missing' };
  }

  try {
    await dbConnect();

    const video = await Video.create({
      title,
      youtubeId,
      description,
      course: courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: { videos: video._id },
    });

    return { success: true };
  } catch (err) {
    return { error: 'Something went wrong: ' + err.message };
  }
}
