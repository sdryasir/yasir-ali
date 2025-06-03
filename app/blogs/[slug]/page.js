import SmartImage from '@/components/SmartImage';
import React from 'react'
import moment from 'moment';

export async function getBlogBySlug(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`, {
      cache:'no-store',
    })

    if (!res.ok) throw new Error("Failed to fetch blog")
    return res.json()
  } catch (error) {
    console.error("Failed to fetch blog:", error);
  }
}

async function Page({params}) {
  const slug = (await params).slug;
  const blog = await getBlogBySlug(slug);  
  
  return (
    <div className='container mt-5'>
        <h1>{blog[0].title}</h1>
        <div className="author-info  d-flex align-items-center mb-3">
          <div className="avatar me-3" >
              <SmartImage 
                  src={blog[0].author?.url ? blog[0].author?.url: '/img/avatar.jpg'}
                  alt={'Yasir Ali'}
                  priority
                  objectFit="cover"
                  width={40}
                  height={40}
                  style={{borderRadius:'50%'}}
              />
          </div>
          <div className='text-muted'>
              <p className='m-0'>Author: {blog[0].author?.name}</p>
              <p className='m-0'><small>Created: {moment(blog[0].createdAt).format('MMMM Do YYYY')}</small></p>
          </div>
        </div>
        <div style={{aspectRatio: '16 / 9'}}>
            <SmartImage 
            src={blog[0].imageUrl}
            alt={blog[0].title}
            fill
            priority
            objectFit="cover"
        />
        </div>
        <div className='mt-5' dangerouslySetInnerHTML={{ __html: blog[0].content }} />
    </div>
  )
}

export default Page