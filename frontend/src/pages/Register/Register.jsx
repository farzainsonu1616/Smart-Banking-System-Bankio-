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
                <img src="/assets/images/logo.png" alt="Bankio Logo" style={{ height: '50px', objectFit: 'contain', mixBlendMode: 'multiply' }} />
              </Link>
              <h4 className="mb-1 mb-md-2 fw-bold text-dark fs-5 fs-md-3">Create an Account</h4>
              <p className="text-muted mb-3 mb-md-4 small">Join Bankio today.</p>
              
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
