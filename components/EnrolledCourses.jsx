"use client"
import { useUser } from '@/contexts/UserContext';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function EnrolledCourses() {
  const { data: session, status } = useSession();
  const [courses, setCourses] = useState([]);
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      if (status === 'authenticated' && user?.enrolledCourses.length) {
        try {
          const res = await fetch('/api/courses/enrolled', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseIds: user.enrolledCourses }),
          });

          const data = await res.json();
          if (res.ok) {
            setCourses(data.courses);
          } else {
            setError(data.message || 'Failed to fetch courses');
          }
        } catch (err) {
          setError('Something went wrong. Please try again later.');
        }
      }
      setLoading(false);
    };

    if (status !== 'loading') {
      fetchCourses();
    }
  }, [session, status]);

  return (
    <div className="card shadow-sm">
      <div className="card-header">My Courses</div>
        <div className="card-body">
          {loading && (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-3">Loading courses...</p>
              </div>
            )}

            {!loading && error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            {!loading && !error && courses.length === 0 && (
              <div className="alert alert-info" role="alert">
                You are not enrolled in any courses yet.
              </div>
            )}
            
            {!loading && courses.length > 0 && (
              <div className="row">
                {courses.map(course => (
                  <div className="col-md-4 mb-4" key={course._id}>
                    <div className="card h-100">
                      <img src={course.thumbnail} className="card-img-top" alt={course.title} />
                      <div className="card-body">
                        <h5 className="card-title" style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: '1.4em',
                          maxHeight: '2.8em',
                        }}
                      >{course.title}</h5>
                        {/* <p className="card-text">{course.shortDescription}</p> */}
                      </div>
                      <div className="card-footer">
                        <a href={`/courses/${course.slug}`} className="btn btn-primary btn-action w-100">Go to Course</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
    </div>
  );
}
