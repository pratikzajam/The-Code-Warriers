import { useState } from 'react'
import { FaCalendarAlt, FaChartLine, FaFire, FaMedal } from 'react-icons/fa'
import { GiMeditation } from 'react-icons/gi'
import { useAuth } from '../context/AuthContext'
import { practiceLogs, userStats } from '../data/mockData'
import { format, parseISO } from 'date-fns'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const { currentUser } = useAuth()
  const [timeRange, setTimeRange] = useState('week')
  
  // Chart data for practice time
  const practiceTimeData = {
    labels: timeRange === 'week' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Practice Time (minutes)',
        data: timeRange === 'week' ? userStats.weeklyPractice : userStats.monthlyPractice,
        fill: true,
        backgroundColor: 'rgba(33, 158, 188, 0.2)',
        borderColor: '#219EBC',
        tension: 0.4,
      },
    ],
  }
  
  // Chart data for favorite asanas
  const favoriteAsanasData = {
    labels: userStats.favoriteAsanas.map(a => a.name),
    datasets: [
      {
        label: 'Times Practiced',
        data: userStats.favoriteAsanas.map(a => a.count),
        backgroundColor: [
          '#219EBC',
          '#023047',
          '#8ECAE6',
          '#95D5B2',
          '#EF8354',
        ],
        borderWidth: 0,
      },
    ],
  }
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }
  
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  }

  return (
    <div className="bg-background-light min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-dark mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your yoga journey and progress</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-light p-3 mr-4">
                <GiMeditation className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Sessions</p>
                <h3 className="text-2xl font-bold">{userStats.totalSessions}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-light p-3 mr-4">
                <FaChartLine className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Practice Time</p>
                <h3 className="text-2xl font-bold">{userStats.totalPracticeTime} mins</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-light p-3 mr-4">
                <FaFire className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <h3 className="text-2xl font-bold">{userStats.currentStreak} days</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-light p-3 mr-4">
                <FaMedal className="text-primary text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Points</p>
                <h3 className="text-2xl font-bold">{userStats.pointsTotal}</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Practice Time</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeRange('week')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === 'week'
                      ? 'bg-primary text-white'
                      : 'bg-background-light text-gray-700'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === 'month'
                      ? 'bg-primary text-white'
                      : 'bg-background-light text-gray-700'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
            <Line data={practiceTimeData} options={chartOptions} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Favorite Asanas</h3>
            <Doughnut data={favoriteAsanasData} options={doughnutOptions} />
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <a href="#" className="text-primary hover:text-primary-dark text-sm">View All</a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-background-light">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asanas
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mood
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {practiceLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-background-light">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {format(parseISO(log.date), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(log.totalDuration / 60)} mins
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.asanas.length} asanas
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-light text-primary-dark">
                        {log.mood}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {log.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Log Today's Practice</h3>
            <p className="text-gray-600 mb-4">Record your yoga session to keep track of your progress.</p>
            <button className="btn btn-primary w-full">
              <GiMeditation className="mr-2" /> Log Practice
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Join a Challenge</h3>
            <p className="text-gray-600 mb-4">Participate in community challenges to stay motivated.</p>
            <button className="btn btn-primary w-full">
              <FaMedal className="mr-2" /> Browse Challenges
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Schedule Practice</h3>
            <p className="text-gray-600 mb-4">Set reminders for your upcoming yoga sessions.</p>
            <button className="btn btn-primary w-full">
              <FaCalendarAlt className="mr-2" /> Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard