import React from 'react'
import { 
  FiUsers, FiMapPin, FiShield, FiBriefcase, 
  FiDollarSign, FiFileText, FiCreditCard, FiActivity,
  FiTrendingUp, FiTrendingDown
} from 'react-icons/fi'
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts'

import { Link } from 'react-router-dom'

const StatCard = ({ title, value, icon, trend, change, gradient, linkTo }) => (
  <Link to={linkTo} style={{ textDecoration: 'none' }} className="d-block h-100">
    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden hover-lift" style={{ background: '#fff', transition: 'all 0.3s ease' }}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3">
          <div 
            className="d-flex align-items-center justify-content-center rounded-4 me-3 text-white" 
            style={{ width: '48px', height: '48px', background: gradient }}
          >
            {icon}
          </div>
          <h6 className="text-muted fw-bold mb-0 text-uppercase" style={{ letterSpacing: '0.5px' }}>{title}</h6>
        </div>
        <h3 className="fw-bolder mb-2 text-dark">{value}</h3>
        <div className="d-flex align-items-center">
          <span className={`badge ${trend === 'up' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} rounded-pill me-2`}>
            {trend === 'up' ? <FiTrendingUp className="me-1"/> : <FiTrendingDown className="me-1"/>}
            {change}
          </span>
          <small className="text-muted fw-medium">vs last month</small>
        </div>
      </div>
    </div>
  </Link>
)

const SuperAdminDashboard = () => {
  // Mock Data
  const userGrowthData = [
    { name: 'Jan', users: 12000 }, { name: 'Feb', users: 13500 }, { name: 'Mar', users: 15250 },
    { name: 'Apr', users: 18000 }, { name: 'May', users: 21000 }, { name: 'Jun', users: 24500 }
  ]
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 450000 }, { name: 'Feb', revenue: 520000 }, { name: 'Mar', revenue: 480000 },
    { name: 'Apr', revenue: 610000 }, { name: 'May', revenue: 750000 }, { name: 'Jun', revenue: 890000 }
  ]
  const txData = [
    { day: 'Mon', count: 4200 }, { day: 'Tue', count: 5800 }, { day: 'Wed', count: 6100 },
    { day: 'Thu', count: 5900 }, { day: 'Fri', count: 8400 }, { day: 'Sat', count: 3200 }, { day: 'Sun', count: 2800 }
  ]
  const loanStatusData = [
    { name: 'Approved', value: 65, color: '#10B981' },
    { name: 'Pending', value: 25, color: '#F59E0B' },
    { name: 'Rejected', value: 10, color: '#EF4444' }
  ]
  const cardRequestData = [
    { name: 'Debit', requests: 450 }, { name: 'Credit (Gold)', requests: 280 }, 
    { name: 'Credit (Platinum)', requests: 120 }, { name: 'Prepaid', requests: 90 }
  ]
  const branchPerformance = [
    { name: 'Mumbai HQ', revenue: 95 }, { name: 'Delhi', revenue: 85 }, 
    { name: 'Bangalore', revenue: 88 }, { name: 'Chennai', revenue: 75 }, { name: 'Kolkata', revenue: 70 }
  ]

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-end mb-4 pb-3 border-bottom">
        <div>
          <h2 className="fw-bolder text-dark mb-1">Executive Dashboard</h2>
          <p className="text-muted fw-medium mb-0"><FiActivity className="me-2 text-primary" />Headquarters Control Center</p>
        </div>
        <div className="text-end">
           <small className="text-muted d-block fw-bold">System Status</small>
           <span className="badge bg-success px-3 py-2 rounded-pill"><FiShield className="me-1"/> All Systems Operational</span>
        </div>
      </div>

      {/* Top Statistics Cards */}
      <div className="row gy-4 mb-5">
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard title="Total Branches" value="42" icon={<FiMapPin size={24}/>} trend="up" change="+2.0%" gradient="linear-gradient(135deg, #64748B, #475569)" linkTo="/super-admin/branches" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard title="Total Admins" value="15" icon={<FiShield size={24}/>} trend="down" change="-6.6%" gradient="linear-gradient(135deg, #EC4899, #DB2777)" linkTo="/super-admin/admins" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard title="Total Managers" value="45" icon={<FiBriefcase size={24}/>} trend="up" change="+5.2%" gradient="linear-gradient(135deg, #8B5CF6, #6D28D9)" linkTo="/super-admin/managers" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard title="Total Customers" value="24,500" icon={<FiUsers size={24}/>} trend="up" change="+12.4%" gradient="linear-gradient(135deg, #3B82F6, #2563EB)" linkTo="/super-admin/users" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard title="Total Revenue" value="$8.4M" icon={<FiDollarSign size={24}/>} trend="up" change="+22.5%" gradient="linear-gradient(135deg, #10B981, #059669)" linkTo="/super-admin/transactions" />
        </div>
        <div className="col-xl-2 col-md-4 col-sm-6">
          <StatCard title="System Health" value="100%" icon={<FiActivity size={24}/>} trend="up" change="Stable" gradient="linear-gradient(135deg, #F59E0B, #D97706)" linkTo="/super-admin/dashboard" />
        </div>
      </div>

      {/* Analytics Section */}
      <h4 className="fw-bolder text-dark mb-4">Analytics & Reports</h4>
      <div className="row gy-4 mb-4">
        {/* User Growth Chart */}
        <div className="col-xl-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
            <h5 className="fw-bold mb-4 text-dark">User Growth</h5>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}/>
                  <Area type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="col-xl-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-4">
            <h5 className="fw-bold mb-4 text-dark">Revenue Growth</h5>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} cursor={{fill: 'rgba(16, 185, 129, 0.05)'}}/>
                  <Bar dataKey="revenue" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Branch Performance */}
        <div className="col-12">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-bold mb-4 text-dark">Top Branch Performance (Score)</h5>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchPerformance}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} cursor={{fill: 'rgba(59, 130, 246, 0.05)'}}/>
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={60} >
                    {branchPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#2563EB' : '#93C5FD'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuperAdminDashboard
