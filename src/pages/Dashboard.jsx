import { useState } from 'react';
import { FaCalendarAlt, FaChartLine, FaFire, FaMedal } from 'react-icons/fa';
import { GiMeditation } from 'react-icons/gi';
import { useUserStats } from '../components/usercontexts/UserStatsContext'
import { startOfDay, isSameDay, parseISO } from 'date-fns';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { userStats, practiceLogs } = useUserStats();
  const [timeRange, setTimeRange] = useState('week');

  const getWeeklyPracticeData = (logs) => {
    const days = Array(7)
      .fill()
      .map((_, i) => startOfDay(new Date().setDate(new Date().getDate() - 6 + i)));
    return days.map((day) =>
      logs
        .filter((log) => isSameDay(parseISO(log.date), day))
        .reduce((sum, log) => sum + log.totalDuration / 60, 0)
    );
  };

  const practiceTimeData = {
    labels:
      timeRange === 'week'
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Practice Time (minutes)',
        data: timeRange === 'week' ? getWeeklyPracticeData(practiceLogs) : [],
        fill: true,
        backgroundColor: 'rgba(33, 158, 188, 0.2)',
        borderColor: '#219EBC',
        tension: 0.4,
      },
    ],
  };

  const favoriteAsanasData = {
    labels: userStats.favoriteAsanas.map((a) => a.name),
    datasets: [
      {
        label: 'Times Practiced',
        data: userStats.favoriteAsanas.map((a) => a.count),
        backgroundColor: ['#219EBC', '#023047', '#8ECAE6', '#95D5B2', '#EF8354'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-background-light min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">Dashboard</h1>
        <p className="text-gray-600">Track your yoga journey and progress</p>
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
                <h3 className="text-2xl font-bold">{userStats.currentStreak || 0} days</h3>
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
                <h3 className="text-2xl font-bold">{userStats.pointsTotal || 0}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Practice Time</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setTimeRange('week')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === 'week' ? 'bg-primary text-white' : 'bg-background-light text-gray-700'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    timeRange === 'month' ? 'bg-primary text-white' : 'bg-background-light text-gray-700'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>
            <Line data={practiceTimeData} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Favorite Asanas</h3>
            <Doughnut data={favoriteAsanasData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
