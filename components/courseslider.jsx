import React from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CSlider from "./CSlider";

async function getCoursesByCategory(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/category/${id}`,{
          next: {
            revalidate: 3600, // 1 hour
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch categories");

      return res.json();
  } catch (error) {
    console.error("Failed", error);
    
  }
}

export default async function CourseSlider({ category }) {

  const courses = await getCoursesByCategory(category._id)

  return (
    <div className="container py-5" id="courses">
      <h3 className="mb-4">{category.name}</h3>
      {!courses ? (
          <p>Loading courses...</p>
        ) : courses?.length === 0 ? (
          <p>No Course found.</p>
        ) : (
          <CSlider courses={courses} />
        )}
      
    </div>
  );
}
