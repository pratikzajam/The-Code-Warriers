import { useState, useEffect } from 'react'
import { 
  FaUsers, FaTrophy, FaPlus, FaComment, FaHeart, FaShare, FaTimes 
} from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { db, storage } from '../config/firebase'
import { 
  collection, addDoc, query, onSnapshot, doc, updateDoc, arrayUnion, arrayRemove 
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { format } from 'date-fns'

const Community = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('feed')
  const [showGroupForm, setShowGroupForm] = useState(false)
  const [showChallengeForm, setShowChallengeForm] = useState(false)
  
  // Post states
  const [postContent, setPostContent] = useState('')
  const [postImageUrl, setPostImageUrl] = useState('')
  
  // Group states
  const [groupName, setGroupName] = useState('')
  const [groupDesc, setGroupDesc] = useState('')
  const [groupImageUrl, setGroupImageUrl] = useState('')
  
  // Challenge states
  const [challengeTitle, setChallengeTitle] = useState('')
  const [challengeDesc, setChallengeDesc] = useState('')
  const [challengeDuration, setChallengeDuration] = useState('')
  const [challengeDifficulty, setChallengeDifficulty] = useState('beginner')
  const [challengeImageUrl, setChallengeImageUrl] = useState('')

  // Data states
  const [posts, setPosts] = useState([])
  const [groups, setGroups] = useState([])
  const [challenges, setChallenges] = useState([])

  // Add authentication check
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (currentUser?.uid) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [currentUser])

  // Fetch data on component mount
  useEffect(() => {
    // Fetch posts
    const qPosts = query(collection(db, 'posts'))
    const unsubscribePosts = onSnapshot(qPosts, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      }))
      setPosts(postsData)
    })

    // Fetch groups
    const qGroups = query(collection(db, 'groups'))
    const unsubscribeGroups = onSnapshot(qGroups, (snapshot) => {
      setGroups(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })

    // Fetch challenges with error handling and data transformation
    const qChallenges = query(collection(db, 'groups'))
    const unsubscribeChallenges = onSnapshot(qChallenges, (snapshot) => {
      try {
        const challengesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            startDate: data.startDate?.toDate() || new Date(), // Handle potential timestamp conversion
            participants: data.participants?.length || 0 // Convert participants array to count
          };
        });
        console.log('Fetched challenges:', challengesData); // Debug log
        setChallenges(challengesData);
      } catch (error) {
        console.error('Error processing challenges data:', error);
      }
    });

    return () => {
      unsubscribePosts()
      unsubscribeGroups()
      unsubscribeChallenges()
    }
  }, [])

  // Handle post creation
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        console.error("User not authenticated");
        return;
      }
      
      if (!postContent.trim()) return;
      
      const postData = {
        content: postContent,
        image: postImageUrl || '', // Provide default empty string
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userImage: currentUser.photoURL || '/default-avatar.png',
        likes: [],
        comments: [],
        date: new Date()
      };

      await addDoc(collection(db, 'posts'), postData);

      setPostContent('');
      setPostImageUrl('');
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  // Handle group creation
  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        console.error("User not authenticated");
        return;
      }

      const groupData = {
        name: groupName,
        description: groupDesc,
        image: groupImageUrl || '', // Provide default empty string
        members: [currentUser.uid],
        createdBy: currentUser.uid,
        createdAt: new Date(),
        posts: 0
      };

      await addDoc(collection(db, 'groups'), groupData);

      setShowGroupForm(false);
      setGroupName('');
      setGroupDesc('');
      setGroupImageUrl('');
    } catch (error) {
      console.error("Error creating group:", error);
    }
  }

  // Handle challenge creation
  const handleChallengeSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAuthenticated) {
        console.error("User not authenticated");
        return;
      }

      const challengeData = {
        title: challengeTitle,
        description: challengeDesc,
        duration: challengeDuration,
        difficulty: challengeDifficulty,
        image: challengeImageUrl || '', // Provide default empty string
        participants: [currentUser.uid],
        createdBy: currentUser.uid,
        startDate: new Date(),
        reward: '100 Points'
      };

      await addDoc(collection(db, 'challenges'), challengeData);

      setShowChallengeForm(false);
      setChallengeTitle('');
      setChallengeDesc('');
      setChallengeDuration('');
      setChallengeDifficulty('beginner');
      setChallengeImageUrl('');
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  }

  // Handle post likes
  const handleLike = async (postId) => {
    const postRef = doc(db, 'posts', postId)
    const post = posts.find(p => p.id === postId)
    
    if (post.likes.includes(currentUser.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(currentUser.uid)
      })
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(currentUser.uid)
      })
    }
  }

  // Add authentication check in the render method
  if (!isAuthenticated) {
    return (
      <div className="bg-background-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-dark mb-4">Please Sign In</h2>
          <p className="text-gray-600">You need to be signed in to access the community features.</p>
        </div>
      </div>
    );
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
                {/* Post Creation Form */}
                <div className="bg-background-light rounded-lg p-4 mb-6">
                  <form onSubmit={handlePostSubmit}>
                    <div className="flex items-start">
                      <img 
                        src={currentUser.photoURL || '/default-avatar.png'} 
                        alt={currentUser.displayName || 'Anonymous'} 
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-grow">
                        <div className="mb-2 text-sm font-medium text-gray-700">
                          {currentUser.displayName || 'Anonymous'}
                        </div>
                        <textarea 
                          className="input min-h-[100px]" 
                          placeholder="Share your yoga journey..."
                          value={postContent}
                          onChange={(e) => setPostContent(e.target.value)}
                        ></textarea>
                        <div className="flex space-x-2">
                          <input 
                            type="text" 
                            placeholder="Image URL (optional)"
                            className="input input-sm"
                            value={postImageUrl}
                            onChange={(e) => setPostImageUrl(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-between mt-3">
                          <button 
                            type="submit"
                            className="btn btn-primary btn-sm"
                            disabled={!postContent.trim()}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Posts List */}
                <div className="space-y-6">
                  {posts.map((post) => (
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
                          className={`flex items-center ${post.likes.includes(currentUser.uid) ? 'text-accent' : ''}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <FaHeart className="mr-1" /> 
                          {post.likes.length} Likes
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
                {/* Groups Header with Create Button */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Your Groups</h3>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowGroupForm(true)}
                  >
                    <FaPlus className="mr-2" /> Create Group
                  </button>
                </div>

                {/* Group Creation Modal */}
                {showGroupForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                      <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-semibold">Create New Group</h3>
                        <button onClick={() => setShowGroupForm(false)}>
                          <FaTimes />
                        </button>
                      </div>
                      <form onSubmit={handleGroupSubmit}>
                        <input
                          type="text"
                          placeholder="Group Name"
                          className="input mb-3 w-full"
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                          required
                        />
                        <textarea
                          placeholder="Group Description"
                          className="input mb-3 w-full"
                          value={groupDesc}
                          onChange={(e) => setGroupDesc(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Group Image URL"
                          className="input mb-3 w-full"
                          value={groupImageUrl}
                          onChange={(e) => setGroupImageUrl(e.target.value)}
                          required
                        />
                        <button type="submit" className="btn btn-primary w-full">
                          Create Group
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Groups List */}
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
                </div>
              </div>
            )}
            
            {activeTab === 'challenges' && (
              <div>
                {/* Challenges Header with Create Button */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Active Challenges</h3>
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowChallengeForm(true)}
                  >
                    <FaPlus className="mr-2" /> Create Challenge
                  </button>
                </div>

                {/* Challenge Creation Modal */}
                {showChallengeForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                      <div className="flex justify-between mb-4">
                        <h3 className="text-lg font-semibold">Create Challenge</h3>
                        <button onClick={() => setShowChallengeForm(false)}>
                          <FaTimes />
                        </button>
                      </div>
                      <form onSubmit={handleChallengeSubmit}>
                        <input
                          type="text"
                          placeholder="Challenge Title"
                          className="input mb-3 w-full"
                          value={challengeTitle}
                          onChange={(e) => setChallengeTitle(e.target.value)}
                          required
                        />
                        <textarea
                          placeholder="Description"
                          className="input mb-3 w-full"
                          value={challengeDesc}
                          onChange={(e) => setChallengeDesc(e.target.value)}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Duration (days)"
                          className="input mb-3 w-full"
                          value={challengeDuration}
                          onChange={(e) => setChallengeDuration(e.target.value)}
                          required
                        />
                        <select
                          className="input mb-3 w-full"
                          value={challengeDifficulty}
                          onChange={(e) => setChallengeDifficulty(e.target.value)}
                          required
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Challenge Image URL"
                          className="input mb-3 w-full"
                          value={challengeImageUrl}
                          onChange={(e) => setChallengeImageUrl(e.target.value)}
                          required
                        />
                        <button type="submit" className="btn btn-primary w-full">
                          Create Challenge
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {/* Add loading and error states */}
                {challenges.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No challenges available yet. Create one!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                      <div key={challenge.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                        <div className="relative">
                          <img 
                            src={challenge.image || '/default-challenge-image.jpg'} // Add fallback image
                            alt={challenge.title}
                            className="w-full h-40 object-cover"
                            onError={(e) => {
                              e.target.src = '/default-challenge-image.jpg'; // Fallback on image error
                            }}
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
                              <p className="font-medium">
                                {format(new Date(challenge.startDate), 'MMM d, yyyy')}
                              </p>
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
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community