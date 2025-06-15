import React from 'react'
import Link from 'next/link'

function Sidebar() {
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href={'/admin/dashboard'}>
              <span data-feather="home" className="align-text-bottom"></span>
              Dashboard 
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/categories'}>Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/courses'}>Courses</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/videos'}>Videos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/blogs'}>Blogs</Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
          <span>External</span>
          <Link className="link-secondary" href="#" aria-label="Add a new report">
            <span data-feather="plus-circle" className="align-text-bottom"></span>
          </Link>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" href={'/admin/dashboard/yt-comments'}>Comments</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar