import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('accessToken'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      loadUser()
    } else {
      setLoading(false)
    }
  }, [])

  const loadUser = async () => {
    try {
      const response = await api.get('/api/auth/me')
      setUser(response.data.data)
    } catch (error) {
      console.error('Failed to load user:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = (accessToken, refreshToken, userData) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setToken(accessToken)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setToken(null)
    setUser(null)
  }

  const updateUser = (userData) => {
    setUser(userData)
  }

  const isAuthenticated = !!token && !!user
  const isCustomer = user?.roles?.includes('ROLE_CUSTOMER')
  const isAdmin = user?.roles?.includes('ROLE_ADMIN')
  const isManager = user?.roles?.includes('ROLE_MANAGER')
  const isSuperAdmin = user?.roles?.includes('ROLE_SUPER_ADMIN')

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isCustomer,
    isAdmin,
    isManager,
    isSuperAdmin,
    login,
    logout,
    updateUser,
    loadUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
