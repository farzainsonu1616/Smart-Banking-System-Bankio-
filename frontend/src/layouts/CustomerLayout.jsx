import React from 'react'
import RoleBasedLayout from './RoleBasedLayout'
import { FiHome, FiCreditCard, FiDollarSign, FiFileText, FiUser, FiSettings, FiGrid, FiBell, FiHelpCircle } from 'react-icons/fi'

const CustomerLayout = () => {
  const menuItems = [
    { path: '/customer/dashboard', icon: <FiHome />, label: 'Dashboard', exact: true },
    { path: '/customer/transactions', icon: <FiDollarSign />, label: 'Transactions' },
    { path: '/customer/transfer-money', icon: <FiDollarSign />, label: 'Bank Transfer' },
    { path: '/customer/loans', icon: <FiFileText />, label: 'Loans & Proofs' },
    { path: '/customer/profile', icon: <FiUser />, label: 'Profile' }
  ]

  return <RoleBasedLayout menuItems={menuItems} roleName="Customer Portal" />
}

export default CustomerLayout
