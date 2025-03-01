import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in from localStorage on initial load
  useEffect(() => {
    const user = localStorage.getItem('yogaUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  // Mock login function
  const login = (email, password) => {
    // In a real app, this would make an API call to authenticate
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user data
        const user = {
          id: '1',
          name: 'Yoga Enthusiast',
          email: email,
          profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
          yogaGoals: ['Improve flexibility', 'Reduce stress'],
          points: 120,
          streak: 7,
          badges: ['Beginner', '7-Day Streak']
        }
        
        setCurrentUser(user)
        localStorage.setItem('yogaUser', JSON.stringify(user))
        resolve(user)
      }, 1000)
    })
  }

  // Mock register function
  const register = (name, email, password) => {
    // In a real app, this would make an API call to register
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user data
        const user = {
          id: '1',
          name: name,
          email: email,
          profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
          yogaGoals: [],
          points: 0,
          streak: 0,
          badges: ['Newcomer']
        }
        
        setCurrentUser(user)
        localStorage.setItem('yogaUser', JSON.stringify(user))
        resolve(user)
      }, 1000)
    })
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('yogaUser')
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}