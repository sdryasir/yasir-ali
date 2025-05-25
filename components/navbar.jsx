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
                    <Link className="navbar-brand" href={"/"}>Yasir Ali</Link>
                    <button onClick={()=>setShowMobileMenu(true)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${showMobileMenu? 'show':''}`} id="navbarSupportedContent">
                        <div className={`btn close-btn ${showMobileMenu?'d-block':'d-none'}`} onClick={()=>setShowMobileMenu(false)}>
                            <Image src={'/close.svg'} width={65} height={65} alt='close'/>
                        </div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href={"/programming"}>Programming</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href={"/web"}>Web Design</Link>
                            </li>
                            <li className="nav-item">
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
                            </li>
                        </ul>
                        
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" href={'/about'}>About</Link>
                            </li>
                        </ul>
                    
                    </div>
                </div>
                </nav>
        </div>
  )
}

export default Navbar