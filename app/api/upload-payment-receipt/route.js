import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'
import { Readable } from 'stream'

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Convert buffer to readable stream
    const stream = Readable.from(buffer)

    const uploadStream = () =>
      new Promise((resolve, reject) => {
        const cldUploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'receipts',
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) return reject(error)
            resolve(result)
          }
        )
        stream.pipe(cldUploadStream)
      })

    const result = await uploadStream()

    return NextResponse.json({ url: result.secure_url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
