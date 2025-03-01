// contexts/UserStatsContext.js
import { createContext, useState, useContext } from 'react';
import { userStats as initialUserStats, practiceLogs as initialPracticeLogs } from '../../data/mockData';
import { startOfDay, differenceInDays, isSameDay, parseISO } from 'date-fns';

const UserStatsContext = createContext();

export const UserStatsProvider = ({ children }) => {
  const [userStats, setUserStats] = useState(initialUserStats);
  const [practiceLogs, setPracticeLogs] = useState(initialPracticeLogs);

  const addPracticeSession = (asana) => {
    const currentDate = new Date();

    // Update Total Sessions
    setUserStats(prev => ({ ...prev, totalSessions: prev.totalSessions + 1 }));

    // Update Total Practice Time (convert seconds to minutes)
    setUserStats(prev => ({
      ...prev,
      totalPracticeTime: prev.totalPracticeTime + (asana.avgDuration / 60),
    }));

    // Update Total Points
    setUserStats(prev => ({
      ...prev,
      pointsTotal: prev.pointsTotal + (asana.difficulty * 10),
    }));

    // Update Current Streak
    setUserStats(prev => {
      const lastDate = prev.lastPracticeDate ? startOfDay(parseISO(prev.lastPracticeDate)) : null;
      const currentDateStart = startOfDay(currentDate);
      let newStreak = prev.currentStreak;

      if (!lastDate) {
        newStreak = 1;
      } else {
        const daysDiff = differenceInDays(currentDateStart, lastDate);
        newStreak = daysDiff === 1 ? prev.currentStreak + 1 : daysDiff > 1 ? 1 : prev.currentStreak;
      }

      return { ...prev, currentStreak: newStreak, lastPracticeDate: currentDate.toISOString() };
    });

    // Update Favorite Asanas
    setUserStats(prev => {
      const updated = [...prev.favoriteAsanas];
      const existing = updated.find(a => a.name === asana.name);
      existing ? existing.count++ : updated.push({ name: asana.name, count: 1 });
      return { ...prev, favoriteAsanas: updated };
    });

    // Add to Practice Logs
    setPracticeLogs(prev => [
      ...prev,
      {
        id: prev.length + 1,
        date: currentDate.toISOString(),
        totalDuration: asana.avgDuration,
        asanas: [asana.name],
        mood: 'N/A',
        notes: 'Added via Asana Library'
      }
    ]);
  };

  return (
    <UserStatsContext.Provider value={{ userStats, practiceLogs, addPracticeSession }}>
      {children}
    </UserStatsContext.Provider>
  );
};

export const useUserStats = () => useContext(UserStatsContext);