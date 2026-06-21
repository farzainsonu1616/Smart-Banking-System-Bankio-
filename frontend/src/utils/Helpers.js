export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount || 0)
}

export const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

export const formatDateTime = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export const maskCardNumber = (number) => {
  if (!number) return '****'
  return number.replace(/(\d{4})(\w+)(\d{4})/, '$1 **** **** $3')
}

export const maskAccountNumber = (number) => {
  if (!number) return '****'
  return '****' + number.slice(-4)
}

export const calculateEMI = (principal, rate, tenure) => {
  const monthlyRate = rate / 12 / 100
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
              (Math.pow(1 + monthlyRate, tenure) - 1)
  return {
    emi: Math.round(emi),
    totalPayable: Math.round(emi * tenure),
    totalInterest: Math.round(emi * tenure - principal),
  }
}

export const getStatusBadgeClass = (status) => {
  const map = {
    ACTIVE: 'bg-success', COMPLETED: 'bg-info', PENDING: 'bg-warning',
    REJECTED: 'bg-danger', APPROVED: 'bg-success', CLOSED: 'bg-secondary',
    BLOCKED: 'bg-danger', REQUESTED: 'bg-warning', FROZEN: 'bg-danger',
  }
  return map[status] || 'bg-secondary'
}
