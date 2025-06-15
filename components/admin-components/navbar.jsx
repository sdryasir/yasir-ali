import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../app/api/auth/[...nextauth]/route'
import LogoutButton from '../LogoutButton'

async function Navbar() {
  const session = await getServerSession(authOptions)
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Hi, {session.user.name} ({session.user.role})</Link>
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <input className="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"/>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Link className="nav-link px-3" href="#"><LogoutButton/></Link>
        </div>
      </div>
    </header>
    // <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //   <div className="container-fluid">
    //     <Link className="navbar-brand" href={'/admin/dashboard'}>Admin Dashboard</Link>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/categories'}>Categories</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/courses'}>Courses</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/videos'}>Videos</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/blogs'}>Blogs</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/yt-comments'}>Comments</Link>
    //         </li>
    //       </ul>
    //       <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
    //         <li className="nav-item  d-flex align-items-center">
    //           <Link className="nav-link" aria-current="page" href="#">
    //             <h6 className='m-0'>Welcome, {session.user.name}</h6>
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" aria-current="page" href="#">
    //             <LogoutButton/>
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  )
}

export default Navbar