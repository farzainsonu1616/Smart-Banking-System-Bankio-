import api from './api'

const BeneficiaryService = {
  addBeneficiary: (userId, data) => api.post(`/api/accounts/beneficiaries/user/${userId}`, data),
  getBeneficiaries: (userId) => api.get(`/api/accounts/beneficiaries/user/${userId}`),
  deleteBeneficiary: (id) => api.delete(`/api/accounts/beneficiaries/${id}`),
}

export default BeneficiaryService
