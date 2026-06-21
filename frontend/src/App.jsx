import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer, toast } from 'react-toastify'
import ScrollToTop from './components/Common/ScrollToTop'

function App() {
  
  // Real-Time Notification Simulation & Security Auto-Logout
  useEffect(() => {
    // Simulate real time alerts every 45 seconds
    const interval = setInterval(() => {
      const messages = [
        "New login detected from Chrome (Windows)",
        "Security update: Your 2FA is active",
        "System: Database backup completed",
        "Reminder: Complete your loan application"
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      if(Math.random() > 0.7) {
        toast.info(randomMsg, { position: "bottom-left", autoClose: 4000 });
      }
    }, 45000);

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
      clearInterval(interval);
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
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
