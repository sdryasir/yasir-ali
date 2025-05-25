'use client';

import { useState, useEffect, useTransition, useActionState } from 'react';
import { uploadVideoAction } from '@/actions/uploadVideoAction';

export default function UploadVideoForm() {
  const [courses, setCourses] = useState([]);
  const [pending, startTransition] = useTransition();

  // Correct: useActionState expects the action with prevState + formData
  const [formState, formAction] = useActionState(uploadVideoAction, {});

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`);
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed", error);
      }
    }
    fetchCourses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    startTransition(() => {
      formAction(form);
    });

    e.target.reset();
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="p-4 w-75 border rounded shadow-sm bg-light">
        <h4 className="mb-3">Upload Course Video</h4>

        <div className="mb-3">
          <label className="form-label">Course</label>
          <select name="courseId" className="form-select" required>
            <option value="">-- Select a Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Video Title</label>
          <input name="title" type="text" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">YouTube ID</label>
          <input name="youtubeId" type="text" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" rows={3}></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? 'Uploading...' : 'Upload Video'}
        </button>

        {formState?.success && (
          <div className="alert alert-success mt-3">Video uploaded successfully!</div>
        )}
        {formState?.error && (
          <div className="alert alert-danger mt-3">{formState.error}</div>
        )}
      </form>
    </div>
  );
}
