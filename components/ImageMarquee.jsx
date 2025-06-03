'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';

const images = [
  '/img/youtube/1.png',
  '/img/youtube/2.png',
  '/img/youtube/3.png',
  '/img/youtube/4.png',
  '/img/youtube/5.png',
  '/img/youtube/6.png',
  '/img/youtube/7.png',
  '/img/youtube/8.png',
  '/img/youtube/9.png',
  '/img/youtube/10.png',
  '/img/youtube/11.png',
  '/img/youtube/12.png',
  '/img/youtube/13.png',
];

export default function ImageMarquee() {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={'auto'}
      spaceBetween={20}
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={4000}
      grabCursor={true}
      className="w-full"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} style={{ width: 'auto' }}>
          <div className="d-flex align-items-center" style={{ height: '100px' }}>
            <Image
              src={src}
              alt={`Slide ${index}`}
              height={100}
              width={9999} // force auto width
              className="img-fluid"
              style={{ height: '100%', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
