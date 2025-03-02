import { Link } from 'react-router-dom'
import { FaUsers, FaMedal, FaChartLine, FaLock } from 'react-icons/fa'
import { GiMeditation } from 'react-icons/gi'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { currentUser } = useAuth()

  return (
    <div className="bg-background-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-52">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Yoga Practice, Together</h1>
            <p className="text-xl mb-8">Track your progress, join challenges, and connect with a community of yoga enthusiasts.</p>
            {currentUser ? (
              <Link to="/dashboard" className="btn btn-secondary text-lg px-8 py-3">Go to Dashboard</Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="btn btn-secondary text-lg px-8 py-3">Get Started</Link>
                <Link to="/login" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">Log In</Link>
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#F7F9F9" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Features Designed for Your Yoga Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Everything you need to enhance your practice and connect with like-minded individuals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary-light p-3 w-12 h-12 flex items-center justify-center mb-4">
                <GiMeditation className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Yogasana Tracking</h3>
              <p className="text-gray-600">Log your daily asanas with details like duration, difficulty, and notes to monitor your progress over time.</p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary-light p-3 w-12 h-12 flex items-center justify-center mb-4">
                <FaUsers className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Groups</h3>
              <p className="text-gray-600">Join groups based on your interests, skill level, or goals and practice together virtually.</p>
            </div>

            <div className="card hover:shadow-lg transition-shadow">
              <div className="rounded-full bg-primary-light p-3 w-12 h-12 flex items-center justify-center mb-4">
                <FaMedal className="text-primary text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamification</h3>
              <p className="text-gray-600">Earn points, unlock badges, and climb leaderboards as you maintain your practice and achieve milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Start your journey to a better yoga practice in just a few simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-600">Sign up and set your yoga goals and preferences.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-2">Log Your Practice</h3>
              <p className="text-gray-600">Record your daily asanas and track your progress.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-2">Join Communities</h3>
              <p className="text-gray-600">Connect with other yoga enthusiasts and share experiences.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-primary text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-bold mb-2">Earn Rewards</h3>
              <p className="text-gray-600">Get badges and climb leaderboards as you progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Choose the plan that fits your yoga journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card hover:shadow-lg transition-shadow border-2 border-background-dark">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-4xl font-bold text-primary">$0<span className="text-lg text-gray-500">/month</span></p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Basic asana tracking
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Join community groups
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Basic progress stats
                </li>
                <li className="flex items-center text-gray-400">
                  <FaLock className="h-5 w-5 mr-2" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-400">
                  <FaLock className="h-5 w-5 mr-2" />
                  Custom challenges
                </li>
              </ul>
              <div className="text-center">
                <Link to="/register" className="btn btn-outline w-full">Get Started</Link>
              </div>
            </div>

            <div className="card hover:shadow-lg transition-shadow border-2 border-primary relative">
              <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">Popular</div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-4xl font-bold text-primary">$5<span className="text-lg text-gray-500">/month</span></p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Everything in Free
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Custom challenges
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Ad-free experience
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary-dark mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <div className="text-center">
                <Link to="/register" className="btn btn-primary w-full">Get Premium</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Yoga Practice?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join thousands of yoga enthusiasts who are improving their practice and connecting with a supportive community.</p>
          <Link to="/register" className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3">Start Your Journey Today</Link>
        </div>
      </section>
    </div>
  )
}

export default Home