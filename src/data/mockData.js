// Mock data for the application

// Asanas data
export const asanas = [
  {
    id: 1,
    name: 'Downward-Facing Dog',
    sanskrit: 'Adho Mukha Svanasana',
    category: 'Standing',
    difficulty: 2,
    benefits: ['Strengthens arms and legs', 'Stretches shoulders, hamstrings, calves', 'Energizes the body'],
    description: 'A common pose in yoga that forms an inverted V-shape. It helps to strengthen the arms and legs while stretching the shoulders, hamstrings, and calves.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&0&q=60w=50',
    muscleGroups: ['Arms', 'Shoulders', 'Hamstrings', 'Calves'],
    avgDuration: 60, // in seconds
    popularityScore: 95
  },
  {
    id: 2,
    name: 'Warrior I',
    sanskrit: 'Virabhadrasana I',
    category: 'Standing',
    difficulty: 2,
    benefits: ['Strengthens legs and core', 'Opens chest and shoulders', 'Improves focus and balance'],
    description: 'A standing pose that strengthens the legs and core while opening the chest, shoulders, and hips. It helps to improve focus and balance.',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Legs', 'Core', 'Chest', 'Shoulders'],
    avgDuration: 45, // in seconds
    popularityScore: 88
  },
  {
    id: 3,
    name: 'Tree Pose',
    sanskrit: 'Vrikshasana',
    category: 'Standing',
    difficulty: 3,
    benefits: ['Improves balance', 'Strengthens legs and core', 'Increases focus'],
    description: 'A balancing pose that strengthens the legs and core while improving focus and concentration. It helps to develop balance and stability.',
    image: 'https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Legs', 'Core', 'Ankles'],
    avgDuration: 30, // in seconds
    popularityScore: 82
  },
  {
    id: 4,
    name: 'Child\'s Pose',
    sanskrit: 'Balasana',
    category: 'Seated',
    difficulty: 1,
    benefits: ['Relaxes the body', 'Relieves back and neck pain', 'Calms the mind'],
    description: 'A resting pose that gently stretches the hips, thighs, and ankles while calming the brain and relieving stress and fatigue.',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Back', 'Hips', 'Thighs'],
    avgDuration: 90, // in seconds
    popularityScore: 90
  },
  {
    id: 5,
    name: 'Cobra Pose',
    sanskrit: 'Bhujangasana',
    category: 'Prone',
    difficulty: 2,
    benefits: ['Strengthens spine', 'Opens chest and lungs', 'Stimulates abdominal organs'],
    description: 'A backbend that strengthens the spine while opening the chest and lungs. It helps to stimulate abdominal organs and relieve stress.',
    image: 'https://images.unsplash.com/photo-1599447292180-45fd84092ef4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Back', 'Chest', 'Shoulders'],
    avgDuration: 30, // in seconds
    popularityScore: 85
  },
  {
    id: 6,
    name: 'Bridge Pose',
    sanskrit: 'Setu Bandhasana',
    category: 'Supine',
    difficulty: 2,
    benefits: ['Strengthens back, glutes, and hamstrings', 'Opens chest', 'Reduces anxiety'],
    description: 'A backbend that strengthens the back, glutes, and hamstrings while opening the chest and reducing anxiety. It helps to improve circulation.',
    image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Back', 'Glutes', 'Hamstrings', 'Chest'],
    avgDuration: 45, // in seconds
    popularityScore: 78
  },
  {
    id: 7,
    name: 'Seated Forward Bend',
    sanskrit: 'Paschimottanasana',
    category: 'Seated',
    difficulty: 3,
    benefits: ['Stretches spine and hamstrings', 'Calms the mind', 'Relieves stress'],
    description: 'A seated forward bend that stretches the spine and hamstrings while calming the mind and relieving stress. It helps to improve digestion.',
    image: 'https://images.unsplash.com/photo-1566908829550-e6551b00979b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Spine', 'Hamstrings', 'Lower back'],
    avgDuration: 60, // in seconds
    popularityScore: 75
  },
  {
    id: 8,
    name: 'Warrior II',
    sanskrit: 'Virabhadrasana II',
    category: 'Standing',
    difficulty: 2,
    benefits: ['Strengthens legs', 'Opens hips and chest', 'Builds stamina'],
    description: 'A standing pose that strengthens the legs while opening the hips and chest. It helps to build stamina and concentration.',
    image: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Legs', 'Hips', 'Chest', 'Shoulders'],
    avgDuration: 45, // in seconds
    popularityScore: 86
  },
  {
    id: 9,
    name: 'Triangle Pose',
    sanskrit: 'Trikonasana',
    category: 'Standing',
    difficulty: 3,
    benefits: ['Stretches legs, hips, and spine', 'Strengthens core', 'Improves balance'],
    description: 'A standing pose that stretches the legs, hips, and spine while strengthening the core. It helps to improve balance and stability.',
    image: 'https://images.unsplash.com/photo-1562088287-bde35a1ea917?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Legs', 'Hips', 'Spine', 'Core'],
    avgDuration: 30, // in seconds
    popularityScore: 80
  },
  {
    id: 10,
    name: 'Corpse Pose',
    sanskrit: 'Savasana',
    category: 'Supine',
    difficulty: 1,
    benefits: ['Relaxes the body', 'Calms the mind', 'Reduces stress'],
    description: 'A relaxation pose that calms the mind and body. It helps to reduce stress, anxiety, and fatigue while promoting deep relaxation.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    muscleGroups: ['Full body'],
    avgDuration: 300, // in seconds
    popularityScore: 95
  }
];

// Community groups data
export const groups = [
  {
    id: 1,
    name: 'Beginners Yoga Club',
    description: 'A supportive community for those just starting their yoga journey.',
    members: 156,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    posts: 45,
    challenges: 3
  },
  {
    id: 2,
    name: 'Morning Flow Warriors',
    description: 'Early risers who practice yoga to start their day with energy and mindfulness.',
    members: 89,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    posts: 78,
    challenges: 5
  },
  {
    id: 3,
    name: 'Flexibility Focus',
    description: 'Dedicated to improving flexibility through consistent yoga practice.',
    members: 112,
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    posts: 56,
    challenges: 4
  },
  {
    id: 4,
    name: 'Mindful Meditation',
    description: 'Combining yoga and meditation for holistic wellness and mental clarity.',
    members: 203,
    image: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    posts: 120,
    challenges: 6
  }
];

// Challenges data
export const challenges = [
  {
    id: 1,
    title: '30 Days of Balance',
    description: 'Improve your balance with daily balance-focused asanas for 30 days.',
    participants: 78,
    duration: 30, // in days
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    reward: 'Balance Master Badge',
    startDate: '2025-01-01',
    endDate: '2025-01-30'
  },
  {
    id: 2,
    title: 'Morning Sunrise Flow',
    description: 'Start your day with a 15-minute flow every morning for 21 days.',
    participants: 145,
    duration: 21, // in days
    difficulty: 'Beginner',
    image: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    reward: 'Early Bird Badge',
    startDate: '2025-02-01',
    endDate: '2025-02-21'
  },
  {
    id: 3,
    title: 'Flexibility Challenge',
    description: 'Focus on improving flexibility with targeted stretches for 14 days.',
    participants: 92,
    duration: 14, // in days
    difficulty: 'All Levels',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    reward: 'Flexibility Guru Badge',
    startDate: '2025-03-01',
    endDate: '2025-03-14'
  }
];

// Badges data
export const badges = [
  {
    id: 1,
    name: 'Newcomer',
    description: 'Joined the Yogasanas community',
    image: '🌱',
    category: 'Membership'
  },
  {
    id: 2,
    name: '7-Day Streak',
    description: 'Practiced yoga for 7 consecutive days',
    image: '🔥',
    category: 'Consistency'
  },
  {
    id: 3,
    name: '30-Day Streak',
    description: 'Practiced yoga for 30 consecutive days',
    image: '🏆',
    category: 'Consistency'
  },
  {
    id: 4,
    name: 'Balance Master',
    description: 'Completed the 30 Days of Balance challenge',
    image: '⚖️',
    category: 'Challenge'
  },
  {
    id: 5,
    name: 'Early Bird',
    description: 'Completed the Morning Sunrise Flow challenge',
    image: '🌅',
    category: 'Challenge'
  },
  {
    id: 6,
    name: 'Flexibility Guru',
    description: 'Completed the Flexibility Challenge',
    image: '🤸',
    category: 'Challenge'
  },
  {
    id: 7,
    name: 'Community Leader',
    description: 'Created a group with 10+ members',
    image: '👑',
    category: 'Community'
  },
  {
    id: 8,
    name: 'Asana Explorer',
    description: 'Practiced 20 different asanas',
    image: '🧭',
    category: 'Exploration'
  }
];

// User practice logs
export const practiceLogs = [
  {
    id: 1,
    userId: '1',
    date: '2025-04-01',
    asanas: [
      { id: 1, name: 'Downward-Facing Dog', duration: 60, repetitions: 3, difficulty: 3 },
      { id: 2, name: 'Warrior I', duration: 45, repetitions: 2, difficulty: 2 },
      { id: 4, name: 'Child\'s Pose', duration: 90, repetitions: 1, difficulty: 1 }
    ],
    totalDuration: 345, // in seconds
    notes: 'Felt energized after this morning practice.',
    mood: 'Energized',
    shared: true
  },
  {
    id: 2,
    userId: '1',
    date: '2025-04-02',
    asanas: [
      { id: 3, name: 'Tree Pose', duration: 30, repetitions: 2, difficulty: 3 },
      { id: 8, name: 'Warrior II', duration: 45, repetitions: 2, difficulty: 2 },
      { id: 10, name: 'Corpse Pose', duration: 300, repetitions: 1, difficulty: 1 }
    ],
    totalDuration: 450, // in seconds
    notes: 'Focused on balance today. Still struggling with Tree Pose.',
    mood: 'Focused',
    shared: true
  },
  {
    id: 3,
    userId: '1',
    date: '2025-04-03',
    asanas: [
      { id: 5, name: 'Cobra Pose', duration: 30, repetitions: 3, difficulty: 2 },
      { id: 6, name: 'Bridge Pose', duration: 45, repetitions: 3, difficulty: 2 },
      { id: 10, name: 'Corpse Pose', duration: 300, repetitions: 1, difficulty: 1 }
    ],
    totalDuration: 525, // in seconds
    notes: 'Back-strengthening session. Feeling good!',
    mood: 'Relaxed',
    shared: false
  },
  {
    id: 4,
    userId: '1',
    date: '2025-04-04',
    asanas: [
      { id: 1, name: 'Downward-Facing Dog', duration: 60, repetitions: 3, difficulty: 2 },
      { id: 9, name: 'Triangle Pose', duration: 30, repetitions: 2, difficulty: 3 },
      { id: 7, name: 'Seated Forward Bend', duration: 60, repetitions: 2, difficulty: 3 }
    ],
    totalDuration: 360, // in seconds
    notes: 'Focused on stretching today. Hamstrings feel tight.',
    mood: 'Stretched',
    shared: true
  },
  {
    id: 5,
    userId: '1',
    date: '2025-04-05',
    asanas: [
      { id: 2, name: 'Warrior I', duration: 45, repetitions: 2, difficulty: 2 },
      { id: 8, name: 'Warrior II', duration: 45, repetitions: 2, difficulty: 2 },
      { id: 9, name: 'Triangle Pose', duration: 30, repetitions: 2, difficulty: 3 }
    ],
    totalDuration: 240, // in seconds
    notes: 'Short standing sequence today. Felt strong!',
    mood: 'Strong',
    shared: true
  },
  {
    id: 6,
    userId: '1',
    date: '2025-04-06',
    asanas: [
      { id: 4, name: 'Child\'s Pose', duration: 90, repetitions: 1, difficulty: 1 },
      { id: 10, name: 'Corpse Pose', duration: 300, repetitions: 1, difficulty: 1 }
    ],
    totalDuration: 390, // in seconds
    notes: 'Restorative practice today. Needed to relax.',
    mood: 'Calm',
    shared: false
  },
  {
    id: 7,
    userId: '1',
    date: '2025-04-07',
    asanas: [
      { id: 1, name: 'Downward-Facing Dog', duration: 60, repetitions: 3, difficulty: 2 },
      { id: 2, name: 'Warrior I', duration: 45, repetitions: 2, difficulty: 2 },
      { id: 8, name: 'Warrior II', duration: 45, repetitions: 2, difficulty: 2 },
      { id: 9, name: 'Triangle Pose', duration: 30, repetitions: 2, difficulty: 3 },
      { id: 10, name: 'Corpse Pose', duration: 300, repetitions: 1, difficulty: 1 }
    ],
    totalDuration: 660, // in seconds
    notes: 'Full practice today. Feeling accomplished!',
    mood: 'Accomplished',
    shared: true
  }
];

// Community posts
export const communityPosts = [
  {
    id: 1,
    userId: '2',
    userName: 'Yoga Master',
    userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    groupId: 1,
    content: 'Just completed my 30-day yoga challenge! Feeling stronger and more flexible than ever.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 24,
    comments: 5,
    date: '2025-04-05T10:30:00Z'
  },
  {
    id: 2,
    userId: '3',
    userName: 'Mindful Yogi',
    userImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    groupId: 4,
    content: 'Morning meditation followed by a gentle flow. Perfect start to the day!',
    image: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 18,
    comments: 3,
    date: '2025-04-06T08:15:00Z'
  },
  {
    id: 3,
    userId: '4',
    userName: 'Flexible Friend',
    userImage: 'https://randomuser.me/api/portraits/women/45.jpg',
    groupId: 3,
    content: 'Finally able to touch my toes in forward fold! Small victories matter.',
    image: null,
    likes: 32,
    comments: 8,
    date: '2025-04-06T16:45:00Z'
  },
  {
    id: 4,
    userId: '5',
    userName: 'Early Riser',
    userImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    groupId: 2,
    content: 'Day 15 of the Morning Flow Warriors challenge. Loving the energy boost it gives me for the rest of the day!',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    likes: 27,
    comments: 6,
    date: '2025-04-07T07:30:00Z'
  }
];

// User stats for dashboard
export const userStats = {
  weeklyPractice: [45, 30, 60, 0, 45, 30, 75], // minutes per day for the last week
  monthlyPractice: [
    120, 150, 180, 140, 160, 200, 180, 160, 140, 120, 100, 80, 
    90, 110, 130, 150, 170, 190, 210, 190, 170, 150, 130, 110, 
    90, 70, 50, 30, 20, 10
  ], // minutes per day for the last month
  lastPracticeDate: '2023-10-05T09:00:00Z',
  favoriteAsanas: [
    { name: 'Downward-Facing Dog', count: 12 },
    { name: 'Warrior I', count: 10 },
    { name: 'Child\'s Pose', count: 8 },
    { name: 'Corpse Pose', count: 7 },
    { name: 'Warrior II', count: 6 }
  ],
  totalPracticeTime: 50, // in minutes
  totalSessions: 10,
  currentStreak: 7,
  longestStreak: 14,
  pointsThisWeek: 120,
  pointsTotal: 1450
};