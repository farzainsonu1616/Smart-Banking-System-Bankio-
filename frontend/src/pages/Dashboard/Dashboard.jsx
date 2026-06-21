import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiBriefcase, FiArrowDownCircle, FiArrowUpCircle, FiFileText, FiSend, FiUmbrella, FiCreditCard, FiDownload, FiAlertCircle, FiActivity } from 'react-icons/fi'
import StatCard from '../../components/DashboardWidgets/StatCard'
import ChartWidget from '../../components/DashboardWidgets/ChartWidget'
import TransactionTable from '../../components/DashboardWidgets/TransactionTable'
import { formatCurrency } from '../../utils/Helpers'
import Preloader from '../../components/Common/Preloader'
import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  // Realistic Mock Data
  const mockStats = {
    totalBalance: 450000,
    totalDeposits: 125000,
    totalWithdrawals: 45000,
    activeLoans: 1
  }

  const mockTransactions = [
    { id: 1, transactionDate: '2026-06-20T10:30:00Z', referenceNumber: 'TXN89347593', description: 'Amazon Web Services', type: 'WITHDRAWAL', amount: 1500, status: 'COMPLETED' },
    { id: 2, transactionDate: '2026-06-19T14:15:00Z', referenceNumber: 'TXN89347594', description: 'Salary NEFT', type: 'DEPOSIT', amount: 85000, status: 'COMPLETED' },
    { id: 3, transactionDate: '2026-06-18T09:45:00Z', referenceNumber: 'TXN89347595', description: 'Starbucks Coffee', type: 'WITHDRAWAL', amount: 350, status: 'COMPLETED' },
    { id: 4, transactionDate: '2026-06-17T18:20:00Z', referenceNumber: 'TXN89347596', description: 'Rent Transfer', type: 'TRANSFER_OUT', amount: 25000, status: 'PENDING' },
    { id: 5, transactionDate: '2026-06-16T11:10:00Z', referenceNumber: 'TXN89347597', description: 'Dividend Credit', type: 'DEPOSIT', amount: 4500, status: 'COMPLETED' },
  ]

  const mockNotifications = [
    { id: 1, title: 'Salary Credited successfully.', time: '2 hours ago', icon: <FiArrowDownCircle className="text-success fs-4" /> },
    { id: 2, title: 'New Login from Windows PC.', time: '1 day ago', icon: <FiAlertCircle className="text-warning fs-4" /> },
    { id: 3, title: 'Credit Card Bill Due tomorrow.', time: '2 days ago', icon: <FiCreditCard className="text-danger fs-4" /> },
  ]

  const mockActivities = [
    { id: 1, action: 'Logged in from IP 192.168.1.5', time: '10 mins ago', type: 'login' },
    { id: 2, action: 'Updated profile settings', time: '2 hours ago', type: 'settings' },
    { id: 3, action: 'Downloaded Monthly Statement', time: '1 day ago', type: 'download' },
    { id: 4, action: 'Enabled 2FA Authentication', time: '3 days ago', type: 'security' },
  ]

  const mockAccountSummary = {
    accountNumber: 'XXXX-XXXX-4589',
    ifsc: 'BNKO0001234',
    branch: 'Main Branch, Mumbai',
    accountType: 'Premium Savings',
    balance: 450000
  }

  const mockChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [65000, 75000, 85000, 80000, 95000, 89500],
        backgroundColor: '#10B981',
      },
      {
        label: 'Expenses',
        data: [45000, 52000, 38000, 60000, 41000, 26850],
        backgroundColor: '#EF4444',
      }
    ]
  }

  const mockSpendingData = {
    labels: ['Shopping', 'Food & Dining', 'Bills & Utilities', 'Entertainment', 'Others'],
    datasets: [
      {
        data: [35, 20, 25, 10, 10],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#6B7280'],
        borderWidth: 0,
      }
    ]
  }

  useEffect(() => {
    // Simulate slight loading delay for realistic feel
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

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
            value={formatCurrency(mockStats.totalBalance)} 
            color="primary" 
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard 
            icon={<FiArrowDownCircle />} 
            title="Total Deposits" 
            value={formatCurrency(mockStats.totalDeposits)} 
            color="success" 
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard 
            icon={<FiArrowUpCircle />} 
            title="Total Withdrawals" 
            value={formatCurrency(mockStats.totalWithdrawals)} 
            color="danger" 
          />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard 
            icon={<FiFileText />} 
            title="Active Loans" 
            value={mockStats.activeLoans} 
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
                  <ChartWidget type="bar" data={mockChartData} />
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100">
                <h5 className="mb-4">Spending Analysis</h5>
                <div style={{ height: '300px' }}>
                  <ChartWidget type="doughnut" data={mockSpendingData} />
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
                  <span className="fw-bold text-primary">85%</span>
                </div>
                <div className="progress mb-3" style={{ height: '10px' }}>
                  <div className="progress-bar bg-primary progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '85%' }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="text-muted small mb-0">Add your PAN card details to complete your KYC and unlock higher transaction limits.</p>
                <Link to="/customer/profile" className="btn btn-sm btn-outline-primary mt-3">Complete Now</Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-white rounded-3 shadow-sm p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Activity Tracking</h5>
                  <Link to="/customer/profile" className="text-decoration-none small text-primary fw-semibold">View Logs</Link>
                </div>
                <div className="d-flex flex-column gap-3">
                  {mockActivities.map(activity => (
                    <div key={activity.id} className="d-flex align-items-start gap-3 border-bottom pb-2">
                      <div className="flex-shrink-0 mt-1 text-primary">
                        <FiActivity />
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-medium small">{activity.action}</p>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{activity.time}</span>
                      </div>
                    </div>
                  ))}
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
              <h3 className="text-white fw-bold mb-4">{formatCurrency(mockAccountSummary.balance)}</h3>
              
              <div className="mb-3">
                <span className="text-white opacity-75 d-block small">Account Number</span>
                <span className="fw-semibold letter-spacing-2">{mockAccountSummary.accountNumber}</span>
              </div>
              
              <div className="row g-2 mb-0">
                <div className="col-6">
                  <span className="text-white opacity-75 d-block small">IFSC Code</span>
                  <span className="fw-semibold">{mockAccountSummary.ifsc}</span>
                </div>
                <div className="col-6">
                  <span className="text-white opacity-75 d-block small">Account Type</span>
                  <span className="fw-semibold">{mockAccountSummary.accountType}</span>
                </div>
                <div className="col-12 mt-2">
                  <span className="text-white opacity-75 d-block small">Branch</span>
                  <span className="fw-semibold">{mockAccountSummary.branch}</span>
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
              {mockNotifications.map(notification => (
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
            <TransactionTable transactions={mockTransactions} limit={5} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
