import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'
import Course from '@/models/Course'

export async function POST(req) {
  await dbConnect()
  const { userId, courseId, receiptUrl } = await req.json()

  const course = await Course.findById(courseId)
  if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })

  if (course.features.accessType === 'Free') {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId }
    })
    return NextResponse.json({ message: 'Enrolled successfully (free)' })
  }

  if (!receiptUrl) {
    return NextResponse.json({ error: 'Receipt required for paid course' }, { status: 400 })
  }

  // ✅ Check for duplicate in pendingEnrollments
  const user = await User.findById(userId)
  const alreadyPending = user.pendingEnrollments?.some(
    (enroll) => enroll.course.toString() === courseId
  )

  if (alreadyPending) {
    return NextResponse.json({ error: 'Enrollment request already pending for this course' }, { status: 409 })
  }

  // Add to pending enrollments
  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      pendingEnrollments: {
        course: courseId,
        receiptUrl,
        status: 'pending',
      }
    }
  });

  return NextResponse.json({ message: 'Enrollment request submitted. Awaiting admin approval.' })
}
