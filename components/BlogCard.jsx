"use client"
import React from 'react';
import SmartImage from './SmartImage';
import Link from 'next/link';
function BlogCard({blog}) {
  return (
    <div>
        <Link href={"#"} style={{textDecoration:'none'}}>
            <div className="card" style={{aspectRatio: '16 / 9'}}>
                <SmartImage 
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    priority
                    objectFit="cover"
                />
                <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default BlogCard