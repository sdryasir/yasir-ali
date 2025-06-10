"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const reviews = [
  {
    id: 1,
    title: "Excellent",
    text: "Absolutely loved this course! The explanations were clear, and I finally feel confident building real-world projects. Highly recommended for beginners!",
    reviewBy: "Ahmed",
    designation: "Software Engineer",
    stars: 5,
  },
  {
    id: 4,
    title: "Excellent",
    text: "This course helped me land my first freelance job. It teaches not just the theory, but real practical skills. 10/10",
    reviewBy: "Usman Tariq",
    designation: "Software Engineer",
    stars: 5,
  },
  {
    id: 2,
    title: "Good",
    text: "Great content and hands-on examples. I just wish there were more quizzes to test my knowledge. Overall, a fantastic learning experience.",
    reviewBy: "Ali Raza",
    designation: "Web Developer",
    stars: 4,
  },
  {
    id: 3,
    title: "Very Nice",
    text: "One of the best courses I have taken online. The instructor was engaging and always available in the discussion forums. Worth every rupee",
    reviewBy: "Fatima Zahra",
    designation: "FullStack Developer",
    stars: 5,
  },
  {
    id: 5,
    title: "Very Good",
    text: "Your course helped me land my first freelance job. It teaches not just the theory, but real practical skills.",
    reviewBy: "Haya Zahra Ali",
    designation: "Web Developer",
    stars: 4,
  },
];

function Review() {
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
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <p className="card-title course-card-title">{review.title}</p>
                {Array.from({ length: review.stars }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
                <p>{review.text}</p>
                <p className="text-muted fst-italic m-0">{review.reviewBy}</p>
                <p className="text-muted fst-italic m-0 small">
                  {review.designation}
                </p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Review;
