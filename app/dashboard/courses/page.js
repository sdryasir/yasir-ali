import Link from "next/link";
import Image from "next/image";
import React from "react";
import { revalidatePath } from 'next/cache';
import DeleteButton from "@/components/admin-components/delete-button";
// app/api/courses

async function getCourses() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch courses");
    }

    return res.json();
  } catch (error) {
    console.error("failed fetch courses", error);
  }
}

async function Courses() {
  const courses = await getCourses();

  async function deleteCourse(id) {
      'use server';
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`, {
          method: 'DELETE',
        });
  
        if (!res.ok) {
          const text = await res.text();
          console.log('RESPONSE TEXT:', text);
          throw new Error(`Delete failed: ${res.status}\n${text}`);
        }
  
        revalidatePath('/dashboard/courses');
      } catch (error) {
        console.error("Course deletion failed", error);
      }
    }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <h2>All Courses</h2>
        <Link
          href={"/dashboard/courses/add-course"}
          className="btn btn-success"
        >
          Add Course
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Slug</th>
              <th scope="col">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course, i) => (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{course.title}</td>
                  <td>{course.slug ? course.slug : "No slug"}</td>
                  <td>{course.createdAt}</td>
                  <td>
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        width={100}
                        height={50}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td width={300}>
                    <DeleteButton
                      id={course._id}
                      action={deleteCourse.bind(null, course._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courses;
