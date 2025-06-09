import User from '@/models/User';
import dbConnect from '@/lib/mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const token = crypto.randomBytes(32).toString('hex');
const expires = Date.now() + 1000 * 60 * 60; // 1 hour

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const { fullName, email, username, password, role } = body;

  if (!fullName || !email || !username || !password) {
    return Response.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return Response.json({ message: 'User already exists' }, { status: 409 });
  }
  const existingUsername = await User.findOne({ username: username });
  if (existingUsername) {
    return Response.json({ message: 'Username already exists' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullName,
    email,
    username,
    password: hashedPassword,
    verificationToken: token,
    verificationTokenExpires: expires,
    role,
  });

  await newUser.save();

  await sendVerificationEmail(email, fullName, token);
  

  return Response.json({ message: 'User registered successfully' }, { status: 201 });
}

export const sendVerificationEmail = async (to, name, token) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

  const mailOptions = {
    from: `"EasyLearn LMS Support" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject: 'Verify your email - EasyLearn LMS',
    html: `
      <h3>Hi ${name},</h3>
      <p>Thanks for registering. Please verify your email by clicking the link below:</p>
      <a href="${link}">Verify Email</a>
      <p>This link will expire in 1 hour.</p>
      <p>Best regards,<br>
      EasyLearn LMS Team<br>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}">www.easylearn.pk</a>
      </p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
