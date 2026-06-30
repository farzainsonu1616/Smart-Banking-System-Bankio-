import React from 'react'
import RoleBasedLayout from './RoleBasedLayout'
import { FiHome, FiUsers, FiGrid, FiDollarSign, FiFileText, FiCreditCard, FiPieChart, FiBell, FiShield, FiSettings } from 'react-icons/fi'

const AdminLayout = () => {
  const menuItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard', exact: true },
    { path: '/admin/users', icon: <FiUsers />, label: 'User Management' },
    { path: '/admin/accounts', icon: <FiGrid />, label: 'Accounts Oversight' },
    { path: '/admin/transactions', icon: <FiDollarSign />, label: 'Transactions Oversight' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Settings' }
  ]

  return <RoleBasedLayout menuItems={menuItems} roleName="Admin Portal" />
}

export default AdminLayout
