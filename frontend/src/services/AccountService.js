import api from './api'

const AccountService = {
  createAccount: (data) => api.post('/api/accounts', data),
  getAccounts: () => api.get('/api/accounts'),
  getAccountById: (id) => api.get(`/api/accounts/${id}`),
  updateAccount: (id, data) => api.put(`/api/accounts/${id}`, data),
}

export default AccountService
