import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { FiHome, FiCreditCard, FiDollarSign, FiFileText, FiUsers, FiSettings, FiLogOut, FiGrid, FiPieChart, FiMenu, FiX, FiBell, FiSun, FiMoon } from 'react-icons/fi'

const DashboardLayout = () => {
  const { user, isAdmin, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userMenuItems = [
    { path: '/customer/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/customer/accounts', icon: <FiGrid />, label: 'Accounts' },
    { path: '/customer/transactions', icon: <FiDollarSign />, label: 'Transactions' },
    { path: '/customer/loans', icon: <FiFileText />, label: 'Loans' },
    { path: '/customer/cards', icon: <FiCreditCard />, label: 'Cards' },
    { path: '/customer/notifications', icon: <FiBell />, label: 'Notifications' },
    { path: '/customer/profile', icon: <FiSettings />, label: 'Profile' },
  ]

  const adminMenuItems = [
    { path: '/admin/dashboard', icon: <FiPieChart />, label: 'Admin Dashboard' },
    { path: '/admin/users', icon: <FiUsers />, label: 'Manage Users' },
    { path: '/admin/loans', icon: <FiFileText />, label: 'Manage Loans' },
  ]

  return (
    <div className="dashboard-layout">
      {/* Mobile Top Bar */}
      <div className="d-lg-none d-flex justify-content-between align-items-center p-3 w-100" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'fixed', top: 0, zIndex: 1040 }}>
        <h5 className="text-dark mb-0" style={{ fontWeight: '800', background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '1px' }}>Bankio</h5>
        <div className="d-flex align-items-center gap-3">
          <Link to="/customer/notifications" className="text-dark position-relative">
            <FiBell size={24} />
            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
          </Link>
          <button className="btn btn-link text-dark p-0 border-0" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      <aside className={`dashboard-sidebar ${mobileOpen ? 'show' : ''}`}>
        <div className="text-center py-3 position-relative" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <h5 className="text-dark mb-1">
            <NavLink to="/home" style={{ color: '#0f172a', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="10" fill="url(#paint0_linear_sidebar)" fillOpacity="0.1"/>
                <path d="M20 8L8 15V28C8 29.1046 8.89543 30 10 30H30C31.1046 30 32 29.1046 32 28V15L20 8Z" stroke="url(#paint0_linear_sidebar)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 22H24" stroke="url(#paint0_linear_sidebar)" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M20 18V26" stroke="url(#paint0_linear_sidebar)" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="20" cy="18" r="2" fill="url(#paint0_linear_sidebar)"/>
                <defs>
                  <linearGradient id="paint0_linear_sidebar" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6"/>
                    <stop offset="1" stopColor="#8B5CF6"/>
                  </linearGradient>
                </defs>
              </svg>
              <span style={{ fontSize: '20px', fontWeight: '800', background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '1px' }}>Bankio</span>
            </NavLink>
          </h5>
          
          <div className="d-flex justify-content-center align-items-center gap-2 mt-2">
            <small className="text-muted fw-medium" style={{ opacity: 0.9 }}>
              {user?.firstName} {user?.lastName}
            </small>
            <Link to="/customer/notifications" className="text-dark position-relative" title="Notifications">
              <FiBell size={16} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle" style={{ width: '8px', height: '8px' }}></span>
            </Link>
          </div>
        </div>

        <nav>
          {userMenuItems.map(item => (
            <NavLink key={item.path} to={item.path} className="nav-link" end={item.path === '/customer/dashboard'} onClick={() => setMobileOpen(false)}>
              {item.icon} {item.label}
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <hr style={{ borderColor: 'rgba(0,0,0,0.1)', margin: '16px 24px' }} />
              <small className="d-block px-4 text-muted mb-2 fw-semibold" style={{ opacity: 0.7, letterSpacing: '1px' }}>ADMIN</small>
              {adminMenuItems.map(item => (
                <NavLink key={item.path} to={item.path} className="nav-link" end={item.path === '/admin/dashboard'} onClick={() => setMobileOpen(false)}>
                  {item.icon} {item.label}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="mt-auto px-3 py-3" style={{ position: 'absolute', bottom: 0, width: '100%', background: 'inherit' }}>
          <button onClick={toggleTheme} className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center justify-content-center gap-2 border-0 bg-transparent text-dark opacity-75">
            {isDarkMode ? <><FiSun /> Light Mode</> : <><FiMoon /> Dark Mode</>}
          </button>
          <button onClick={handleLogout} className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-main mt-5 mt-lg-0 pt-4 pt-lg-0">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
