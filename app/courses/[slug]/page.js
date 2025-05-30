"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useSearchParams } from "next/navigation";
import VideoPlaylist from "@/components/VideoPlaylist";
import Image from "next/image";

function page() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");

  // useEffect(() => {
  //   async function fetchCourse() {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${courseId}`);
  //       const data = await res.json();
  //       setCourse(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed fetch @@@", error);

  //     }
  //   }
  //   fetchCourse();
  // }, [courseId]);

  // if (loading) return <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  //     <div className="text-center">
  //       <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
  //         <span className="visually-hidden">Loading...</span>
  //       </div>
  //       <p className="mt-3 fs-5">Please wait while the Courses loads...</p>
  //     </div>
  //   </div>;
  // if (!course) return <div className="container py-4">Course not found.</div>;

  return (
    <div className="course-landing-page">
      <div className="header">
        <div className="container">
          <div className="landing-page-header">
            <h1>Complete Python Course From Beginning to Advance Level</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi, enim asperiores laudantium vitae possimus dolore.
              Aliquam aperiam vero minima fugit optio molestias similique, id,
              ad voluptatibus ipsa nostrum et deleniti.
            </p>
            <div className="rating-wrapper mb-3">
              <div className="b-seller">Best Seller</div>
              <div className="badge">4 ⭐⭐⭐⭐</div>
            </div>
            <div className="badge">
              Created By: <a href="">Yasir Ali</a>
            </div>
            <div className="badge">
              Last Updated: <span>5/2025</span>
            </div>
            <div className="badge">
              Language(s): <span>Urdu</span>
            </div>
            <div className="badge">
              Certificate: <span>Available</span>
            </div>
          </div>
        </div>
      </div>
      <main className="main-area py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="course-objectives border p-4">
                <h2>Course Overview</h2>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Quasi aliquam sapiente minima animi perferendis, quod dolorem
                  delectus voluptas! Laudantium provident quod eius quia,
                  consectetur voluptate facilis voluptates cupiditate cumque id?
                </p>
              </div>
            </div>
            <div className="col-md-4 p-0 sidebar-wrapper">
              <div>
                <div className="sidebar-thumbnail position-relative w-100">
                  <Image
                    src={"/img/python-from-basic-to-advance-1.jpg"}
                    style={{ objectFit: "cover" }}
                    fill
                    alt="course thumbnail"
                  />
                  <div className="overlay">
                    <div className="play-icon">
                      <svg className="pulse-image" width={64} height={64} fill="#ffffff" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 23.7109 37.0469 C 22.6327 37.7031 21.4140 37.1875 21.4140 36.0625 L 21.4140 19.9375 C 21.4140 18.8594 22.7030 18.3906 23.7109 18.9766 L 36.8827 26.7812 C 37.8436 27.3437 37.8671 28.6797 36.8827 29.2656 Z"></path></g></svg>
                    </div>
                  </div>
                </div>
                <div className="sidebar-body border px-3 pb-3">
                  <div>
                    <p className="font-bold text-2xl my-2"></p>
                    <div className="flex">
                      <h3 className="font-bold text-4xl">
                        Free
                        <span className="text-sm line-through opacity-80"></span>
                      </h3>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-action w-100">
                        Start Course
                      </button>
                    </div>
                    <p className="fw-bold mt-4">What you will get:</p>
                    <div className="mt-2 border-bottom pb-4">
                      <div className="d-flex align-items-center">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          t="1569683915274"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs></defs>
                          <path d="M368 724H252V608c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v116H72c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h116v116c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V788h116c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
                          <path d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v352h72V232h576v560H448v72h272c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM888 625l-104-59.8V458.9L888 399v226z"></path>
                          <path d="M320 360c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H208c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h112z"></path>
                        </svg>
                        <p className="m-0 ms-2">
                          5h 1m 30s on-demand video content
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M866.9 169.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 .7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c.2-8.8-6.6-18.3-14.9-21.2zM810 654.3L512 886.5 214 654.3V226.7l298-101.6 298 101.6v427.6zm-405.8-201c-3-4.1-7.8-6.6-13-6.6H336c-6.5 0-10.3 7.4-6.5 12.7l126.4 174a16.1 16.1 0 0 0 26 0l212.6-292.7c3.8-5.3 0-12.7-6.5-12.7h-55.2c-5.1 0-10 2.5-13 6.6L468.9 542.4l-64.7-89.1z"></path>
                        </svg>
                        <p className="m-0 ms-2">Certificate of completion</p>
                      </div>
                    </div>
                    <div className="course-features-wrapper">
                      <div className="course-features">
                        <ul>
                          <li>
                            <div className="icon">
                              <Image src={'/icons/filter.svg'} width={20} height={20} alt="level"/>
                              <span className="ms-3">Level</span>
                            </div>
                            <div className="video-corse-info">
                              <span>Beginners</span>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <Image src={'/icons/screen.svg'} width={20} height={20} alt="level"/>
                              <span className="ms-3">Lectures</span>
                            </div>
                            <div className="video-corse-info">
                              <span>8 Lectures</span>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <Image src={'/icons/time.svg'} width={20} height={20} alt="level"/>
                              <span className="ms-3">Duration</span>
                            </div>
                            <div className="video-corse-info">
                              <span>1h 30m 12s</span>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <Image src={'/icons/language.svg'} width={22} height={22} alt="level"/>
                              <span className="ms-3">Language</span>
                            </div>
                            <div className="video-corse-info">
                              <span>English</span>
                            </div>
                          </li>
                          <li>
                            <div className="icon">
                              <Image src={'/icons/certificate.svg'} width={20} height={20} alt="level"/>
                              <span className="ms-3">Certificate</span>
                            </div>
                            <div className="video-corse-info">
                              <span>Yes</span>
                            </div>
                          </li>
                        </ul>
                        <p className="text-muted">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum libero corporis maxime minima aliquam facilis quod dolorem nobis.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
{
  /* <VideoPlaylist courseId={course._id} /> */
}
