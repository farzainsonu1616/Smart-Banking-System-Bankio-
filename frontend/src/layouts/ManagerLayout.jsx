import React from 'react'
import RoleBasedLayout from './RoleBasedLayout'
import { FiHome, FiUsers, FiGrid, FiDollarSign, FiFileText, FiPieChart, FiUser } from 'react-icons/fi'

const ManagerLayout = () => {
  const menuItems = [
    { path: '/manager/dashboard', icon: <FiHome />, label: 'Dashboard', exact: true },
    { path: '/manager/customers', icon: <FiUsers />, label: 'Customers' },
    { path: '/manager/accounts', icon: <FiGrid />, label: 'Accounts' },
    { path: '/manager/loans', icon: <FiFileText />, label: 'Loans' },
    { path: '/manager/transactions', icon: <FiDollarSign />, label: 'Transactions' },
    { path: '/manager/reports', icon: <FiPieChart />, label: 'Reports' },
    { path: '/manager/profile', icon: <FiUser />, label: 'Profile' }
  ]

  return <RoleBasedLayout menuItems={menuItems} roleName="Manager Portal" />
}

export default ManagerLayout
