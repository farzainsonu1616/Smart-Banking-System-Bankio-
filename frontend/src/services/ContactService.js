import api from './api'

const ContactService = {
  submitContact: (data) => api.post('/api/contact', data),
}

export default ContactService
