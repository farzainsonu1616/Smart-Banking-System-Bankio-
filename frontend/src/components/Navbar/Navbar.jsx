import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { FiMenu, FiX, FiUser, FiSun, FiMoon } from 'react-icons/fi'

const Navbar = () => {
  const { isAuthenticated, user, isAdmin } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <>
      <div className={`top-task-bar d-none d-lg-block ${scrolled ? 'd-none' : ''}`} style={{ background: 'var(--primary)', color: 'white', padding: '8px 0', fontSize: '13px', zIndex: 1000, position: 'fixed', width: '100%', top: 0, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center" style={{ overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '70%', padding: '2px 10px', borderRadius: '4px' }}>
             <span className="fw-medium m-0" style={{ fontSize: '13px' }}>
               🚀 Welcome to Bankio. Experience Zero-Fee International Transfers & High-Yield Savings! 🔒
             </span>
          </div>
          <div className="d-flex gap-3 fw-bold">
             <span>📞 1-800-BANKIO</span>
             <span>✉️ hello@bankio.com</span>
          </div>
        </div>
      </div>

      <header className={`header-section ${scrolled ? 'header-fixed' : ''}`} style={{ top: scrolled ? '0' : '40px', transition: 'all 0.3s' }}>
        <div className="container">
        <nav className="navbar navbar-expand-lg">
          <button className="navbar-toggler border-0 order-0" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <Link className="navbar-brand d-flex align-items-center gap-2 order-1 ms-auto order-lg-0 ms-lg-0" to="/">
            <img src="/assets/images/logo.png" alt="Bankio Logo" style={{ height: '45px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </Link>

          <div className={`collapse navbar-collapse order-2 order-lg-1 ${mobileOpen ? 'show' : ''}`}>
            
            {/* Mobile Auth Buttons - Top of Menu */}
            <div className="d-lg-none d-flex flex-column mb-3 pb-3 border-bottom gap-2" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <Link to="/login" className="cmn-btn second w-100 text-center" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/register" className="cmn-btn w-100 text-center" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </div>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/loans">Loans</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            </ul>

            <div className="d-none d-lg-flex align-items-center gap-3 ms-auto profile-btn-desktop">
              <Link to="/login" className="cmn-btn second shadow-sm hover-lift me-2" style={{ borderRadius: '12px', padding: '10px 24px' }}>Sign In</Link>
              <Link to="/register" className="cmn-btn shadow-sm hover-lift" style={{ borderRadius: '12px', padding: '10px 24px' }}>Sign Up</Link>
            </div>
          </div>
        </nav>
      </div>
      </header>
    </>
  )
}

export default Navbar
