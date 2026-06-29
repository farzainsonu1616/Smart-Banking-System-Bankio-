import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi'

const RoleBasedLayout = ({ menuItems, roleName }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-layout">
      {/* Mobile Top Bar */}
      <div className="d-lg-none d-flex justify-content-between align-items-center p-3 w-100" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'fixed', top: 0, zIndex: 1040 }}>
        <h5 className="text-dark mb-0" style={{ fontWeight: '800', background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '1px' }}>Bankio</h5>
        <button className="btn btn-link text-dark p-0 border-0" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      <aside className={`dashboard-sidebar ${mobileOpen ? 'show' : ''}`}>
        <div className="text-center py-3" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <h5 className="text-dark mb-1">
            <NavLink to="/home" style={{ color: '#0f172a', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="10" fill="url(#paint0_linear_sidebar)" fillOpacity="0.1" />
                <path d="M20 8L8 15V28C8 29.1046 8.89543 30 10 30H30C31.1046 30 32 29.1046 32 28V15L20 8Z" stroke="url(#paint0_linear_sidebar)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 22H24" stroke="url(#paint0_linear_sidebar)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 18V26" stroke="url(#paint0_linear_sidebar)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="20" cy="18" r="2" fill="url(#paint0_linear_sidebar)" />
                <defs>
                  <linearGradient id="paint0_linear_sidebar" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3B82F6" />
                    <stop offset="1" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              <span style={{ fontSize: '20px', fontWeight: '800', background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '1px' }}>Bankio</span>
            </NavLink>
          </h5>
          <small className="text-muted fw-medium" style={{ opacity: 0.9 }}>
            {user?.firstName} {user?.lastName}
          </small>
        </div>

        <nav style={{ paddingBottom: '20px', flexGrow: 1, overflowY: 'auto' }}>
          {roleName && (
            <div className="px-4 mb-2">
              <small className="text-muted fw-bold" style={{ opacity: 0.7, letterSpacing: '1px' }}>{roleName.toUpperCase()}</small>
            </div>
          )}
          {menuItems.map(item => (
            <NavLink key={item.path} to={item.path} className="nav-link" end={item.exact} onClick={() => setMobileOpen(false)}>
              {item.icon} {item.label}
            </NavLink>
          ))}

        </nav>

        <div className="px-3 py-3" style={{ position: 'absolute', bottom: 0, width: '100%', background: 'inherit' }}>
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

export default RoleBasedLayout
