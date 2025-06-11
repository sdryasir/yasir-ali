import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = await params;
  const user = await User.findById(userId);
  return Response.json(user);
}