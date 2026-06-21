import api from './api'

const AdminService = {
  getUsers: () => api.get('/api/admin/users'),
  getUserById: (id) => api.get(`/api/admin/users/${id}`),
  approveUser: (id) => api.put(`/api/admin/users/${id}/approve`),
  freezeUser: (id) => api.put(`/api/admin/users/${id}/freeze`),
  getAllAccounts: () => api.get('/api/admin/accounts'),
  getAllLoans: () => api.get('/api/admin/loans'),
  getAllTransactions: () => api.get('/api/admin/transactions'),
  getStats: () => api.get('/api/admin/dashboard/statistics'),
  getContactMessages: () => api.get('/api/contact'),
  markMessageRead: (id) => api.put(`/api/contact/${id}/read`),
  updateLoanStatus: (id, status) => api.put(`/api/loans/${id}/status`, { status }),
}

export default AdminService
