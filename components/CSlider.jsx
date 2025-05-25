"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

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
        {courses.map((course) => (
          <SwiperSlide key={course._id}>
            <Link  key={course._id} href={{
              pathname: `/courses/${slugify(course.title)}`,
              query: { id: course._id }
            }} style={{textDecoration:'none'}}>
              <div className="card h-100 shadow-sm">
                <div style={{ width: '100%', aspectRatio: '16 / 9', position: 'relative' }}>
                  <Image src={course.thumbnail} alt={course.title} fill style={{ objectFit: 'cover' }} />
                </div>
                  <div className="card-body d-flex justify-content-between">
                    <h5 className="card-title">{course.title}</h5>
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