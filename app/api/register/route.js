// app/api/register/route.js
import dbConnect from '@/lib/mongoose'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { username, password, role } = await req.json()

    if (!username || !password) {
      return Response.json({ error: 'Username and password are required' }, { status: 400 })
    }

    await dbConnect()

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return Response.json({ error: 'Username already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'user' // default to 'user' if not provided
    })

    await newUser.save()

    return Response.json({ success: true, message: 'User registered successfully' })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
