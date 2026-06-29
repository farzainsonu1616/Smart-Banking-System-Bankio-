import React from 'react'
import RoleBasedLayout from './RoleBasedLayout'
import { 
  FiHome, FiUsers, FiUserCheck, FiUserPlus, FiMapPin, 
  FiBriefcase, FiDollarSign, FiFileText, FiCreditCard, 
  FiList, FiBell, FiShield, FiDatabase, FiSettings, 
  FiKey, FiHardDrive, FiActivity, FiCpu, FiUser, FiSliders
} from 'react-icons/fi'

const SuperAdminLayout = () => {
  const menuItems = [
    { path: '/super-admin/dashboard', icon: <FiHome />, label: 'Dashboard', exact: true },
    { path: '/super-admin/users', icon: <FiUsers />, label: 'User Management' },
    { path: '/super-admin/admins', icon: <FiUserCheck />, label: 'Admin Management' },
    { path: '/super-admin/managers', icon: <FiUserPlus />, label: 'Manager Management' },
    { path: '/super-admin/branches', icon: <FiMapPin />, label: 'Branch Management' },
    { path: '/super-admin/accounts', icon: <FiBriefcase />, label: 'Accounts' },
    { path: '/super-admin/transactions', icon: <FiDollarSign />, label: 'Transactions' },
    { path: '/super-admin/loans', icon: <FiFileText />, label: 'Loans' },
    { path: '/super-admin/cards', icon: <FiCreditCard />, label: 'Cards' },
    { path: '/super-admin/reports', icon: <FiList />, label: 'Reports' },
    { path: '/super-admin/security', icon: <FiShield />, label: 'Security Center' },
    { path: '/super-admin/roles', icon: <FiKey />, label: 'Role Management' },
    { path: '/super-admin/backups', icon: <FiHardDrive />, label: 'Backup Management' },
    { path: '/super-admin/profile', icon: <FiUser />, label: 'Profile' },
    { path: '/super-admin/settings', icon: <FiSettings />, label: 'Settings' }
  ]

  return <RoleBasedLayout menuItems={menuItems} roleName="Super Admin Portal" />
}

export default SuperAdminLayout
