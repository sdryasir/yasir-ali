"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import SmartImage from './SmartImage';
import { ArrowUpRight } from 'lucide-react';
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');

function CSlider({courses}) {
  return (
    <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          576: { slidesPerView: 3 },
          992: { slidesPerView: 3 },
        }}
        observer={true}
        observeParents={true}
      >
        {courses?.map((course) => (
          <SwiperSlide key={course._id}>
            <Link  key={course._id} href={`/courses/${slugify(course.title)}`} style={{textDecoration:'none'}}>
              <div className="card card-course h-100 border-1">
                <div className="overlay-content">
                  <p className='btn btn-action text-white'>View Course <ArrowUpRight className='icon' size={20} /></p>
                  
                </div>
                <div style={{ width: '100%', aspectRatio: '16 / 9', position: 'relative' }}>
                  <SmartImage 
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      priority
                      objectFit="cover"
                  />
                </div>
                  <div className="card-body">
                    <p className="card-title course-card-title">{course.title}</p>
                    <ul className='list-unstyled m-0 p-0 course-card-features'>
                      <li><strong>Duration:</strong> {course.duration} hours</li>
                      <li>
                        <strong>Level:</strong> {course.level}
                      </li>
                      <li>
                        <strong>Language:</strong> Urdu
                      </li>
                      <li>
                        <strong>Author:</strong> Yasir Ali
                      </li>
                    </ul>
                    
                  </div>
                  <div className="card-footer text-body-secondary d-flex justify-content-between">
                    <p className='m-0'><small>Updated: <i>2 days ago</i></small></p>
                    <p className={`card-text fw-bold m-0 ${course.price === 0 ? 'text-danger' : ''}`}>
                      {course.price === 0 ? 'Free' : `PKR. ${course.price}`}
                    </p>
                  </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
  )
}

export default CSlider