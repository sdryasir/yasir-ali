import Link from "next/link";
import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="container">
      
      <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 pt-5 pb-2">
        
        <div className="col-md-5 mb-3">
          
          <Link
            href="/"
            className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
            aria-label="Bootstrap"
          >
            <Image src={'/logo.png'} width={187} height={42} alt='logo' />
          </Link>
          <p><strong>EasyLearn</strong> is a free online learning platform offering high-quality courses to help you grow your skills anytime, anywhere.</p>
          <p>© 2025 | EasyLearn, Pakistan</p>
        </div>
        <div className="col-md-1 mb-1"></div>
        <div className="col-md-2 mb-3">
          
          <h5>About</h5>
          <ul className="nav flex-column">
            
            <li className="nav-item mb-2">
              <Link href={'/'} className="nav-link p-0">
                Home
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/about'} className="nav-link p-0">
                About
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/faqs'} className="nav-link p-0">
                FAQs
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/privacy'} className="nav-link p-0">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-2 mb-3">
          
          <h5>Quick Links</h5>
          <ul className="nav flex-column">
            
           <li className="nav-item mb-2">
              <Link href={'/about'} className="nav-link p-0">
                About
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/faqs'} className="nav-link p-0">
                FAQs
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link href={'/support-center'} className="nav-link p-0">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-2 mb-3">
          
          <h5>Social Links</h5>
          <ul className="nav flex-column">
            
            <li className="nav-item mb-2">
              <a href="https://www.linkedin.com/in/sdryasir/" target="_blank" className="nav-link p-0">
                Linkedin
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="https://www.facebook.com/thecodingmaster1" target="_blank" className="nav-link p-0">
                Facebook
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="https://github.com/sdryasir" target="_blank" className="nav-link p-0">
                GitHub
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="https://www.youtube.com/@SuperCodepk" target="_blank" className="nav-link p-0">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default Footer;
