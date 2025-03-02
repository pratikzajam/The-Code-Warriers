
import { useState, useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AsanaLibrary from './pages/AsanaLibrary'
import Community from './pages/Community'
import Profile from './components/profile/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { UserStatsProvider } from './components/usercontexts/UserStatsContext'
import ChatBot from './pages/chatbot/ChatBot'
function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h2 className="mt-4 text-xl font-display text-primary-dark">Loading Yogasanas Tracker...</h2>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
       <UserStatsProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
               
              </ProtectedRoute>
            } />
            <Route path="/asana-library" element={
              <ProtectedRoute>
                <AsanaLibrary />
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
       <ChatBot/>
        <Footer />
      </div>
      </UserStatsProvider>
      
    </AuthProvider>
    
  )
}

export default App


