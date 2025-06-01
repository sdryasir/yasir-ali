import Link from 'next/link'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../app/api/auth/[...nextauth]/route'
import LogoutButton from '../LogoutButton'

async function Navbar() {
  const session = await getServerSession(authOptions)
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" href={'/dashboard'}>Admin Dashboard</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href={'/dashboard/categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href={'/dashboard/courses'}>Courses</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href={'/dashboard/videos'}>Videos</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href={'/dashboard/blogs'}>Blogs</Link>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item  d-flex align-items-center">
          <Link className="nav-link" aria-current="page" href="#">
            <h6 className='m-0'>Welcome, {session.user.name}</h6>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" href="#">
            <LogoutButton/>
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar