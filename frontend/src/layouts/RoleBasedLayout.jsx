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
              <img src="/assets/images/logo.png" alt="Bankio Logo" style={{ height: '80px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
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

        <div className="px-3 py-3" style={{ borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: 'auto' }}>
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
