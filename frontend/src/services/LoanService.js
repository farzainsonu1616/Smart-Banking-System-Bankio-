import api from './api'

const LoanService = {
  applyLoan: (data) => api.post('/api/loans/apply', data),
  getLoans: () => api.get('/api/loans'),
  getLoanById: (id) => api.get(`/api/loans/${id}`),
  calculateEmi: (data) => api.post('/api/loans/calculate-emi', data),
}

export default LoanService
