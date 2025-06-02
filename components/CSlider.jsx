"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import SmartImage from './SmartImage';
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');

function CSlider({courses}) {
  return (
    <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 2000 }}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          576: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        }}
      >
        {courses?.map((course) => (
          <SwiperSlide key={course._id}>
            <Link  key={course._id} href={`/courses/${slugify(course.title)}`} style={{textDecoration:'none'}}>
              <div className="card h-100 shadow-sm">
                <div style={{ width: '100%', aspectRatio: '16 / 9', position: 'relative' }}>
                  <SmartImage 
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      priority
                      objectFit="cover"
                  />
                  {/* <Image src={course.thumbnail} alt={course.title} fill style={{ objectFit: 'cover' }} /> */}
                </div>
                  <div className="card-body d-flex justify-content-between">
                    <p className="card-title course-card-title">{course.title}</p>
                    <p className={`card-text fw-bold ${course.price==0 ? 'text-danger':''}`}>{course.price == 0 ? 'Free': `PKR. ${course.price}`}</p>
                  </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
  )
}

export default CSlider