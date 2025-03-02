// contexts/UserStatsContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { userStats as initialUserStats, practiceLogs as initialPracticeLogs } from '../../data/mockData';
import { startOfDay, differenceInDays, isSameDay, parseISO } from 'date-fns';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const UserStatsContext = createContext();

export const UserStatsProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userStats, setUserStats] = useState({
    totalSessions: 0,
    totalPracticeTime: 0,
    currentStreak: 0,
    pointsTotal: 0,
    favoriteAsanas: [],
    lastPracticeDate: null,
  });
  const [practiceLogs, setPracticeLogs] = useState(initialPracticeLogs);

  // Function to update streak and points
  const updateStreakAndPoints = async (practiceDate = new Date()) => {
    const userRef = doc(db, 'users', currentUser.uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    let newStreak = userData.currentStreak || 0;
    let newPoints = userData.pointsTotal || 0;
    const lastPractice = userData.lastPracticeDate ? parseISO(userData.lastPracticeDate) : null;

    // Update streak
    if (lastPractice) {
      if (isSameDay(lastPractice, practiceDate)) {
        // Already practiced today, don't increment streak
      } else if (isSameDay(lastPractice, new Date(practiceDate.getTime() - 86400000))) {
        // Practiced yesterday, increment streak
        newStreak += 1;
      } else {
        // Break in streak, reset to 1
        newStreak = 1;
      }
    } else {
      // First practice ever
      newStreak = 1;
    }

    // Add points (100 points per practice)
    newPoints += 100;

    // Update Firestore
    await updateDoc(userRef, {
      currentStreak: newStreak,
      pointsTotal: newPoints,
      lastPracticeDate: practiceDate.toISOString(),
    });

    // Update local state
    setUserStats(prev => ({
      ...prev,
      currentStreak: newStreak,
      pointsTotal: newPoints,
      lastPracticeDate: practiceDate.toISOString(),
    }));
  };

  const addPracticeSession = async (asana) => {
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
    await updateStreakAndPoints();

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

    // Add this at the end of your addPractice function
    await updateStreakAndPoints();
  };

  return (
    <UserStatsContext.Provider value={{ userStats, practiceLogs, addPracticeSession }}>
      {children}
    </UserStatsContext.Provider>
  );
};

export const useUserStats = () => {
  const context = useContext(UserStatsContext);
  if (!context) {
    throw new Error('useUserStats must be used within a UserStatsProvider');
  }
  return context;
};