import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Video from '@/models/Video';

export async function GET(req, { params }) {
  await dbConnect();
  const courseId = (await params).courseId
  const videos = await Video.find({ course: courseId });
  return NextResponse.json(videos);
}
