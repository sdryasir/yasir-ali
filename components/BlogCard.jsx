"use client"
import React from 'react';
import SmartImage from './SmartImage';
import Link from 'next/link';
import moment from 'moment';


function BlogCard({blog}) {
  return (
    <div>
        <Link href={`/blogs/${blog.slug}`} style={{textDecoration:'none'}}>
            <div className="card" style={{aspectRatio: '16 / 9'}}>
                <SmartImage 
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    priority
                    objectFit="cover"
                />
                <div className="card-body">
                    <h5 className="card-title mb-5">{blog.title}</h5>
                    <div className="blog-detail d-flex align-items-center">
                        <div className="avatar d-flex align-items-center me-2" style={{aspectRatio:'1/1'}}>
                            <SmartImage 
                                src={blog.author?.url ? blog.author?.url: '/img/avatar.jpg'}
                                alt={'Yasir Ali'}
                                priority
                                objectFit="cover"
                                width={40}
                                height={40}
                                style={{borderRadius:'50%'}}
                            />
                        </div>
                        <div className='text-muted'>
                            <p className='m-0'>{blog.author?.name}</p>
                            <p className='m-0'><small>{moment(blog.createdAt).format('MMMM Do YYYY')}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default BlogCard