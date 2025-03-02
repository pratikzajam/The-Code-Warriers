import { createContext, useState, useContext, useEffect } from 'react'
import { auth, db } from '../config/firebase' // Make sure to import auth from firebase
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Register function
  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update user profile
      await updateProfile(user, {
        displayName: name,
        photoURL: 'https://randomuser.me/api/portraits/women/44.jpg' // default avatar
      })

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
        yogaGoals: [],
        points: 0,
        streak: 0,
        badges: ['Newcomer'],
        createdAt: new Date()
      })

      setCurrentUser(user)
      return user
    } catch (error) {
      throw error
    }
  }

  // Login function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      setCurrentUser(user)
      return user
    } catch (error) {
      throw error
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth)
      setCurrentUser(null)
    } catch (error) {
      throw error
    }
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