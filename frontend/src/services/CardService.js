import api from './api'

const CardService = {
  requestCard: (data) => api.post('/api/cards/issue', data),
  getCards: () => api.get('/api/cards'),
  getCardById: (id) => api.get(`/api/cards/${id}`),
  updateCardStatus: (id, status) => api.patch(`/api/cards/${id}/status`, { status }),
}

export default CardService
