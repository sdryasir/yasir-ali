"use client"
import { useUser } from '@/contexts/UserContext';

export default function EnrolledCourses() {
  const user = useUser();
  return (
    <div className="card shadow-sm">
      <div className="card-header">My Courses</div>
        <div className="card-body">
            Hello
        </div>
    </div>
  );
}
