import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AdminService from '../../services/AdminService'
import Preloader from '../../components/Common/Preloader'
import StatCard from '../../components/DashboardWidgets/StatCard'
import ChartWidget from '../../components/DashboardWidgets/ChartWidget'
import { FiUsers, FiDollarSign, FiFileText, FiCreditCard, FiActivity, FiTrendingUp, FiGrid } from 'react-icons/fi'
import { formatCurrency } from '../../utils/Helpers'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await AdminService.getStats()
      setStats(res.data.data || {})
    } catch (error) {
      toast.error('Failed to load admin stats')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Preloader />

  const transactionChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Daily Transactions',
      data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const revenueGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Growth (Revenue)',
      data: [150000, 180000, 210000, 250000, 300000, 350000],
      backgroundColor: '#10B981',
      borderRadius: 4
    }]
  }

  const userGrowthChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'User Growth',
      data: [1200, 1900, 3000, 5000, 8000, 12450],
      borderColor: '#8B5CF6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const loanChartData = {
    labels: ['Personal', 'Home', 'Business', 'Education'],
    datasets: [{
      label: 'Loan Distribution',
      data: [45, 25, 20, 10],
      backgroundColor: ['#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'],
      borderWidth: 0
    }]
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Dashboard</h2>
      </div>
      
      <div className="row gy-4 mb-4">
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard icon={<FiUsers />} title="Total Users" value={stats?.totalUsers} color="primary" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard icon={<FiGrid />} title="Total Accounts" value={stats?.totalAccounts} color="success" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard icon={<FiActivity />} title="Transactions" value={stats?.totalTransactions} color="info" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard icon={<FiFileText />} title="Total Loans" value={stats?.totalLoans} color="warning" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard icon={<FiCreditCard />} title="Total Cards" value={stats?.totalCards} color="danger" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard icon={<FiTrendingUp />} title="Total Balance" value={formatCurrency(stats?.totalBalance)} color="primary" />
        </div>
      </div>

      <div className="row gy-4 mb-4">
        <div className="col-xl-6">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-4 text-dark fw-bold">Daily Transactions</h5>
            <div style={{ height: '300px' }}>
              <ChartWidget type="line" data={transactionChartData} />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-4 text-dark fw-bold">Monthly Growth (Revenue)</h5>
            <div style={{ height: '300px' }}>
              <ChartWidget type="bar" data={revenueGrowthData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row gy-4">
        <div className="col-xl-6">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-4 text-dark fw-bold">User Growth</h5>
            <div style={{ height: '300px' }}>
              <ChartWidget type="line" data={userGrowthChartData} />
            </div>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="bg-white rounded-3 shadow-sm p-4 h-100">
            <h5 className="mb-4 text-dark fw-bold">Loan Statistics</h5>
            <div style={{ height: '300px' }}>
              <ChartWidget type="doughnut" data={loanChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
