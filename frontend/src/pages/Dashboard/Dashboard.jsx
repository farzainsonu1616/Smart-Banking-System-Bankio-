import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiArrowDownCircle, FiArrowUpCircle, FiFileText, FiSend, FiUmbrella, FiCreditCard, FiDownload, FiAlertCircle, FiActivity, FiLink, FiShield } from 'react-icons/fi'
import { toast } from 'react-toastify'
import StatCard from '../../components/DashboardWidgets/StatCard'
import ChartWidget from '../../components/DashboardWidgets/ChartWidget'
import TransactionTable from '../../components/DashboardWidgets/TransactionTable'
import { formatCurrency } from '../../utils/Helpers'
import Preloader from '../../components/Common/Preloader'
import { useAuth } from '../../context/AuthContext'
import AccountService from '../../services/AccountService'
import TransactionService from '../../services/TransactionService'
import LoanService from '../../services/LoanService'

const Dashboard = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [bankDetails, setBankDetails] = useState({ accountNumber: '', ifscCode: '', accountType: 'Savings' })

  const [stats, setStats] = useState({
    totalBalance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    activeLoans: 0
  })

  const [transactions, setTransactions] = useState([])
  const [accountSummary, setAccountSummary] = useState(null)
  const [notifications, setNotifications] = useState([])
  
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Income', data: [0, 0, 0, 0, 0, 0], backgroundColor: '#10B981' },
      { label: 'Expenses', data: [0, 0, 0, 0, 0, 0], backgroundColor: '#EF4444' }
    ]
  })

  const [spendingData, setSpendingData] = useState({
    labels: ['Transfers', 'Withdrawals'],
    datasets: [{ data: [0, 0], backgroundColor: ['#3B82F6', '#EF4444'], borderWidth: 0 }]
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [accountsRes, txRes, loansRes] = await Promise.all([
        AccountService.getAccounts(),
        TransactionService.getHistory(),
        LoanService.getLoans().catch(() => ({ data: { data: [] } }))
      ])

      const accounts = accountsRes.data?.data || []
      const txs = txRes.data?.data || []
      const loans = loansRes.data?.data || []

      // Calculate total balance across all accounts
      const totalBalance = accounts.reduce((acc, curr) => acc + (curr.balance || 0), 0)
      
      // Calculate deposits and withdrawals from history
      let totalDeposits = 0
      let totalWithdrawals = 0
      let totalTransfersOut = 0

      txs.forEach(tx => {
        if (tx.type === 'DEPOSIT') totalDeposits += tx.amount
        if (tx.type === 'WITHDRAWAL') totalWithdrawals += tx.amount
        if (tx.type === 'TRANSFER_OUT') totalTransfersOut += tx.amount
      })
      
      const activeLoansCount = loans.filter(l => l.status === 'ACTIVE' || l.status === 'APPROVED').length

      setStats({
        totalBalance,
        totalDeposits,
        totalWithdrawals,
        activeLoans: activeLoansCount
      })

      setTransactions(txs)
      
      // Generate some dynamic notifications based on latest transactions
      const recentTxNotifications = txs.slice(0, 3).map(tx => ({
        id: tx.id,
        title: `${tx.type === 'DEPOSIT' || tx.type === 'TRANSFER_IN' ? 'Received' : 'Sent'} ${formatCurrency(tx.amount)}`,
        time: new Date(tx.timestamp).toLocaleDateString(),
        icon: <FiAlertCircle className="text-primary fs-4" />
      }))
      
      if (recentTxNotifications.length === 0) {
        recentTxNotifications.push({ id: 0, title: 'Welcome to Smart Banking!', time: 'Just now', icon: <FiAlertCircle className="text-primary fs-4" /> })
      }
      setNotifications(recentTxNotifications)

      // Set Spending Data
      setSpendingData({
        labels: ['Transfers', 'Withdrawals'],
        datasets: [{ data: [totalTransfersOut, totalWithdrawals], backgroundColor: ['#3B82F6', '#EF4444'], borderWidth: 0 }]
      })

      // Set Chart Data (mocked distribution over 6 months based on actual totals for demo)
      setChartData({
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        datasets: [
          { label: 'Income', data: [totalDeposits * 0.1, totalDeposits * 0.2, totalDeposits * 0.15, totalDeposits * 0.25, totalDeposits * 0.1, totalDeposits * 0.2], backgroundColor: '#10B981' },
          { label: 'Expenses', data: [totalWithdrawals * 0.15, totalWithdrawals * 0.1, totalWithdrawals * 0.2, totalWithdrawals * 0.2, totalWithdrawals * 0.25, totalWithdrawals * 0.1], backgroundColor: '#EF4444' }
        ]
      })

      if (accounts.length > 0) {
        setAccountSummary({
          accountNumber: accounts[0].accountNumber,
          ifsc: accounts[0].ifscCode || 'BNKO0001234',
          branch: 'Main Branch',
          accountType: accounts[0].accountType || 'Savings',
          balance: accounts[0].balance || 0
        })
      } else {
        setShowConnectModal(true)
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleConnectBank = async (e) => {
    e.preventDefault()
    setConnecting(true)
    try {
      await AccountService.createAccount({
        accountNumber: bankDetails.accountNumber,
        ifscCode: bankDetails.ifscCode,
        accountType: bankDetails.accountType,
        balance: Math.floor(Math.random() * 50000) + 1000 // simulate existing bank balance
      })
      toast.success('Bank account successfully connected and verified!')
      setShowConnectModal(false)
      fetchDashboardData()
    } catch (error) {
      toast.error('Failed to connect bank account. Please check details.')
    } finally {
      setConnecting(false)
    }
  }

  if (loading) return <Preloader />

  const userName = user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Customer'

  return (
    <div className="container-fluid py-4">
      {/* Welcome Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Welcome back, {userName}!</h2>
          <p className="text-muted mb-0">Here's a summary of your accounts and recent activities.</p>
        </div>
      </div>

      {/* Top Statistics Cards */}
      <div className="row gy-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <StatCard 
            icon={<FiBriefcase />} 
            title="Total Balance" 
            value={formatCurrency(stats.totalBalance)} 
            color="primary" 
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard 
            icon={<FiArrowDownCircle />} 
            title="Total Deposits" 
            value={formatCurrency(stats.totalDeposits)} 
            color="success" 
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard 
            icon={<FiArrowUpCircle />} 
            title="Total Withdrawals" 
            value={formatCurrency(stats.totalWithdrawals)} 
            color="danger" 
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard 
            icon={<FiFileText />} 
            title="Active Loans" 
            value={stats.activeLoans} 
            color="warning" 
          />
        </div>
      </div>

      <div className="row gy-4 mb-4">
        {/* Left Column (Chart, Quick Actions, Profile, Notifications) */}
        <div className="col-xl-8">
          
          {/* Quick Actions */}
          <h5 className="mb-3">Quick Actions</h5>
          <div className="row gy-3 mb-4">
            <div className="col-6 col-md-3">
              <Link to="/customer/transfer-money" className="text-decoration-none">
                <div className="bg-white p-3 rounded-3 shadow-sm text-center action-card h-100 border border-light">
                  <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '48px', height: '48px' }}>
                    <FiSend className="fs-4" />
                  </div>
                  <h6 className="mb-0 text-dark small fw-bold">Transfer Money</h6>
                </div>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/customer/loan-application" className="text-decoration-none">
                <div className="bg-white p-3 rounded-3 shadow-sm text-center action-card h-100 border border-light">
                  <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '48px', height: '48px' }}>
                    <FiUmbrella className="fs-4" />
                  </div>
                  <h6 className="mb-0 text-dark small fw-bold">Apply Loan</h6>
                </div>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/customer/card-request" className="text-decoration-none">
                <div className="bg-white p-3 rounded-3 shadow-sm text-center action-card h-100 border border-light">
                  <div className="bg-info bg-opacity-10 text-info rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '48px', height: '48px' }}>
                    <FiCreditCard className="fs-4" />
                  </div>
                  <h6 className="mb-0 text-dark small fw-bold">Request Card</h6>
                </div>
              </Link>
            </div>
            <div className="col-6 col-md-3">
              <Link to="/customer/statements" className="text-decoration-none">
                <div className="bg-white p-3 rounded-3 shadow-sm text-center action-card h-100 border border-light">
                  <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '48px', height: '48px' }}>
                    <FiDownload className="fs-4" />
                  </div>
                  <h6 className="mb-0 text-dark small fw-bold">Statement</h6>
                </div>
              </Link>
            </div>
          </div>

          {/* Charts Row */}
          <div className="row gy-4 mb-4">
            <div className="col-md-7">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100">
                <h5 className="mb-4">Monthly Transaction History</h5>
                <div style={{ height: '300px' }}>
                  <ChartWidget type="bar" data={chartData} />
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100">
                <h5 className="mb-4">Spending Analysis</h5>
                <div style={{ height: '300px' }}>
                  <ChartWidget type="doughnut" data={spendingData} />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion & Activities */}
          <div className="row gy-4">
            <div className="col-md-6">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100">
                <h5 className="mb-4">Profile Completion</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold text-muted">Complete your profile</span>
                  <span className="fw-bold text-primary">100%</span>
                </div>
                <div className="progress mb-3" style={{ height: '10px' }}>
                  <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="text-muted small mb-0">Your KYC is fully verified and your account is completely active.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Activity Tracking</h5>
                  <Link to="/customer/profile" className="text-decoration-none small text-primary fw-semibold">View Logs</Link>
                </div>
                <div className="d-flex flex-column gap-3">
                  {transactions.slice(0, 4).map(activity => (
                    <div key={activity.id} className="d-flex align-items-start gap-3 border-bottom pb-2">
                      <div className="flex-shrink-0 mt-1 text-primary">
                        <FiActivity />
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-medium small">New Transaction: {activity.type}</p>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{new Date(activity.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  {transactions.length === 0 && <p className="text-muted small">No recent activity.</p>}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column (Account Summary, Notifications & Recent Transactions) */}
        <div className="col-xl-4 d-flex flex-column gap-4">
          
          {/* Account Summary Card */}
          <div className="card border-0 shadow-sm rounded-4" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)', color: 'white' }}>
            <div className="card-body p-4 position-relative overflow-hidden">
              <div className="position-absolute opacity-10" style={{ right: '-20px', top: '-20px' }}>
                <FiBriefcase size={120} />
              </div>
              <h5 className="text-white opacity-75 mb-1">Account Summary</h5>
              <h3 className="text-white fw-bold mb-4">{formatCurrency(accountSummary?.balance || 0)}</h3>
              
              <div className="mb-3">
                <span className="text-white opacity-75 d-block small">Account Number</span>
                <span className="fw-semibold letter-spacing-2">{accountSummary?.accountNumber || 'Create an account to begin'}</span>
              </div>
              
              <div className="row g-2 mb-0">
                <div className="col-6">
                  <span className="text-white opacity-75 d-block small">IFSC Code</span>
                  <span className="fw-semibold">{accountSummary?.ifsc || '-'}</span>
                </div>
                <div className="col-6">
                  <span className="text-white opacity-75 d-block small">Account Type</span>
                  <span className="fw-semibold">{accountSummary?.accountType || '-'}</span>
                </div>
                <div className="col-12 mt-2">
                  <span className="text-white opacity-75 d-block small">Branch</span>
                  <span className="fw-semibold">{accountSummary?.branch || '-'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-3 shadow-sm p-4 flex-grow-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Notifications</h5>
              <Link to="/customer/notifications" className="text-decoration-none small text-primary fw-semibold">View All</Link>
            </div>
            <div className="d-flex flex-column gap-3">
              {notifications.map(notification => (
                <div key={notification.id} className="d-flex align-items-center gap-3 border-bottom pb-2">
                  <div className="flex-shrink-0">
                    {notification.icon}
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0 fw-medium small">{notification.title}</p>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-3 shadow-sm p-4 flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Recent Transactions</h5>
              <Link to="/customer/transactions" className="text-decoration-none small text-primary fw-semibold">View All</Link>
            </div>
            <TransactionTable transactions={transactions} limit={5} />
          </div>

        </div>
      </div>

      {/* Connect Bank Account Modal */}
      {showConnectModal && (
        <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1050, backdropFilter: 'blur(5px)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
          <div className="card border-0 shadow-lg rounded-4" style={{ width: '100%', maxWidth: '450px', zIndex: 1051, overflow: 'hidden' }}>
            <div className="card-header border-0 text-white p-4" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>
              <div className="text-center">
                <div className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '60px', height: '60px' }}>
                  <FiLink size={28} />
                </div>
                <h4 className="fw-bold mb-1">Connect Your Bank</h4>
                <p className="mb-0 text-white-50 small">Securely link your existing bank account to Bankio.</p>
              </div>
            </div>
            <div className="card-body p-4 bg-light">
              <div className="d-flex align-items-center gap-2 mb-4 p-3 bg-white rounded-3 border text-muted small">
                <FiShield className="text-success fs-4" />
                <span>Your data is encrypted and securely processed using bank-grade 256-bit encryption.</span>
              </div>
              <form onSubmit={handleConnectBank}>
                <div className="mb-3">
                  <label className="form-label fw-semibold small">Account Number</label>
                  <input type="text" className="form-control p-2" placeholder="e.g. 000123456789" required value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value.replace(/\\D/g, '')})} />
                </div>
                <div className="row g-3 mb-4">
                  <div className="col-6">
                    <label className="form-label fw-semibold small">IFSC Code</label>
                    <input type="text" className="form-control p-2 text-uppercase" placeholder="e.g. HDFC0001" required value={bankDetails.ifscCode} onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value.toUpperCase()})} />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-semibold small">Account Type</label>
                    <select className="form-select p-2" value={bankDetails.accountType} onChange={(e) => setBankDetails({...bankDetails, accountType: e.target.value})}>
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-pill shadow-sm" disabled={connecting}>
                  {connecting ? 'Verifying Details...' : 'Securely Connect Account'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard
