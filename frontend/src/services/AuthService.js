import api from './api'

const AuthService = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  verifyOtp: (data) => api.post('/api/auth/verify-otp', data),
  resendOtp: (email) => api.post('/api/auth/resend-otp', { email }),
  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/api/auth/reset-password', data),
  getProfile: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.put('/api/auth/update-profile', data),
}

export default AuthService
