import { useState } from 'react'
import { FaUsers, FaTrophy, FaPlus, FaComment, FaHeart, FaShare } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { groups, challenges, communityPosts } from '../data/mockData'
import { format, parseISO } from 'date-fns'

const Community = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('feed')
  const [likedPosts, setLikedPosts] = useState({})
  
  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }))
  }

  return (
    <div className="bg-background-light min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-dark mb-2">Community</h1>
          <p className="text-gray-600">Connect with fellow yoga enthusiasts and join challenges</p>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('feed')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'feed'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Activity Feed
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'groups'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaUsers className="inline mr-2" />
                Groups
              </button>
              <button
                onClick={() => setActiveTab('challenges')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'challenges'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FaTrophy className="inline mr-2" />
                Challenges
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'feed' && (
              <div>
                {/* Create Post */}
                <div className="bg-background-light rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <img 
                      src={currentUser.profilePic} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="flex-grow">
                      <textarea 
                        className="input min-h-[100px]" 
                        placeholder="Share your yoga journey or ask a question..."
                      ></textarea>
                      <div className="flex justify-between mt-3">
                        <div className="flex space-x-2">
                          <button className="btn btn-sm bg-background-dark text-gray-700 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Photo
                          </button>
                          <button className="btn btn-sm bg-background-dark text-gray-700 hover:bg-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                            Log Practice
                          </button>
                        </div>
                        <button className="btn btn-primary btn-sm">Post</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Posts */}
                <div className="space-y-6">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                      <div className="flex items-start mb-3">
                        <img 
                          src={post.userImage} 
                          alt={post.userName} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h4 className="font-medium">{post.userName}</h4>
                          <p className="text-xs text-gray-500">
                            {format(new Date(post.date), 'MMM d, yyyy • h:mm a')}
                          </p>
                        </div>
                      </div>
                      
                      <p className="mb-3">{post.content}</p>
                      
                      {post.image && (
                        <img 
                          src={post.image} 
                          alt="Post" 
                          className="w-full h-64 object-cover rounded-lg mb-3"
                        />
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                        <button 
                          className={`flex items-center ${likedPosts[post.id] ? 'text-accent' : ''}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <FaHeart className="mr-1" /> 
                          {likedPosts[post.id] ? post.likes + 1 : post.likes} Likes
                        </button>
                        <button className="flex items-center">
                          <FaComment className="mr-1" /> {post.comments} Comments
                        </button>
                        <button className="flex items-center">
                          <FaShare className="mr-1" /> Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'groups' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Your Groups</h3>
                  <button className="btn btn-primary">
                    <FaPlus className="mr-2" /> Create Group
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groups.map((group) => (
                    <div key={group.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                      <img 
                        src={group.image} 
                        alt={group.name} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-lg mb-1">{group.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{group.members} members</span>
                          <span>{group.posts} posts</span>
                        </div>
                        <button className="btn btn-primary w-full mt-4">View Group</button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Discover More Groups Card */}
                  <div className="bg-background-light rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 h-full">
                    <FaUsers className="text-4xl text-gray-400 mb-3" />
                    <h4 className="font-semibold text-lg mb-1 text-center">Discover More Groups</h4>
                    <p className="text-sm text-gray-600 mb-4 text-center">Find groups that match your interests and goals</p>
                    <button className="btn btn-outline">Browse Groups</button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'challenges' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Active Challenges</h3>
                  <button className="btn btn-primary">
                    <FaPlus className="mr-2" /> Create Challenge
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {challenges.map((challenge) => (
                    <div key={challenge.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                      <div className="relative">
                        <img 
                          src={challenge.image} 
                          alt={challenge.title} 
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                          {challenge.difficulty}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-lg mb-1">{challenge.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div className="bg-background-light rounded p-2">
                            <p className="text-gray-500">Duration</p>
                            <p className="font-medium">{challenge.duration} days</p>
                          </div>
                          <div className="bg-background-light rounded p-2">
                            <p className="text-gray-500">Participants</p>
                            <p className="font-medium">{challenge.participants}</p>
                          </div>
                          <div className="bg-background-light rounded p-2">
                            <p className="text-gray-500">Start Date</p>
                            <p className="font-medium">{format(parseISO(challenge.startDate), 'MMM d, yyyy')}</p>
                          </div>
                          <div className="bg-background-light rounded p-2">
                            <p className="text-gray-500">Reward</p>
                            <p className="font-medium">{challenge.reward}</p>
                          </div>
                        </div>
                        <button className="btn btn-primary w-full">Join Challenge</button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Create Challenge Card */}
                  <div className="bg-background-light rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 h-full">
                    <FaTrophy className="text-4xl text-gray-400 mb-3" />
                    <h4 className="font-semibold text-lg mb-1 text-center">Create Your Challenge</h4>
                    <p className="text-sm text-gray-600 mb-4 text-center">Design a custom challenge for yourself or your group</p>
                    <button className="btn btn-outline">Create Challenge</button>
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

export default Community