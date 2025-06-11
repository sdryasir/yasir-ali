'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { redirect } from "next/navigation";
import { useSession } from 'next-auth/react'

export default function EnrollPage({ courseId }) {
  const router = useRouter();
  const { data: session } = useSession()
  const [course, setCourse] = useState(null)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(session?.user?.id || null);
  
  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${courseId}`)
      const data = await res.json();
      setCourse(data)
    }
    fetchCourse()    
  }, [courseId])

  const handleFileUpload = async () => {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-payment-receipt`, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      throw new Error('File upload failed')
    }

    const data = await res.json()
    return data.url
  }

  const handleEnroll = async () => {
    try {
      if (!userId) {
        const callbackUrl = `/courses/${course.slug}`;
        router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
        return
      }

      setLoading(true)
      let receiptUrl = ''

      if (course.features.accessType !== 'Free') {
        if (!file) {
          alert('Please upload payment receipt.')
          return
        }
        receiptUrl = await handleFileUpload()
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          courseId: course._id,
          receiptUrl,
        }),
      })

      const data = await res.json()
      alert("hhhhhhh", data.message)

      if (res.ok && course.features.accessType === 'Free') {
        router.push(`/dashboard/courses/${course.id}`)
        
      }

    } catch (err) {
      console.error(err)
      alert('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!course) return <div className='container mt-5'>Loading course...</div>

  return (
    <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-6">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title h4 mb-4">Enroll in {course.title}</h1>

          <p className="mb-3">
            Course Type: <strong>{course.features.accessType}</strong>
          </p>

          {course.features.accessType !== 'Free' && (
            <div className="mb-3">
              <label className="form-label fw-medium">Upload Payment Receipt</label>
              <input
                type="file"
                accept="image/*,.pdf"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          )}

          <button
            onClick={handleEnroll}
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? 'Processing...' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
