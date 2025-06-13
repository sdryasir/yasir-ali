"use client"
import React, { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, PlayCircle } from 'lucide-react';
import SmartImage from './SmartImage';
import IntroModal from './IntroModal';
function Hero() {
  const coursesRef = useRef(null);

  const scrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="banner-area banner-bg" style={{"backgroundImage":"url(/img/banner_bg.webp)"}}>
        <div className="container py-3 py-md-5">
            <div className="row banner__content">
                <div className="col-lg-6">
                    <div className="my-0 my-md-5 ">
                        <span className="sub-title">
                        <svg id="spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fa6823" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="2" x2="12" y2="6"></line>
                            <line x1="12" y1="18" x2="12" y2="22"></line>
                            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                            <line x1="2" y1="12" x2="6" y2="12"></line>
                            <line x1="18" y1="12" x2="22" y2="12"></line>
                            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                        </svg>
                        Satisfaction Guaranteed 100%
                        </span>
                        <h3 className="title mt-0 mt-md-3" data-aos="fade-right" data-aos-delay="400" style={{'lineHeight': '5px'}}>
                        <div className="d-block display-5 fw-bold">
                        Learn
                        <span className="position-relative title-underline">
                            <span className="svg-icon" id="svg-4180853459" data-svg-icon="/title_shape.svg">
                                <svg className="urup d-none d-md-inline-block" width="100%" height="100%" viewBox="0 0 145 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652" stroke="currentcolor" strokeWidth="4"></path>
                                    <path d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786" stroke="currentcolor" strokeWidth="2"></path>
                                </svg>
                            </span>
                            Skills
                        </span>
                        From
                    </div>
                        <small className="display-6 fw-normal">Premium Short Courses!</small>
                        </h3>
                        <p className="d-none d-md-block mb-5">
                            Learn from our excellent resources and expert courses. We create content that is concise and to the point, save your time and emphasize a practical approach. Therefore, learn by doing, not just by watching.
                        </p>
                        <div className="banner__btn-wrap mt-0 d-flex align-items-center">
                            <div className="tg-button-wrap">
                                <button onClick={scrollToCourses} id="explore" className="btn btn-primary btn-action tg-svg d-flex gap-2 align-items-center p-3 px-4 rounded-0">
                                    <span className="text fw-bold">Explore Courses</span>
                                    <ArrowRight className="icon" size={20} />
                                </button>
                            </div>
                            <div className="banner__phone d-flex gap-3 align-items-center">
                                <IntroModal/>
                                <div className="number-info" style={{cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#introVideoModal">
                                    <svg className="pulse-image-hero" width="48" height="48" fill="#ffffff" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 23.7109 37.0469 C 22.6327 37.7031 21.4140 37.1875 21.4140 36.0625 L 21.4140 19.9375 C 21.4140 18.8594 22.7030 18.3906 23.7109 18.9766 L 36.8827 26.7812 C 37.8436 27.3437 37.8671 28.6797 36.8827 29.2656 Z"></path></g></svg>
                                </div>
                            </div>
                            <div className="active-users-wrapper">
                                <div className="avatar-list d-flex align-items-center">
                                    <ul className='list-unstyled m-0 me-2 d-flex'>
                                        <li className='avatar-list-item m-0'>
                                            <Image src={'/stack-1.webp'} alt='stack-1' width={36} height={36}/>
                                        </li>
                                        <li className='avatar-list-item'>
                                            <Image src={'/stack-2.webp'} alt='stack-1' width={36} height={36}/>
                                        </li>
                                        <li className='avatar-list-item'>
                                            <Image src={'/stack-3.webp'} alt='stack-1' width={36} height={36}/>
                                        </li>
                                        <li className='avatar-list-item'>
                                            <Image src={'/stack-4.webp'} alt='stack-1' width={36} height={36}/>
                                        </li>
                                        <li className='avatar-list-item'>
                                            <Image src={'/stack-5.webp'} alt='stack-1' width={36} height={36}/>
                                        </li>
                                    </ul>
                                    <div className="active-users">
                                        <div className="rating">
                                            <ul className="list-unstyled m-0 d-flex">
                                                <li>
                                                    <Image src={'/star-rating.svg'} alt='star-1' width={14} height={14}/>
                                                </li>
                                                <li>
                                                    <Image src={'/star-rating.svg'} alt='star-1' width={14} height={14}/>
                                                </li>
                                                <li>
                                                    <Image src={'/star-rating.svg'} alt='star-1' width={14} height={14}/>
                                                </li>
                                                <li>
                                                    <Image src={'/star-rating.svg'} alt='star-1' width={14} height={14}/>
                                                </li>
                                                <li>
                                                    <Image src={'/star-rating.svg'} alt='star-1' width={14} height={14}/>
                                                </li>
                                            </ul>
                                        </div>
                                        <p className='m-0 text-muted fw-bold'><small>1.6K+ Learners</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="banner__images d-none d-md-flex" style={{'display':'flex','justifyContent':'end'}}>
                        <div style={{aspectRatio:'1/1', height:'500px', position:'relative'}}>
                            <SmartImage 
                                src="/img/banner-slide1.png"
                                alt="Banner Image"
                                fill
                                priority
                                objectFit="cover"
                            />
                        </div>
                        <Image decoding="async" src="/img/bshape_03.png" alt="shape" className="shape" width={100} height={100} data-aos="fade-down-right" data-aos-delay="1200"/>
                        <Image decoding="async" src="/img/bshape_04.png" alt="shape" className="shape" width={100} height={100} data-aos="fade-up-right" data-aos-delay="1200"/>
                        <Image decoding="async" src="/img/bshape_05.png" alt="shape" className="shape" width={100} height={100} data-aos="fade-down-left" data-aos-delay="1200"/>
                    </div>
                </div>
            </div>
        </div>
        <div ref={coursesRef} id="courses">
        </div>
    </section>
  )
}

export default Hero