// Storage Service: LocalStorage persistence engine with JSON backup/restore
// Supports both primary user data and multi-track study plans state.

export const STORAGE_KEY = 'CATPREP_USER_DATA_V1';
export const STUDY_PLANS_STORAGE_KEY = 'catprep_study_plans_v1';

export const getDefaultUserData = () => {
  const today = new Date().toISOString().split('T')[0];
  return {
    activeExamId: 'cat',
    dailyTarget: {
      questions: 25,
      minutes: 120
    },
    dailyLogs: {
      [today]: {
        date: today,
        questionsSolved: 0,
        correctCount: 0,
        incorrectCount: 0,
        minutesSpent: 0,
        notes: ''
      }
    },
    topicProgress: {
      'qa-percentages': {
        status: 'completed',
        confidence: 4,
        hoursSpent: 8,
        notes: 'Mastered multiplier and successive changes'
      },
      'qa-timework': {
        status: 'in_progress',
        confidence: 3,
        hoursSpent: 4,
        notes: 'Need more practice on alternate days'
      },
      'qa-logs': {
        status: 'completed',
        confidence: 5,
        hoursSpent: 5,
        notes: 'Strong in base change properties'
      },
      'dilr-arrangements': {
        status: 'in_progress',
        confidence: 3,
        hoursSpent: 6,
        notes: 'Circular arrangements need speed'
      },
      'varc-parajumbles': {
        status: 'in_progress',
        confidence: 4,
        hoursSpent: 5,
        notes: 'Look for mandatory pronoun pairs'
      }
    },
    questionAttempts: {},
    bookmarkedQuestions: {},
    streak: {
      currentStreak: 1,
      lastActiveDate: today,
      history: [today]
    },
    mockReports: [],
    retestAttempts: {},
    weeklyPlanner: null,
    sprintChecklist: {}
  };
};

export const loadUserData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultUserData();
      saveUserData(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];
    if (!parsed.dailyLogs) parsed.dailyLogs = {};
    if (!parsed.dailyLogs[today]) {
      parsed.dailyLogs[today] = {
        date: today,
        questionsSolved: 0,
        correctCount: 0,
        incorrectCount: 0,
        minutesSpent: 0,
        notes: ''
      };
    }
    if (!parsed.mockReports) parsed.mockReports = [];
    if (!parsed.retestAttempts) parsed.retestAttempts = {};
    if (!parsed.sprintChecklist) parsed.sprintChecklist = {};
    return parsed;
  } catch (e) {
    console.error('Failed to parse user data from localStorage', e);
    return getDefaultUserData();
  }
};

export const saveUserData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

export const exportUserDataJSON = (data) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `catprep_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// --- Multi-Track Study Plans Persistence ---

export const getDefaultStudyPlansState = () => {
  const today = new Date().toISOString().split('T')[0];
  return {
    activeTrackId: '3-month',
    tracks: {
      '3-month': {
        startDate: today,
        completedTaskIds: []
      },
      '1-month': {
        startDate: today,
        completedTaskIds: []
      },
      '1-week': {
        startDate: today,
        completedTaskIds: []
      }
    }
  };
};

export const loadStudyPlansState = () => {
  try {
    const raw = localStorage.getItem(STUDY_PLANS_STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultStudyPlansState();
      saveStudyPlansState(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    const initial = getDefaultStudyPlansState();
    return {
      activeTrackId: parsed.activeTrackId || initial.activeTrackId,
      tracks: {
        ...initial.tracks,
        ...(parsed.tracks || {})
      }
    };
  } catch (e) {
    console.error('Failed to load study plans state from localStorage', e);
    return getDefaultStudyPlansState();
  }
};

export const saveStudyPlansState = (state) => {
  try {
    localStorage.setItem(STUDY_PLANS_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save study plans state to localStorage', e);
  }
};
