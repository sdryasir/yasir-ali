import React, { Suspense } from 'react'
import BlogCard from "@/components/BlogCard";
export const dynamic = 'force-dynamic';

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

async function Page() {
    const blogs = await getBlogs();
  return (
    <div className='container mt-5'>
        <h1>Blogs</h1>
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
  )
}

export default Page