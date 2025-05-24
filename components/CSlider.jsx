"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

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
            <div className="card h-100 shadow-sm">
              <img
                src={course.image}
                className="card-img-top"
                alt={course.title}
              />
              <div className="card-body d-flex justify-content-between">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.price == 0 ? 'Free': `PKR. ${course.price}`}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
  )
}

export default CSlider