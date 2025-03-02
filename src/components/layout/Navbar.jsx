import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { GiMeditation } from 'react-icons/gi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsProfileOpen(false)
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GiMeditation className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-display font-semibold text-primary-dark">Yogasanas</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-primary-dark hover:bg-background-light">Dashboard</Link>
                <Link to="/asana-library" className="px-3 py-2 rounded-md text-sm font-medium text-primary-dark hover:bg-background-light">Asana Library</Link>
                <Link to="/community" className="px-3 py-2 rounded-md text-sm font-medium text-primary-dark hover:bg-background-light">Community</Link>
                
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center text-sm rounded-full focus:outline-none"
                    >
                      {currentUser.photoURL ? (
                        <img
                          className="h-8 w-8 rounded-full border-2 border-primary"
                          src={currentUser.photoURL}
                          alt="User profile"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full border-2 border-primary bg-primary text-white flex items-center justify-center font-semibold">
                          {(currentUser.displayName || currentUser.email || '').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="ml-2 text-primary-dark">
                        {currentUser.displayName || currentUser.email}
                      </span>
                    </button>
                  </div>
                  
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-primary-dark hover:bg-background-light"
                        >
                          <FaUser className="mr-2" /> Your Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-2 text-sm text-primary-dark hover:bg-background-light"
                        >
                          <FaSignOutAlt className="mr-2" /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Log in</Link>
                <Link to="/register" className="btn btn-primary">Sign up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-dark hover:text-primary hover:bg-background-light focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-dark hover:bg-background-light"
                >
                  Dashboard
                </Link>
                <Link
                  to="/asana-library"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-dark hover:bg-background-light"
                >
                  Asana Library
                </Link>
                <Link
                  to="/community"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-dark hover:bg-background-light"
                >
                  Community
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-dark hover:bg-background-light"
                >
                  Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-dark hover:bg-background-light"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-dark hover:bg-background-light"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-dark hover:bg-background-light"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar