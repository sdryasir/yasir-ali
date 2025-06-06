"use client"
import React from 'react';
import SmartImage from './SmartImage';
import Link from 'next/link';
import moment from 'moment';
import { ArrowRight, CalendarClock, User2 } from 'lucide-react';


function BlogCard({blog}) {
  return (
    <div>
        <Link href={`/blogs/${blog.slug}`} style={{textDecoration:'none'}}>
            <div className="card blog-card" style={{aspectRatio: '16 / 9'}}>
                <SmartImage 
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    priority
                    objectFit="cover"
                    style={{borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem',}}
                    className='bd-blog-thumb'
                />
                <div className="card-body" style={{borderBottomLeftRadius:'.5rem', borderBottomRightRadius:'.5rem'}}>
                    <ul className='text-muted d-flex align-items-center gap-2 mb-3 list-unstyled'>
                            <li className='m-0 d-flex align-items-center'>
                                <User2 size={22} color='#07A169'/>
                                <span className='ms-2'>{blog.author?.name}</span>
                            </li>
                            <li>
                                <span className='mx-1'>|</span>
                            </li>
                            <li className='m-0 d-flex align-items-center'>
                                <CalendarClock size={22} color='#07A169'/>
                                <span className='ms-2'>{moment(blog.createdAt).format('MMMM Do YYYY')}</span>
                            </li>
                    </ul>
                    <h5 className="card-title mb-5">{blog.title}</h5>

                    <div className="">Read More<ArrowRight size={24} color='#07A169' /></div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default BlogCard