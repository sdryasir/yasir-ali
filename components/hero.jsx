import React from 'react'
import Image from 'next/image'
function Hero() {
  return (
    <section className="banner-area banner-bg" style={{"background-image":"url(/img/banner_bg.jpg)"}}>
        <div className="container py-3 py-md-5">
            <div className="row banner__content">
                <div className="col-lg-6">
                    <div className="my-0 my-md-5 ">
                        <span className="sub-title p-3 px-4 rounded-4">
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
                        <span className="position-relative">
                            <span className="svg-icon" id="svg-4180853459" data-svg-icon="https://ifingerstudio.com/eduvalt/wp-content/themes/eduvalt/assets/img/icons/title_shape.svg">
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
                        <p data-aos="fade-right" data-aos-delay="600" className="d-none d-md-block">
                            Learn from our excellent resources and expert courses. We create content that is concise and to the point, save your time and emphasize a practical approach. Therefore, learn by doing, not just by watching.
                        </p>
                        <div className="banner__btn-wrap mt-0" data-aos="fade-right" data-aos-delay="800">
                        <div className="tg-button-wrap">
                            <button id="explore" className="btn btn-primary btn-action tg-svg d-flex gap-2 align-items-center p-3 px-4 rounded-2">
                                <span className="text">Explore Courses</span>
                                <span className="svg-icon" id="svg-14180853459" data-svg-icon="assets/img/btn-arrow.svg">
                                    <svg width="100%" height="100%" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.6249 6.81239H1.00011M12.6249 6.81239L7.78123 1.96873M12.6249 6.81239L7.78123 11.656" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className="banner__phone d-flex gap-3 align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1363df" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <div className="number-info">
                                <span>Have a question?</span>
                                <h6 className="number"><a href="https://wa.me/923185048329">+923185045329</a></h6>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="banner__images d-none d-md-flex" style={{'display':'flex','justify-content':'end'}}>
                        <Image data-aos="fade-left" src="/img/1.png" alt="img" className="main-img" width={400} height={550} style={{'max-width': '450px'}}/>
                        <Image decoding="async" src="/img/bshape_03.png" alt="shape" className="shape" width={100} height={100} data-aos="fade-down-right" data-aos-delay="1200"/>
                        <Image decoding="async" src="/img/bshape_04.png" alt="shape" className="shape" width={100} height={100} data-aos="fade-up-right" data-aos-delay="1200"/>
                        <Image decoding="async" src="/img/bshape_05.png" alt="shape" className="shape" width={100} height={100} data-aos="fade-down-left" data-aos-delay="1200"/>

                        <div className="banner__fact">
                        <div className="banner__fact-item">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                            </div>
                            <div className="info">
                                <span>Total Students</span>
                                <h4 className="count">2756</h4>
                            </div>
                        </div>
                        <div className="banner__fact-item">
                            <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                        </div>
                            <div className="info">
                                <span>Total Courses</span>
                                <h4 className="count">206</h4>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Hero