import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="footer-section pt-120 pb-120">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h5>Smart Banking</h5>
              <p className="mb-3">Your trusted digital banking partner. Secure, modern, and reliable financial services.</p>
              <div className="social-link">
                <a href="#"><FiFacebook /></a>
                <a href="#"><FiTwitter /></a>
                <a href="#"><FiInstagram /></a>
                <a href="#"><FiLinkedin /></a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h5>Quick Links</h5>
              <ul className="footer-link list-unstyled">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/blogs">Blog</Link></li>
                <li><Link to="/career">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h5>Services</h5>
              <ul className="footer-link list-unstyled">
                <li><Link to="/account">Accounts</Link></li>
                <li><Link to="/loans/personal">Personal Loan</Link></li>
                <li><Link to="/loans/home">Home Loan</Link></li>
                <li><Link to="/cards">Cards</Link></li>
                <li><Link to="/remittance">Remittance</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h5>Contact Info</h5>
              <ul className="footer-link list-unstyled">
                <li>📍 123 Banking Street, Mumbai, India</li>
                <li>📞 +91 98765 43210</li>
                <li>✉️ support@smartbanking.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-5">
          <p className="mb-0">© {new Date().getFullYear()} Smart Banking System. All rights reserved.</p>
          <div className="d-flex gap-3">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-conditions">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
