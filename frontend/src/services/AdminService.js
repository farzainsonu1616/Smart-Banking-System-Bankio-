import api from './api'

const AdminService = {
  // User management
  getUsers: () => api.get('/api/admin/users'),
  getUserById: (id) => api.get(`/api/admin/users/${id}`),
  approveUser: (id) => api.put(`/api/admin/users/${id}/approve`),
  freezeUser: (id) => api.put(`/api/admin/users/${id}/freeze`),
  activateUser: (id) => api.put(`/api/admin/users/${id}/activate`),
  deactivateUser: (id) => api.put(`/api/admin/users/${id}/deactivate`),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),

  // Dashboard
  getStats: () => api.get('/api/admin/dashboard/statistics'),

  // Loans
  getAllLoans: () => api.get('/api/admin/loans'),
  updateLoanStatus: (id, status) => api.patch(`/api/loans/${id}/status`, { status }),

  // Transactions
  getAllTransactions: () => api.get('/api/admin/transactions'),

  // Reports
  getReports: () => api.get('/api/admin/reports'),

  // Accounts
  getAllAccounts: () => api.get('/api/admin/accounts'),

  // Contact
  getContactMessages: () => api.get('/api/contact'),
  markMessageRead: (id) => api.put(`/api/contact/${id}/read`),
}

export default AdminService
