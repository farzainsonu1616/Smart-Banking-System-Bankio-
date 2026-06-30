import React from 'react'
import StatCard from '../../components/DashboardWidgets/StatCard'
import ChartWidget from '../../components/DashboardWidgets/ChartWidget'
import { FiUsers, FiDollarSign, FiFileText, FiBriefcase, FiMapPin, FiTrendingUp } from 'react-icons/fi'
import { formatCurrency } from '../../utils/Helpers'

const ManagerDashboard = () => {
  const branchStats = {
    branchName: "Downtown Main Branch",
    totalCustomers: 4520,
    totalAccounts: 5120,
    loanApprovals: 124,
    branchRevenue: 850000,
    activeStaff: 42
  }

  const revenueChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Branch Revenue',
      data: [150000, 220000, 180000, 300000],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const loanChartData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [{
      label: 'Loan Status',
      data: [124, 45, 12],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0
    }]
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Manager Dashboard</h2>
          <p className="text-muted mb-0"><FiMapPin className="me-1"/> {branchStats.branchName}</p>
        </div>
      </div>
      
      <div className="row gy-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <StatCard icon={<FiBriefcase />} title="Branch Accounts" value={branchStats.totalAccounts} color="primary" />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard icon={<FiUsers />} title="Branch Customers" value={branchStats.totalCustomers} color="info" />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard icon={<FiFileText />} title="Loan Approvals" value={branchStats.loanApprovals} color="success" />
        </div>
        <div className="col-xl-3 col-md-6">
          <StatCard icon={<FiTrendingUp />} title="Branch Revenue" value={formatCurrency(branchStats.branchRevenue)} color="warning" />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 h-100 shadow-sm" style={{ background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', color: 'white', borderRadius: '16px' }}>
            <div className="card-body p-4 d-flex flex-column justify-content-center">
              <h5 className="mb-3 opacity-75 fw-bold">Branch Performance Goal</h5>
              <div className="progress mb-3" style={{ height: '12px', background: 'rgba(255,255,255,0.2)' }}>
                <div className="progress-bar bg-white progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: '78%' }} aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <p className="mb-0 fs-6"><strong>78%</strong> of Q3 Revenue Target achieved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row gy-4 mb-4">
        <div className="col-xl-7">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-4 text-dark fw-bold">Branch Revenue Growth</h5>
            <div style={{ height: '300px' }}>
              <ChartWidget type="line" data={revenueChartData} />
            </div>
          </div>
        </div>
        <div className="col-xl-5">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-4 text-dark fw-bold">Loan Approvals Breakdown</h5>
            <div style={{ height: '300px' }}>
              <ChartWidget type="doughnut" data={loanChartData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-12">
           <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0 text-dark fw-bold">Recent Branch Activity</h5>
              <button className="btn btn-sm btn-outline-primary">View Report</button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="badge bg-primary">Account</span></td>
                    <td>New Savings Account opened for John Doe</td>
                    <td>10 mins ago</td>
                    <td><span className="text-success">Completed</span></td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-warning text-dark">Loan</span></td>
                    <td>Home Loan application #HL-8842 submitted</td>
                    <td>1 hour ago</td>
                    <td><span className="text-secondary">Pending Review</span></td>
                  </tr>
                  <tr>
                    <td><span className="badge bg-info">Customer</span></td>
                    <td>Customer KYC update completed</td>
                    <td>3 hours ago</td>
                    <td><span className="text-success">Verified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManagerDashboard
