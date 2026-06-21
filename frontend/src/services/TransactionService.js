import api from './api'

const TransactionService = {
  deposit: (data) => api.post('/api/transactions/deposit', data),
  withdraw: (data) => api.post('/api/transactions/withdraw', data),
  transfer: (data) => api.post('/api/transactions/transfer', data),
  getHistory: () => api.get('/api/transactions'),
  getById: (id) => api.get(`/api/transactions/${id}`),
  getByAccount: (accountId) => api.get(`/api/transactions/account/${accountId}`),
}

export default TransactionService
