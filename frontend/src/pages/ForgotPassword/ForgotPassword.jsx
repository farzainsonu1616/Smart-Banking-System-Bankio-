import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthService from '../../services/AuthService'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await AuthService.forgotPassword(email)
      toast.success('Password reset OTP sent to your email.')
      setStep(2)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!otp || !newPassword) {
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try {
      await AuthService.resetPassword({ email, otp, newPassword })
      toast.success('Password reset successfully! You can now login.')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="sign-in-up d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="form-content text-center">
              <Link to="/" className="mb-4 d-inline-block">
                <img src="/assets/images/logo.png" alt="Logo" style={{ maxHeight: '40px' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="font-size:24px;font-weight:800;color:#1A4DBE">Bankio</span>' }} />
              </Link>
              <h3 className="mb-2">Reset Password</h3>
              <p className="text-muted mb-4">
                {step === 1 ? "Enter your email to receive a password reset OTP." : "Enter the OTP sent to your email and your new password."}
              </p>
              
              {step === 1 ? (
                <form onSubmit={handleRequestOtp} className="text-start">
                  <div className="single-input">
                    <label>Email Address</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered email" />
                  </div>
                  <button type="submit" className="cmn-btn w-100 mt-4" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset OTP'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="text-start">
                  <div className="single-input">
                    <label>OTP Code</label>
                    <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit OTP" />
                  </div>
                  <div className="single-input mt-3">
                    <label>New Password</label>
                    <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" />
                  </div>
                  <button type="submit" className="cmn-btn w-100 mt-4" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </form>
              )}
              
              <div className="mt-4">
                <Link to="/login" className="text-muted">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword
