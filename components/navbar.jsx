'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar1Icon, UserPlus2Icon } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const { data: session } = useSession()

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="main-navbar">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image src="/logo.png" width={187} height={42} alt="logo" />
          </Link>
          <Link href={'/apply-online'} className='btn text-white d-block d-md-none apply-now-btn'>Apply Now!</Link>
          <button
            onClick={() => setShowMobileMenu(true)}
            className="navbar-toggler"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${showMobileMenu ? 'show' : ''}`} id="navbarSupportedContent">
            <div className={`btn close-btn p-0 ${showMobileMenu ? 'd-block' : 'd-none'}`} onClick={() => setShowMobileMenu(false)}>
              <Image src="/close.svg" width={35} height={35} alt="close" />
            </div>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" href="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" href="/live-trainings">Live trainings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" href="/hire-developer">Hire Developer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom" href="/support-center">Support Center</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  href="/schedule-a-session"
                  className="btn btn-primary btn-action py-2 px-2 d-flex align-items-center rounded-0"
                >
                  <Calendar1Icon />
                  <span className="ms-2 fw-bold">Schedule a Session</span>
                </Link>
              </li>

              {session?.user ? (
                <li className="nav-item dropdown ms-3" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="btn btn-outline-primary dropdown-toggle fw-bold d-flex align-items-center"
                  >
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt="Avatar"
                        width={30}
                        height={30}
                        className="rounded-circle me-2"
                      />
                    ) : (
                      <span className="me-2 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 30, height: 30 }}>
                        {session.user.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                    {session.user.name}
                  </button>
                  {showDropdown && (
                    <ul className="dropdown-menu dropdown-menu-end show" style={{ position: 'absolute' }}>
                      {/* <li><Link className="dropdown-item" href="/dashboard">Dashboard</Link></li> */}
                      <li><Link className="dropdown-item" href="/user-profile">Profile</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={() => signOut({ callbackUrl: '/' })}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <>
                  <li className="nav-item ms-3">
                    <Link href="/auth/login" className="btn btn-outline-secondary py-2 px-3 fw-bold">
                      Log in
                    </Link>
                  </li>
                  <li className="nav-item ms-2">
                    <Link href="/auth/signup" className="btn btn-primary btn-action py-2 px-3 d-flex align-items-center rounded-0">
                      <span className="ms-2 fw-bold">Sign up</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
