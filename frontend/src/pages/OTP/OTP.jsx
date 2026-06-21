import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from '../../services/AuthService'

const OTP = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)

  if (!email) {
    navigate('/register')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!otp || otp.length < 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }
    
    setLoading(true)
    try {
      await AuthService.verifyOtp({ email, otp })
      toast.success('Account verified successfully! You can now login.')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'OTP Verification failed.')
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      await AuthService.resendOtp(email)
      toast.success('A new OTP has been sent to your email.')
    } catch (error) {
      toast.error('Failed to resend OTP.')
    }
  }

  return (
    <section className="sign-in-up d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="form-content text-center">
              <Link to="/home" className="mb-4 d-flex align-items-center justify-content-center gap-2 text-decoration-none">
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
              <h3 className="mb-2">Verify Your Account</h3>
              <p className="text-muted mb-4">We've sent a 6-digit code to <strong>{email}</strong></p>
              
              <form onSubmit={handleSubmit}>
                <div className="single-input text-start">
                  <label>Enter OTP Code</label>
                  <input 
                    type="text" 
                    maxLength="6" 
                    className="form-control text-center fs-4 fw-bold letter-spacing-5" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="000000"
                    required
                  />
                </div>
                
                <button type="submit" className="cmn-btn w-100 mt-4" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify Account'}
                </button>
              </form>
              
              <p className="mt-4 mb-0">
                Didn't receive the code? <button onClick={handleResend} className="btn btn-link text-primary fw-semibold p-0 border-0">Resend Code</button>
              </p>
              <div className="mt-3">
                <Link to="/login" className="text-muted">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OTP
