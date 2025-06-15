import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose'; 
import Video from '@/models/Video';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { courseId, topicBreakdown } = body;

    if (!courseId || !Array.isArray(topicBreakdown)) {
      return NextResponse.json({ success: false, error: 'Invalid data format' }, { status: 400 });
    }

    const savedVideos = [];

    for (const topic of topicBreakdown) {
      const { topicTitle, videos } = topic;

      for (const video of videos) {
        const newVideo = new Video({
          title: video.title,
          link: video.link,
          topicTitle,
          videoLength: video.videoLength,
          previewAvailable: video.previewAvailable || false,
          assignment: video.assignment || null,
          course: courseId,
        });

        const saved = await newVideo.save();
        savedVideos.push(saved);
      }
    }

    return NextResponse.json({ success: true, videos: savedVideos }, { status: 201 });
  } catch (err) {
    console.error('[VIDEOS_POST_ERROR]', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
