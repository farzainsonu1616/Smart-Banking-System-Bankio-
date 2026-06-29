import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer, toast } from 'react-toastify'
import ScrollToTop from './components/Common/ScrollToTop'

function App() {
  // Security Auto-Logout
  useEffect(() => {
    // Auto-Logout after 15 mins of inactivity
    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if(localStorage.getItem('token')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login?expired=true';
        }
      }, 15 * 60 * 1000); // 15 mins
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, []);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <ThemeProvider>
          <ScrollToTop />
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} theme="light" />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
