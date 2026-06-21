import api from './api'

const DashboardService = {
  getSummary: () => api.get('/api/users/summary'),
  getChartData: () => api.get('/api/users/chart-data'),
}

export default DashboardService
