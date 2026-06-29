export const API_BASE_URL = 'https://smart-banking-system-bankio-production.up.railway.app'

export const ACCOUNT_TYPES = [
  { value: 'SAVINGS', label: 'Savings Account' },
  { value: 'CHECKING', label: 'Checking Account' },
  { value: 'BUSINESS', label: 'Business Account' },
]

export const LOAN_TYPES = [
  { value: 'PERSONAL', label: 'Personal Loan', rate: '10.50%', maxAmount: '₹50,00,000' },
  { value: 'HOME', label: 'Home Loan', rate: '8.50%', maxAmount: '₹5,00,00,000' },
  { value: 'EDUCATION', label: 'Education Loan', rate: '9.00%', maxAmount: '₹1,00,00,000' },
  { value: 'BUSINESS', label: 'Business Loan', rate: '11.00%', maxAmount: '₹2,00,00,000' },
]

export const CARD_TYPES = [
  { value: 'DEBIT', label: 'Debit Card' },
  { value: 'CREDIT', label: 'Credit Card' },
]

export const CARD_CATEGORIES = [
  { value: 'SECURED', label: 'Secured Card' },
  { value: 'BALANCE_TRANSFER', label: 'Balance Transfer Card' },
  { value: 'TRAVEL', label: 'Travel Rewards Card' },
  { value: 'CASHBACK', label: 'Cashback Card' },
]

export const TRANSACTION_TYPES = {
  DEPOSIT: { label: 'Deposit', color: '#10B981', icon: '↓' },
  WITHDRAWAL: { label: 'Withdrawal', color: '#EF4444', icon: '↑' },
  TRANSFER: { label: 'Transfer', color: '#3B82F6', icon: '⇄' },
}

export const STATUS_COLORS = {
  ACTIVE: 'badge-active',
  COMPLETED: 'badge-completed',
  PENDING: 'badge-pending',
  REJECTED: 'badge-rejected',
  APPROVED: 'badge-active',
  CLOSED: 'badge-completed',
  BLOCKED: 'badge-rejected',
  REQUESTED: 'badge-pending',
  FROZEN: 'badge-rejected',
  INACTIVE: 'badge-rejected',
}
