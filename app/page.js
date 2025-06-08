export const dynamic = "force-dynamic";

import Hero from "@/components/hero";
import CourseSlider from "@/components/courseslider";
import CSlider from "@/components/CSlider";
import CourseTabs from "@/components/CourseTabs";
import Review from "@/components/Review";
import { getCategories } from "@/lib/commonFunctions";
import Faq from "@/components/Faq";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { Suspense } from "react";
import { faqs } from "@/data/data";



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
  const [categories, blogs] = await Promise.all([
    getCategories(),
    getBlogs()
  ]); 

  

  const publicCategories = categories?.filter(c => c.status === 'public') || [];

  if (!categories) return <p>Loading categories...</p>;
  if (publicCategories.length === 0) return <p>No categories found.</p>;


  return (
    <>
      <Hero/>
      <div className="courses-tab-section sec-space"  style={{"background":"url(/img/tab-section.svg) no-repeat top"}}>
        <div className="container">
          <div className="section-lead d-flex justify-content-between">
              <h3 className="mb-4 fw-bold">Explore Courses</h3>
              <Link href={"/categories"}>View All</Link>
          </div>
          <CourseTabs publicCategories={publicCategories} />
        </div>
      </div>
      <div className="review-section sec-space position-relative">
        <div className="review-inner">
          <Review/>
        </div>
      </div>
      <section className="faq-section sec-space">
        <div className="container">
          <div className="section-lead d-flex justify-content-between">
              <h3 className="mb-4 fw-bold">Frequently Asked Questions</h3>
              <Link href={"/faqs"}>View All</Link>
          </div>
          <Faq faqs={faqs} />
        </div>
      </section>
      <section className="blog-section bg-light sec-space">
        <div className="container">
          <div className="section-lead d-flex justify-content-between">
            <h3 className="mb-4 fw-bold">Latest News & Blogs</h3>
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
      </section>
    </>
  );
}
