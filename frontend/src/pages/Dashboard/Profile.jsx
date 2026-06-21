import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AuthService from '../../services/AuthService'
import Preloader from '../../components/Common/Preloader'
import { useAuth } from '../../context/AuthContext'
import { FiArrowLeft, FiUser, FiShield, FiActivity, FiSmartphone, FiMonitor, FiCheck, FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  // Mock Activity Logs
  const mockLogs = [
    { id: 1, device: 'Windows 11 - Chrome', ip: '192.168.1.45', location: 'Mumbai, India', date: new Date().toISOString(), status: 'SUCCESS', type: 'DESKTOP' },
    { id: 2, device: 'iOS 16 - Safari', ip: '103.45.67.89', location: 'Delhi, India', date: new Date(Date.now() - 86400000).toISOString(), status: 'SUCCESS', type: 'MOBILE' },
    { id: 3, device: 'Unknown Device - Firefox', ip: '45.12.34.56', location: 'London, UK', date: new Date(Date.now() - 86400000 * 3).toISOString(), status: 'FAILED', type: 'DESKTOP' },
    { id: 4, device: 'Windows 11 - Chrome', ip: '192.168.1.45', location: 'Mumbai, India', date: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'SUCCESS', type: 'DESKTOP' }
  ]

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await AuthService.getProfile()
      setFormData(response.data.data)
    } catch (error) {
      toast.error('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await AuthService.updateProfile(formData)
      updateUser(res.data.data)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleSecurityUpdate = (e, type) => {
    e.preventDefault()
    toast.success(`${type} updated successfully!`)
    e.target.reset()
  }

  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled)
    if (!twoFactorEnabled) {
      toast.success('Two-Factor Authentication Enabled via Authenticator App.')
    } else {
      toast.info('Two-Factor Authentication Disabled.')
    }
  }

  if (loading || !formData) return <Preloader />

  return (
    <div className="container-fluid py-4">
      <div className="d-flex align-items-center mb-4 gap-3">
        <Link to="/customer/dashboard" className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '40px', height: '40px' }}>
          <FiArrowLeft size={20} className="text-dark" />
        </Link>
        <h2 className="mb-0">Profile Settings</h2>
      </div>
      
      <div className="row gy-4">
        {/* Left/Top Navigation & Profile Summary */}
        <div className="col-xl-4 col-lg-5">
          <div className="bg-white rounded-4 shadow-sm p-4 text-center mb-4 border-top border-primary border-4">
            <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '100px', height: '100px', fontSize: '36px', fontWeight: 'bold' }}>
              {formData.firstName?.charAt(0)}{formData.lastName?.charAt(0)}
            </div>
            <h4>{formData.firstName} {formData.lastName}</h4>
            <p className="text-muted mb-3">{formData.email}</p>
            <span className={`badge ${formData.isVerified ? 'bg-success' : 'bg-warning text-dark'} px-3 py-2 fs-6 rounded-pill`}>
              {formData.isVerified ? 'Verified Account' : 'Unverified Account'}
            </span>
            <hr className="my-4" />
            <div className="text-start mb-4">
              <p className="mb-2"><strong className="text-muted small d-block">Role:</strong> {formData.role}</p>
              <p className="mb-0"><strong className="text-muted small d-block">Member Since:</strong> {new Date(formData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-4 shadow-sm p-3 border">
            <div className="nav flex-column nav-pills gap-2" role="tablist" aria-orientation="vertical">
              <button 
                className={`nav-link text-start d-flex align-items-center gap-3 py-3 rounded-3 ${activeTab === 'personal' ? 'active bg-primary' : 'text-dark hover-bg-light'}`}
                onClick={() => setActiveTab('personal')}
              >
                <FiUser size={18} /> Personal Details
              </button>
              <button 
                className={`nav-link text-start d-flex align-items-center gap-3 py-3 rounded-3 ${activeTab === 'security' ? 'active bg-primary' : 'text-dark hover-bg-light'}`}
                onClick={() => setActiveTab('security')}
              >
                <FiShield size={18} /> Security Settings
              </button>
              <button 
                className={`nav-link text-start d-flex align-items-center gap-3 py-3 rounded-3 ${activeTab === 'activity' ? 'active bg-primary' : 'text-dark hover-bg-light'}`}
                onClick={() => setActiveTab('activity')}
              >
                <FiActivity size={18} /> Activity Logs
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="col-xl-8 col-lg-7">
          
          {/* PERSONAL DETAILS TAB */}
          {activeTab === 'personal' && (
            <div className="bg-white rounded-4 shadow-sm p-4 border animate__animated animate__fadeIn">
              <h5 className="mb-4 pb-3 border-bottom d-flex align-items-center gap-2">
                <FiUser className="text-primary" /> Personal Information
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="row gy-4">
                  <div className="col-md-6">
                    <label className="form-label text-muted small">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={formData.firstName || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={formData.lastName || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Email Address</label>
                    <input type="email" className="form-control bg-light" value={formData.email} disabled />
                    <small className="text-muted d-block mt-1">Email cannot be changed directly.</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small">Mobile Number</label>
                    <input type="tel" className="form-control" name="phone" value={formData.phone || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted small">Street Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address || ''} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-muted small">City</label>
                    <input type="text" className="form-control" name="city" value={formData.city || ''} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-muted small">State</label>
                    <input type="text" className="form-control" name="state" value={formData.state || ''} onChange={handleChange} />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-muted small">Zip Code</label>
                    <input type="text" className="form-control" name="zipCode" value={formData.zipCode || ''} onChange={handleChange} />
                  </div>
                  <div className="col-12 mt-4 pt-3 border-top text-end">
                    <button type="submit" className="btn btn-primary px-5" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* SECURITY SETTINGS TAB */}
          {activeTab === 'security' && (
            <div className="row gy-4 animate__animated animate__fadeIn">
              
              <div className="col-12">
                <div className="bg-white rounded-4 shadow-sm p-4 border">
                  <h5 className="mb-4 pb-3 border-bottom d-flex align-items-center gap-2">
                    <FiShield className="text-primary" /> Two-Factor Authentication (2FA)
                  </h5>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-bold">Authenticator App</h6>
                      <p className="small text-muted mb-0">Use an authenticator app (like Google Authenticator) to generate security codes.</p>
                    </div>
                    <div className="form-check form-switch fs-4">
                      <input className="form-check-input" type="checkbox" role="switch" checked={twoFactorEnabled} onChange={toggle2FA} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="bg-white rounded-4 shadow-sm p-4 border">
                  <h5 className="mb-4 pb-3 border-bottom d-flex align-items-center gap-2">
                    <FiShield className="text-primary" /> Change Password
                  </h5>
                  <form onSubmit={(e) => handleSecurityUpdate(e, 'Password')}>
                    <div className="row gy-3">
                      <div className="col-12">
                        <label className="form-label text-muted small">Current Password</label>
                        <input type="password" className="form-control" required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small">New Password</label>
                        <input type="password" className="form-control" required minLength="8" />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-muted small">Confirm New Password</label>
                        <input type="password" className="form-control" required minLength="8" />
                      </div>
                      <div className="col-12 mt-4 text-end">
                        <button type="submit" className="btn btn-primary px-4">Update Password</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-12">
                <div className="bg-white rounded-4 shadow-sm p-4 border">
                  <h5 className="mb-4 pb-3 border-bottom d-flex align-items-center gap-2">
                    <FiShield className="text-primary" /> Security Questions
                  </h5>
                  <form onSubmit={(e) => handleSecurityUpdate(e, 'Security Questions')}>
                    <div className="row gy-3">
                      <div className="col-12">
                        <label className="form-label text-muted small">Question 1</label>
                        <select className="form-select mb-2" required>
                          <option value="">Select a question...</option>
                          <option value="1">What was the name of your first pet?</option>
                          <option value="2">What was your childhood nickname?</option>
                          <option value="3">What city were you born in?</option>
                        </select>
                        <input type="text" className="form-control" placeholder="Answer" required />
                      </div>
                      <div className="col-12 mt-3">
                        <label className="form-label text-muted small">Question 2</label>
                        <select className="form-select mb-2" required>
                          <option value="">Select a question...</option>
                          <option value="4">What is your mother's maiden name?</option>
                          <option value="5">What was the make of your first car?</option>
                          <option value="6">What is your favorite book?</option>
                        </select>
                        <input type="text" className="form-control" placeholder="Answer" required />
                      </div>
                      <div className="col-12 mt-4 text-end">
                        <button type="submit" className="btn btn-primary px-4">Save Questions</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVITY LOGS TAB */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-4 shadow-sm p-4 border animate__animated animate__fadeIn">
              <h5 className="mb-4 pb-3 border-bottom d-flex align-items-center gap-2">
                <FiActivity className="text-primary" /> Login History & Devices
              </h5>
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Device</th>
                      <th>Location & IP</th>
                      <th>Date / Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLogs.map(log => (
                      <tr key={log.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            {log.type === 'MOBILE' ? <FiSmartphone className="text-muted" /> : <FiMonitor className="text-muted" />}
                            <span className="fw-medium small">{log.device}</span>
                          </div>
                        </td>
                        <td>
                          <span className="d-block small fw-medium">{log.location}</span>
                          <span className="d-block small text-muted font-monospace">{log.ip}</span>
                        </td>
                        <td>
                          <span className="d-block small">{new Date(log.date).toLocaleDateString()}</span>
                          <span className="d-block small text-muted">{new Date(log.date).toLocaleTimeString()}</span>
                        </td>
                        <td>
                          {log.status === 'SUCCESS' ? (
                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3"><FiCheck className="me-1" /> Success</span>
                          ) : (
                            <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3"><FiX className="me-1" /> Failed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-3 bg-light rounded text-muted small d-flex gap-2">
                <FiShield className="flex-shrink-0 mt-1" />
                <span>If you notice any suspicious activity, we recommend changing your password immediately and enabling Two-Factor Authentication.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Profile
