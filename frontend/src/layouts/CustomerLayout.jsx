import React from 'react'
import RoleBasedLayout from './RoleBasedLayout'
import { FiHome, FiCreditCard, FiDollarSign, FiFileText, FiUser, FiSettings, FiGrid, FiBell, FiHelpCircle } from 'react-icons/fi'

const CustomerLayout = () => {
  const menuItems = [
    { path: '/customer/dashboard', icon: <FiHome />, label: 'Dashboard', exact: true },
    { path: '/customer/accounts', icon: <FiGrid />, label: 'Accounts' },
    { path: '/customer/transactions', icon: <FiDollarSign />, label: 'Transactions' },
    { path: '/customer/transfer-money', icon: <FiDollarSign />, label: 'Transfer Money' },
    { path: '/customer/cards', icon: <FiCreditCard />, label: 'Cards' },
    { path: '/customer/loans', icon: <FiFileText />, label: 'Loans' },
    { path: '/customer/notifications', icon: <FiBell />, label: 'Notifications' },
    { path: '/customer/support', icon: <FiHelpCircle />, label: 'Support' },
    { path: '/customer/profile', icon: <FiUser />, label: 'Profile' },
    { path: '/customer/settings', icon: <FiSettings />, label: 'Settings' }
  ]

  return <RoleBasedLayout menuItems={menuItems} roleName="Customer Portal" />
}

export default CustomerLayout
