import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Course from '@/models/Course';

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { courseIds } = body;

  if (!Array.isArray(courseIds)) {
    return NextResponse.json({ message: 'Invalid course ID array' }, { status: 400 });
  }

  try {
    const courses = await Course.find({ _id: { $in: courseIds } });
    return NextResponse.json({ courses });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}