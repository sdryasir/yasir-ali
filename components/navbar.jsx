import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="main-navbar">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" href={"/"}>Yasir Ali</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
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