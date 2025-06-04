import { NextResponse } from 'next/server';
import CourseApplication from '@/models/CourseApplication';
import nodemailer from 'nodemailer';
import validator from 'validator';
import dbConnect from '@/lib/mongoose';



export async function POST(req) {
  const body = await req.json();

  // Basic validation
  const { fullname, email, phone, course, city, preference, captcha } = body;
  if (
    !fullname || !validator.isEmail(email) || !validator.isMobilePhone(phone) ||
    !['JavaScript', 'MRN Stack', 'ReactJS', 'NEXTJS', 'Python'].includes(course) ||
    !['online', 'physical'].includes(preference) || !city || !captcha
  ) {
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  // Verify reCAPTCHA
  const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
  });
  const captchaJson = await captchaRes.json();
  if (!captchaJson.success) {
    return NextResponse.json({ message: 'reCAPTCHA failed' }, { status: 400 });
  }

  await dbConnect();

  // Prevent multiple submissions from same email
  const existing = await CourseApplication.findOne({ email });
  if (existing) {
    return NextResponse.json({ message: 'You have already applied.' }, { status: 429 });
  }

  // Save to DB
  const application = await CourseApplication.create({ fullname, email, phone, course, city, preference });

  // Send email to admin
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS,
    },
  });

  // Email to Admin
  await transporter.sendMail({
    from: email,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Course Application From EasyLearn Website',
    html: `<h3>New Course Application From EasyLearn Website</h3>
      <p><strong>Name:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Course:</strong> ${course}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>Preference:</strong> ${preference}</p>
    `,
  });

  // Email to applicant
  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: `Your Application for ${course} Has Been Received`,
    html: `
      <h2>Thank you, ${fullname}!</h2>
      <p>We have received your application for the <strong>${course}</strong> course.</p>
      <p>We’ll contact you shortly. Here's what we got from you:</p>
      <ul>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>City:</strong> ${city}</li>
        <li><strong>Preference:</strong> ${preference}</li>
      </ul>
      <p>Regards,<br/>Training Team<br/>EasyLearn</p>
    `,
  });


  return NextResponse.json({ message: 'Application submitted successfully.' });
}
