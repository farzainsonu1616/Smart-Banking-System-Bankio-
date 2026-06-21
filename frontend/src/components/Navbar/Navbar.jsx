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
    <header className={`header-section ${scrolled ? 'header-fixed' : ''}`}>
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <button className="navbar-toggler border-0 order-0" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <Link className="navbar-brand d-flex align-items-center gap-2 order-1 ms-auto order-lg-0 ms-lg-0" to="/">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="url(#paint0_linear)" fillOpacity="0.1"/>
              <path d="M20 8L8 15V28C8 29.1046 8.89543 30 10 30H30C31.1046 30 32 29.1046 32 28V15L20 8Z" stroke="url(#paint0_linear)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 22H24" stroke="url(#paint0_linear)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M20 18V26" stroke="url(#paint0_linear)" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="20" cy="18" r="2" fill="url(#paint0_linear)"/>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3B82F6"/>
                  <stop offset="1" stopColor="#8B5CF6"/>
                </linearGradient>
              </defs>
            </svg>
            <span style={{ fontSize: '26px', fontWeight: '800', background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '1px' }}>Bankio</span>
          </Link>

          <div className={`collapse navbar-collapse order-2 order-lg-1 ${mobileOpen ? 'show' : ''}`}>
            
            {/* Mobile Auth Buttons - Top of Menu */}
            <div className="d-lg-none d-flex flex-column mb-3 pb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {isAuthenticated ? (
                <Link to={isAdmin ? '/admin' : '/dashboard'} className="cmn-btn d-flex align-items-center justify-content-center gap-2 w-100" onClick={() => setMobileOpen(false)}>
                  <FiUser /> {user?.firstName || 'Dashboard'}
                </Link>
              ) : (
                <div className="d-flex flex-column gap-2">
                  <Link to="/login" className="cmn-btn second w-100 text-center" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link to="/register" className="cmn-btn w-100 text-center" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </div>
              )}
              <button onClick={toggleTheme} className="btn btn-outline-light mt-3 d-flex align-items-center justify-content-center gap-2">
                {isDarkMode ? <><FiSun /> Light Mode</> : <><FiMoon /> Dark Mode</>}
              </button>
            </div>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/loans">Loans</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
            </ul>

            <div className="d-none d-lg-flex align-items-center gap-3 ms-auto profile-btn-desktop">
              <button onClick={toggleTheme} className="btn text-white fs-5 border-0 bg-transparent p-0 me-2" style={{ color: scrolled ? 'var(--dark)' : 'var(--white)' }}>
                {isDarkMode ? <FiSun color={scrolled ? '#333' : '#fff'} /> : <FiMoon color={scrolled ? '#333' : '#fff'} />}
              </button>
              {isAuthenticated ? (
                <Link to={isAdmin ? '/admin' : '/dashboard'} className="cmn-btn d-flex align-items-center gap-2 shadow-sm hover-lift" style={{ borderRadius: '12px', padding: '10px 24px' }}>
                  <FiUser /> {user?.firstName || 'Dashboard'}
                </Link>
              ) : (
                <>
                  <Link to="/login" className="fw-semibold text-gradient hover-lift me-2">Sign In</Link>
                  <Link to="/register" className="cmn-btn shadow-sm hover-lift" style={{ borderRadius: '12px', padding: '10px 24px' }}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
