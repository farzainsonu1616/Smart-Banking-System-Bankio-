import React from 'react'
import RoleBasedLayout from './RoleBasedLayout'
import { FiHome, FiUsers, FiGrid, FiDollarSign, FiFileText, FiCreditCard, FiPieChart, FiBell, FiShield, FiSettings } from 'react-icons/fi'

const AdminLayout = () => {
  const menuItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard', exact: true },
    { path: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { path: '/admin/accounts', icon: <FiGrid />, label: 'Accounts' },
    { path: '/admin/transactions', icon: <FiDollarSign />, label: 'Transactions' },
    { path: '/admin/loans', icon: <FiFileText />, label: 'Loans' },
    { path: '/admin/cards', icon: <FiCreditCard />, label: 'Cards' },
    { path: '/admin/reports', icon: <FiPieChart />, label: 'Reports' },
    { path: '/admin/audit-logs', icon: <FiShield />, label: 'Audit Logs' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' }
  ]

  return <RoleBasedLayout menuItems={menuItems} roleName="Admin Portal" />
}

export default AdminLayout
