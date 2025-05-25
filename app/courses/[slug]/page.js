'use client'
import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSearchParams } from 'next/navigation';
import VideoPlaylist from '@/components/VideoPlaylist';

function page() {

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const courseId = searchParams.get('id');

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${courseId}`);
        const data = await res.json();
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed fetch @@@", error);
        
      }
    }
    fetchCourse();
  }, [courseId]);

  if (loading) return <div className="container py-4">Loading course...</div>;
  if (!course) return <div className="container py-4">Course not found.</div>;
    


  return (
    <div>
      <VideoPlaylist courseId={course._id} />
    </div>
  )
}

export default page