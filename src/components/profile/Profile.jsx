import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-primary-dark mb-6">Your Profile</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          {currentUser.photoURL ? (
            <img
              src='https://img.freepik.com/free-vector/elegant-world-yoga-day-background-with-women-practicing-exercise_1017-44981.jpg?t=st=1740915702~exp=1740919302~hmac=47b769c2f8a07cae9da75bae79db0dcd0867b2f0f8892223256ca94ac5e36343&w=740'
              
              alt="Profile"
              className="h-16 w-16 rounded-full"
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
              {(currentUser.displayName || currentUser.email || '').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{currentUser.displayName || 'No Name Set'}</h2>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 