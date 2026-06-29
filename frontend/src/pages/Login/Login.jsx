import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiArrowLeft } from 'react-icons/fi'
import AuthService from '../../services/AuthService'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await AuthService.login(formData)
      const { accessToken, refreshToken, user } = response.data.data
      
      // Use AuthContext login to properly set state for PrivateRoute
      login(accessToken, refreshToken, user)
      
      toast.success('Login successful!')
      
      // Navigate using React Router instead of window.location for SPA behavior
      setTimeout(() => {
        if (user.roles && user.roles.includes('ROLE_CUSTOMER')) {
            navigate('/customer/dashboard')
        } else if (user.roles && user.roles.includes('ROLE_ADMIN')) {
            navigate('/admin/dashboard')
        } else if (user.roles && user.roles.includes('ROLE_MANAGER')) {
            navigate('/manager/dashboard')
        } else if (user.roles && user.roles.includes('ROLE_SUPER_ADMIN')) {
            navigate('/super-admin/dashboard')
        } else {
            navigate('/')
        }
      }, 500)
      
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage === 'Account not verified. Please verify your email first.') {
        toast.error('Account not verified. Please check your email for the OTP or resend it.');
        navigate('/otp', { state: { email: formData.email } });
      } else if (error.response?.data?.data && typeof error.response.data.data === 'object') {
        const validationErrors = Object.values(error.response.data.data).join(' | ');
        toast.error(validationErrors);
      } else {
        toast.error(errorMessage || 'Login failed. Please check your credentials.');
      }
      setLoading(false);
    }
  }

  return (
    <section className="sign-in-up d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="form-content text-center position-relative">
              <div className="text-start mb-4">
                <Link to="/" className="text-muted text-decoration-none d-inline-flex align-items-center hover-lift">
                  <FiArrowLeft className="me-2" /> Back to Home
                </Link>
              </div>
              <Link to="/" className="mb-4 d-flex align-items-center justify-content-center gap-2 text-decoration-none">
                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <span style={{ fontSize: '36px', fontWeight: '800', background: 'linear-gradient(45deg, #60A5FA, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '1.5px' }}>Bankio</span>
              </Link>
              <h3 className="mb-2">Welcome Back!</h3>
              <p className="text-muted mb-4">Sign in to your Smart Banking account</p>
              
              <form onSubmit={handleSubmit} className="text-start">
                <div className="single-input">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="single-input">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="password">Password</label>
                    <Link to="/forgot-password" className="text-primary small fw-semibold">Forgot Password?</Link>
                  </div>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    required 
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="cmn-btn w-100 mt-3" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
              
              <p className="mt-4 mb-0">
                Don't have an account? <Link to="/register" className="text-primary fw-semibold">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
