import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="container">
      
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 pt-5 pb-2 mt-5 border-top">
        
        <div className="col mb-3">
          
          <Link
            href="/"
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
            aria-label="Bootstrap"
          >
            
            <svg className="bi me-2" width="40" height="32" aria-hidden="true">
              
            </svg>
          </Link>
          <p className="text-body-secondary">© 2025 | EasyLearn, Pakistan</p>
        </div>
        <div className="col mb-3"></div>
        <div className="col mb-3">
          
          <h5>About</h5>
          <ul className="nav flex-column">
            
            <li className="nav-item mb-2">
              <Link href={'/'} className="nav-link p-0 text-body-secondary">
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/about'} className="nav-link p-0 text-body-secondary">
                About
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/faqs'} className="nav-link p-0 text-body-secondary">
                FAQs
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/privacy'} className="nav-link p-0 text-body-secondary">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          
          <h5>Quick Links</h5>
          <ul className="nav flex-column">
            
           <li className="nav-item mb-2">
              <Link href={'/about'} className="nav-link p-0 text-body-secondary">
                About
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/faqs'} className="nav-link p-0 text-body-secondary">
                FAQs
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/support-center'} className="nav-link p-0 text-body-secondary">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          
          <h5>Social Links</h5>
          <ul className="nav flex-column">
            
            <li className="nav-item mb-2">
              <a href="https://www.linkedin.com/in/sdryasir/" target="_blank" className="nav-link p-0 text-body-secondary">
                Linkedin
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="https://www.facebook.com/thecodingmaster1" target="_blank" className="nav-link p-0 text-body-secondary">
                Facebook
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="https://github.com/sdryasir" target="_blank" className="nav-link p-0 text-body-secondary">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
