export const dynamic = "force-dynamic";

import Hero from "@/components/hero";
import CourseSlider from "@/components/courseslider";
import CSlider from "@/components/CSlider";
import Review from "@/components/Review";
import { getCategories } from "@/lib/categories";
import Faq from "@/components/Faq";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { Suspense } from "react";

export async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
      cache: 'no-store',
    })

    if (!res.ok) throw new Error("Failed to fetch blogs")
    return res.json()
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }
}

export default async function Home() {
  // const categories = await getCategories(); 
  const [categories, blogs] = await Promise.all([
    getCategories(),
    getBlogs()
  ]); 

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

  const publicCategories = categories?.filter(c => c.status === 'public') || [];

  if (!categories) return <p>Loading categories...</p>;
  if (publicCategories.length === 0) return <p>No categories found.</p>;


  return (
    <>
      <Hero/>
      <div className="container my-5">
      {/* Tabs */}
      <ul className="nav nav-pills flex-wrap" id="categoryTabs" role="tablist">
        {publicCategories.map((category, index) => (
          <li className="nav-item" key={category._id} role="presentation">
            <button
              className={`nav-link rounded-0 ${index === 0 ? 'active' : ''}`}
              id={`tab-${category._id}`}
              data-bs-toggle="tab"
              data-bs-target={`#content-${category._id}`}
              type="button"
              role="tab"
              aria-controls={`content-${category._id}`}
              aria-selected={index === 0}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Tab content */}
      <div className="tab-content mt-4" id="categoryTabContent">
        {publicCategories.map(async (category, index) => {
          const courses = await getCoursesByCategory(category._id);          
          return  <div
            key={category._id}
            className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
            id={`content-${category._id}`}
            role="tabpanel"
            aria-labelledby={`tab-${category._id}`}
          >
            <div className="container py-4" id="courses">
              <h3 className="mb-4">{category.name}</h3>
              {
                <CSlider courses={courses} />
              }
            </div>
          </div>
    })}
      </div>
    </div>
      <Review/>
      <div className="faq-section py-5">
        <Faq/>
      </div>
      <div className="blog-section bg-light py-5">
        <div className="container">
          <div className="section-lead d-flex justify-content-between">
            <h3 className="mb-4 fw-bold">Blogs</h3>
            <Link href={"/blogs"}>View All</Link>
          </div>
          <div className="row">
            <Suspense fallback="Loading...">
              {
                blogs.length ==0 ? <p>No Blogs Found</p>:
                blogs.map((blog,i)=>{
                  return (
                    <div key={i} className="col-md-4">
                      <BlogCard blog={blog}/>
                    </div>
                  )
                })
              }
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
