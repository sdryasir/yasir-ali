"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Navbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="main-navbar">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" href={"/"}>EasyLearn</Link>
                    <button onClick={()=>setShowMobileMenu(true)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${showMobileMenu? 'show':''}`} id="navbarSupportedContent">
                        <div className={`btn close-btn p-0 ${showMobileMenu?'d-block':'d-none'}`} onClick={()=>setShowMobileMenu(false)}>
                            <Image src={'/close.svg'} width={35} height={35} alt='close'/>
                        </div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                             <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href={"/about"}>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={"/support-center"}>Support Center</Link>
                            </li>
                            {/*<li className="nav-item">
                                <Link className="nav-link" href={'/ai'}>AI</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={'/how-to'}>How to</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={'/what-is'}>What is</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={'/live-classes'}>Live Classes</Link>
                            </li> */}
                        </ul>
                        
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <a
                                    href="https://mentoga.com/yasirali"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-action py-2 px-2 d-flex align-items-center"
                                    >
                                        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M7 4V2.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M17 4V2.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M21.5 9H16.625H10.75M2 9H5.875" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#ffffff"></path> <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#ffffff"></path> <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#ffffff"></path> <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#ffffff"></path> <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#ffffff"></path> <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#ffffff"></path> </g></svg>
                                        <span className='ms-2 fw-bold'>Mentoga Session</span>
                                    </a>
                            </li> */}
                            <li className="nav-item">
                                <a
                                    href="https://calendly.com/sdr-yasir/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary btn-action py-2 px-2 d-flex align-items-center"
                                    >
                                        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C20.1752 21.4816 19.3001 21.7706 18 21.8985" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M7 4V2.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M17 4V2.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M21.5 9H16.625H10.75M2 9H5.875" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M18 17C18 17.5523 17.5523 18 17 18C16.4477 18 16 17.5523 16 17C16 16.4477 16.4477 16 17 16C17.5523 16 18 16.4477 18 17Z" fill="#ffffff"></path> <path d="M18 13C18 13.5523 17.5523 14 17 14C16.4477 14 16 13.5523 16 13C16 12.4477 16.4477 12 17 12C17.5523 12 18 12.4477 18 13Z" fill="#ffffff"></path> <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="#ffffff"></path> <path d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill="#ffffff"></path> <path d="M8 17C8 17.5523 7.55228 18 7 18C6.44772 18 6 17.5523 6 17C6 16.4477 6.44772 16 7 16C7.55228 16 8 16.4477 8 17Z" fill="#ffffff"></path> <path d="M8 13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13C6 12.4477 6.44772 12 7 12C7.55228 12 8 12.4477 8 13Z" fill="#ffffff"></path> </g></svg>
                                        <span className='ms-2 fw-bold'>Schedule a Session</span>
                                    </a>
                            </li>
                        </ul>
                    
                    </div>
                </div>
                </nav>
        </div>
  )
}

export default Navbar