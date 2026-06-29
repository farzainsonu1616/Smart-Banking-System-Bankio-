import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiArrowLeft } from 'react-icons/fi'
import AuthService from '../../services/AuthService'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    
    setLoading(true)
    try {
      await AuthService.register(formData)
      toast.success('Registration successful! Please verify OTP.')
      navigate('/otp', { state: { email: formData.email } })
    } catch (error) {
      if (error.response?.data?.data && typeof error.response.data.data === 'object') {
        const validationErrors = Object.values(error.response.data.data).join(' | ');
        toast.error(validationErrors);
      } else {
        toast.error(error.response?.data?.message || 'Registration failed.');
      }
      setLoading(false);
    }
  }

  return (
    <section className="sign-in-up d-flex align-items-center justify-content-center" style={{ height: '100dvh', overflow: 'hidden', padding: '10px 0' }}>
      <div className="container h-100 d-flex flex-column justify-content-center">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="form-content text-center position-relative p-3 p-md-5 mx-2 mx-md-0" style={{ maxHeight: '100dvh', overflowY: 'auto' }}>
              <div className="text-start mb-2 mb-md-4">
                <Link to="/" className="text-muted text-decoration-none d-inline-flex align-items-center small hover-lift">
                  <FiArrowLeft className="me-2" /> Back to Home
                </Link>
              </div>
              <Link to="/" className="mb-2 mb-md-4 d-flex align-items-center justify-content-center gap-2 text-decoration-none">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="d-none d-sm-block">
                  <rect width="40" height="40" rx="10" fill="url(#paint0_linear_auth)" fillOpacity="0.15"/>
                  <path d="M20 8L8 15V28C8 29.1046 8.89543 30 10 30H30C31.1046 30 32 29.1046 32 28V15L20 8Z" stroke="url(#paint0_linear_auth)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 22H24" stroke="url(#paint0_linear_auth)" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M20 18V26" stroke="url(#paint0_linear_auth)" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="20" cy="18" r="2" fill="url(#paint0_linear_auth)"/>
                  <defs>
                    <linearGradient id="paint0_linear_auth" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#60A5FA"/>
                      <stop offset="1" stopColor="#A78BFA"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: '800', background: 'linear-gradient(45deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '1px' }}>Bankio</span>
              </Link>
              <h4 className="mb-1 mb-md-2 fw-bold text-dark fs-5 fs-md-3">Create an Account</h4>
              <p className="text-muted mb-3 mb-md-4 small">Join Smart Banking today.</p>
              
              <form onSubmit={handleSubmit} className="text-start">
                <div className="row g-2 g-md-3">
                  <div className="col-6">
                    <div className="single-input mb-0">
                      <label htmlFor="firstName" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>Name</label>
                      <input type="text" id="firstName" name="firstName" required value={formData.firstName} onChange={handleChange} style={{ padding: '8px 12px', height: 'auto', fontSize: '0.9rem' }} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="single-input mb-0">
                      <label htmlFor="phone" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>Phone</label>
                      <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} style={{ padding: '8px 12px', height: 'auto', fontSize: '0.9rem' }} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input mb-0">
                      <label htmlFor="email" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>Email Address</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} style={{ padding: '8px 12px', height: 'auto', fontSize: '0.9rem' }} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="single-input mb-0">
                      <label htmlFor="password" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>Password</label>
                      <input type="password" id="password" name="password" required value={formData.password} onChange={handleChange} style={{ padding: '8px 12px', height: 'auto', fontSize: '0.9rem' }} />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="single-input mb-0">
                      <label htmlFor="confirmPassword" style={{ fontSize: '0.8rem', marginBottom: '4px' }}>Confirm Password</label>
                      <input type="password" id="confirmPassword" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} style={{ padding: '8px 12px', height: 'auto', fontSize: '0.9rem' }} />
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="cmn-btn w-100 mt-3 py-2" disabled={loading} style={{ borderRadius: '50px' }}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </form>
              
              <p className="mt-3 mb-0 small text-muted">
                Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
