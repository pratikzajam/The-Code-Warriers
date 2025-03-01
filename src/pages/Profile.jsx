import { useState } from 'react'
import { FaUser, FaEdit, FaMedal, FaCalendarAlt, FaChartLine } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { practiceLogs, badges } from '../data/mockData'
import { format, parseISO } from 'date-fns'

const Profile = () => {
  const { currentUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: 'Yoga enthusiast passionate about mindfulness and wellness.',
    yogaGoals: currentUser.yogaGoals || [],
    newGoal: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleAddGoal = () => {
    if (profileData.newGoal.trim()) {
      setProfileData(prev => ({
        ...prev,
        yogaGoals: [...prev.yogaGoals, prev.newGoal.trim()],
        newGoal: ''
      }))
    }
  }
  
  const handleRemoveGoal = (index) => {
    setProfileData(prev => ({
      ...prev,
      yogaGoals: prev.yogaGoals.filter((_, i) => i !== index)
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would update the user profile in the database
    setIsEditing(false)
  }
  
  const userBadges = badges.filter(badge => currentUser.badges.includes(badge.name))

  return (
    <div className="bg-background-light min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <img 
                  src={currentUser.profilePic} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-primary-light">Member since January 2025</p>
                <div className="mt-2 flex items-center">
                  <div className="mr-4">
                    <span className="text-sm">Current Streak</span>
                    <p className="font-bold">{currentUser.streak} days 🔥</p>
                  </div>
                  <div className="mr-4">
                    <span className="text-sm">Total Points</span>
                    <p className="font-bold">{currentUser.points} pts</p>
                  </div>
                  <div>
                    <span className="text-sm">Badges</span>
                    <p className="font-bold">{userBadges.length}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn bg-white text-primary hover:bg-gray-100"
                >
                  <FaEdit className="mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="input"
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Yoga Goals
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {profileData.yogaGoals.map((goal, index) => (
                        <div key={index} className="bg-background-light rounded-full px-3 py-1 flex items-center">
                          <span>{goal}</span>
                          <button 
                            type="button"
                            onClick={() => handleRemoveGoal(index)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        name="newGoal"
                        value={profileData.newGoal}
                        onChange={handleChange}
                        placeholder="Add a new goal..."
                        className="input rounded-r-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddGoal}
                        className="btn btn-primary rounded-l-none"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <FaUser className="mr-2 text-primary" />
                      About Me
                    </h2>
                    <p className="text-gray-600">{profileData.bio}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <FaChartLine className="mr-2 text-primary" />
                      Yoga Goals
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profileData.yogaGoals.map((goal, index) => (
                        <span key={index} className="bg-background-light rounded-full px-3 py-1 text-sm">
                          {goal}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <FaCalendarAlt className="mr-2 text-primary" />
                      Recent Activity
                    </h2>
                    <div className="space-y-4">
                      {practiceLogs.slice(0, 3).map((log) => (
                        <div key={log.id} className="bg-background-light rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{format(parseISO(log.date), 'MMMM d, yyyy')}</h4>
                              <p className="text-sm text-gray-600">
                                {Math.floor(log.totalDuration / 60)} minutes • {log.asanas.length} asanas
                              </p>
                            </div>
                            <span className="badge badge-primary">{log.mood}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-3 flex items-center">
                    <FaMedal className="mr-2 text-primary" />
                    Badges
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {userBadges.map((badge) => (
                      <div key={badge.id} className="bg-background-light rounded-lg p-3 text-center">
                        <div className="text-3xl mb-1">{badge.image}</div>
                        <h4 className="font-medium text-sm">{badge.name}</h4>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Account Settings</h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="#" className="text-primary hover:text-primary-dark text-sm">Change Password</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:text-primary-dark text-sm">Notification Settings</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:text-primary-dark text-sm">Privacy Settings</a>
                      </li>
                      <li>
                        <a href="#" className="text-primary hover:text-primary-dark text-sm">Subscription Management</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile