import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import CustomerLayout from '../layouts/CustomerLayout'
import AdminLayout from '../layouts/AdminLayout'
import ManagerLayout from '../layouts/ManagerLayout'
import SuperAdminLayout from '../layouts/SuperAdminLayout'
import PrivateRoute from './PrivateRoute'
import Support from '../pages/Dashboard/Support'
import Settings from '../pages/Dashboard/Settings'

// Public Pages
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Contact from '../pages/Contact/Contact'
import FAQ from '../pages/FAQ/FAQ'
import Product from '../pages/Product/Product'
import Loans from '../pages/Loans/Loans'

// Auth Pages
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import OTP from '../pages/OTP/OTP'
// Dashboard Pages (Existing)
import Dashboard from '../pages/Dashboard/Dashboard'
import Profile from '../pages/Dashboard/Profile'
import DashAccountList from '../pages/Dashboard/DashAccountList'
import DashTransactions from '../pages/Dashboard/DashTransactions'
import DashLoanList from '../pages/Dashboard/DashLoanList'
import LoanApplication from '../pages/Dashboard/LoanApplication'
import DashCardList from '../pages/Dashboard/DashCardList'
import CardRequest from '../pages/Dashboard/CardRequest'
import Notifications from '../pages/Dashboard/Notifications'
import DashAccountDetails from '../pages/Dashboard/DashAccountDetails'
import Statements from '../pages/Dashboard/Statements'
import TransferMoney from '../pages/Dashboard/TransferMoney'
import Beneficiaries from '../pages/Dashboard/Beneficiaries'

import AdminDashboard from '../pages/Admin/AdminDashboard'
import ManageUsers from '../pages/Admin/ManageUsers'
import ManageLoans from '../pages/Admin/ManageLoans'
import ManageAccounts from '../pages/Admin/ManageAccounts'
import ManageTransactions from '../pages/Admin/ManageTransactions'
import ManageCards from '../pages/Admin/ManageCards'
import AdminReports from '../pages/Admin/AdminReports'

import ManagerDashboard from '../pages/Manager/ManagerDashboard'
import BranchCustomers from '../pages/Manager/BranchCustomers'
import BranchLoans from '../pages/Manager/BranchLoans'
import BranchTransactions from '../pages/Manager/BranchTransactions'
import BranchReports from '../pages/Manager/BranchReports'

import SuperAdminDashboard from '../pages/SuperAdmin/SuperAdminDashboard'
import ManageAdmins from '../pages/SuperAdmin/ManageAdmins'
import ManageBranches from '../pages/SuperAdmin/ManageBranches'
import SecurityMonitoring from '../pages/SuperAdmin/SecurityMonitoring'
import DatabaseHealth from '../pages/SuperAdmin/DatabaseHealth'
import SystemConfig from '../pages/SuperAdmin/SystemConfig'
import SystemAuditLogs from '../pages/SuperAdmin/SystemAuditLogs'
import RoleManagement from '../pages/SuperAdmin/RoleManagement'
import SystemBackups from '../pages/SuperAdmin/SystemBackups'
import SuperAdminManageUsers from '../pages/SuperAdmin/ManageUsers'
import ManageManagers from '../pages/SuperAdmin/ManageManagers'
import SuperAdminManageAccounts from '../pages/SuperAdmin/ManageAccounts'
import SuperAdminManageTransactions from '../pages/SuperAdmin/ManageTransactions'
import SuperAdminManageLoans from '../pages/SuperAdmin/ManageLoans'
import SuperAdminManageCards from '../pages/SuperAdmin/ManageCards'
import ReportsCenter from '../pages/SuperAdmin/ReportsCenter'
import NotificationsCenter from '../pages/SuperAdmin/NotificationsCenter'
import APIMonitoring from '../pages/SuperAdmin/APIMonitoring'
import SystemHealth from '../pages/SuperAdmin/SystemHealth'
import SuperAdminProfile from '../pages/SuperAdmin/SuperAdminProfile'
import SuperAdminSettings from '../pages/SuperAdmin/SuperAdminSettings'
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/products" element={<Product />} />
        <Route path="/loans" element={<Loans />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTP />} />
      {/* CUSTOMER PORTAL */}
      <Route element={<PrivateRoute allowedRoles={['ROLE_CUSTOMER']}><CustomerLayout /></PrivateRoute>}>
        <Route path="/customer/dashboard" element={<Dashboard />} />
        <Route path="/customer/accounts" element={<DashAccountList />} />
        <Route path="/customer/account-details" element={<DashAccountDetails />} />
        <Route path="/customer/statements" element={<Statements />} />
        <Route path="/customer/transactions" element={<DashTransactions />} />
        <Route path="/customer/transfer-money" element={<TransferMoney />} />
        <Route path="/customer/beneficiaries" element={<Beneficiaries />} />
        <Route path="/customer/cards" element={<DashCardList />} />
        <Route path="/customer/card-request" element={<CardRequest />} />
        <Route path="/customer/loans" element={<DashLoanList />} />
        <Route path="/customer/loan-application" element={<LoanApplication />} />
        <Route path="/customer/notifications" element={<Notifications />} />
        <Route path="/customer/profile" element={<Profile />} />
        <Route path="/customer/support" element={<Support />} />
        <Route path="/customer/settings" element={<Settings />} />
      </Route>

      {/* ADMIN PORTAL */}
      <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_SUPER_ADMIN']}><AdminLayout /></PrivateRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/accounts" element={<ManageAccounts />} />
        <Route path="/admin/transactions" element={<ManageTransactions />} />
        <Route path="/admin/loans" element={<ManageLoans />} />
        <Route path="/admin/cards" element={<ManageCards />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/notifications" element={<Settings />} />
        <Route path="/admin/audit-logs" element={<Settings />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* MANAGER PORTAL */}
      <Route element={<PrivateRoute allowedRoles={['ROLE_MANAGER', 'ROLE_SUPER_ADMIN']}><ManagerLayout /></PrivateRoute>}>
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/customers" element={<BranchCustomers />} />

        <Route path="/manager/loans" element={<BranchLoans />} />
        <Route path="/manager/transactions" element={<BranchTransactions />} />
        <Route path="/manager/reports" element={<BranchReports />} />
        <Route path="/manager/profile" element={<Settings />} />
      </Route>

      {/* SUPER ADMIN PORTAL */}
      <Route element={<PrivateRoute allowedRoles={['ROLE_SUPER_ADMIN']}><SuperAdminLayout /></PrivateRoute>}>
        <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/users" element={<SuperAdminManageUsers />} />
        <Route path="/super-admin/admins" element={<ManageAdmins />} />
        <Route path="/super-admin/managers" element={<ManageManagers />} />
        <Route path="/super-admin/branches" element={<ManageBranches />} />
        <Route path="/super-admin/accounts" element={<SuperAdminManageAccounts />} />
        <Route path="/super-admin/transactions" element={<SuperAdminManageTransactions />} />
        <Route path="/super-admin/loans" element={<SuperAdminManageLoans />} />
        <Route path="/super-admin/cards" element={<SuperAdminManageCards />} />
        <Route path="/super-admin/reports" element={<ReportsCenter />} />
        <Route path="/super-admin/notifications" element={<NotificationsCenter />} />
        <Route path="/super-admin/security" element={<SecurityMonitoring />} />
        <Route path="/super-admin/database" element={<DatabaseHealth />} />
        <Route path="/super-admin/audit-logs" element={<SystemAuditLogs />} />
        <Route path="/super-admin/system-config" element={<SystemConfig />} />
        <Route path="/super-admin/roles" element={<RoleManagement />} />
        <Route path="/super-admin/backups" element={<SystemBackups />} />
        <Route path="/super-admin/api-monitoring" element={<APIMonitoring />} />
        <Route path="/super-admin/system-health" element={<SystemHealth />} />
        <Route path="/super-admin/profile" element={<SuperAdminProfile />} />
        <Route path="/super-admin/settings" element={<SuperAdminSettings />} />
      </Route>

    </Routes>
  )
}

export default AppRoutes
