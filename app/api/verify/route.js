import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return Response.json({ message: 'Invalid token' }, { status: 400 });
  }

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return Response.json({ message: 'Token expired or invalid' }, { status: 400 });
  }

  user.emailVerified = true;
  user.isActive = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  return Response.json({ message: 'Email verified successfully' });
}
