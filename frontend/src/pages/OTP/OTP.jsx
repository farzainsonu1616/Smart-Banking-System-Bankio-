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
                <img src="/assets/images/logo.png" alt="Bankio Logo" style={{ height: '50px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
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
