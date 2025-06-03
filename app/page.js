export const dynamic = "force-dynamic";

import Hero from "@/components/hero";
import CourseSlider from "@/components/courseslider";
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
  return (
    <>
      <Hero/>
      {!categories ? (
          <p>Loading categories...</p>
        ) : categories?.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          categories?.map((category) => (
              category.status == 'public'? <CourseSlider key={category._id} category={category} />:null
          ))
        )}
      <Review/>
      <div className="faq-section py-5">
        <Faq/>
      </div>
      <div className="blog-section py-5">
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
