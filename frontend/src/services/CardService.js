import api from './api'

const CardService = {
  requestCard: (data) => api.post('/api/cards/request', data),
  getCards: () => api.get('/api/cards'),
  getCardById: (id) => api.get(`/api/cards/${id}`),
  blockCard: (id) => api.put(`/api/cards/${id}/block`),
  activateCard: (id) => api.put(`/api/cards/${id}/activate`),
}

export default CardService
