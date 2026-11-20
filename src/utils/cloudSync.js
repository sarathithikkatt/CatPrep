import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { getDefaultUserData } from './storage';

let debounceTimeout = null;

/**
 * Loads user data from Firestore for the given user ID.
 * Returns null if no cloud document exists yet or if Firebase is unconfigured.
 */
export const loadUserCloudData = async (uid) => {
  if (!isFirebaseConfigured || !db || !uid) return null;

  try {
    const docRef = doc(db, 'users', uid);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const cloudData = snap.data();
      const defaultData = getDefaultUserData();

      // Deep/clean merge to preserve any newer schema fields
      return {
        ...defaultData,
        ...cloudData,
        dailyTarget: {
          ...defaultData.dailyTarget,
          ...(cloudData.dailyTarget || {}),
        },
        topicProgress: {
          ...defaultData.topicProgress,
          ...(cloudData.topicProgress || {}),
        },
        dailyLogs: {
          ...defaultData.dailyLogs,
          ...(cloudData.dailyLogs || {}),
        },
        streak: {
          ...defaultData.streak,
          ...(cloudData.streak || {}),
        },
        mockReports: cloudData.mockReports || [],
        questionAttempts: cloudData.questionAttempts || {},
        bookmarkedQuestions: cloudData.bookmarkedQuestions || {},
        retestAttempts: cloudData.retestAttempts || {},
        weeklyPlanner: cloudData.weeklyPlanner || null,
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to load user data from Firestore:', error);
    throw error;
  }
};

/**
 * Saves user data to Firestore immediately.
 */
export const saveUserCloudDataImmediate = async (uid, userData) => {
  if (!isFirebaseConfigured || !db || !uid || !userData) return;

  try {
    const docRef = doc(db, 'users', uid);
    // Exclude any non-serializable properties
    const payload = {
      ...userData,
      _updatedAt: new Date().toISOString(),
    };
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    console.error('Failed to save user data to Firestore:', error);
    throw error;
  }
};

/**
 * Debounced Firestore saver. Ensures rapid changes (e.g., ticking checkboxes or typing notes)
 * are batched into a single write call, protecting the daily free write quota.
 */
export const saveUserCloudDataDebounced = (uid, userData, delayMs = 1500, onStatusChange) => {
  if (!isFirebaseConfigured || !db || !uid || !userData) return;

  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  if (onStatusChange) onStatusChange('saving');

  debounceTimeout = setTimeout(async () => {
    try {
      await saveUserCloudDataImmediate(uid, userData);
      if (onStatusChange) onStatusChange('synced');
    } catch (error) {
      console.error('Cloud sync debounced error:', error);
      if (onStatusChange) onStatusChange('error');
    }
  }, delayMs);
};
