import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../utils/firebase';

const AuthContext = createContext({
  currentUser: null,
  authLoading: true,
  isConfigured: false,
  syncStatus: 'guest',
  setSyncStatus: () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(isFirebaseConfigured);
  const [syncStatus, setSyncStatus] = useState(isFirebaseConfigured ? 'idle' : 'guest');

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setAuthLoading(false);
      setSyncStatus('guest');
      return;
    }

    const unsubscribe = onAuthStateChanged(
      auth, 
      (user) => {
        setCurrentUser(user);
        setSyncStatus(user ? 'synced' : 'guest');
        setAuthLoading(false);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setAuthLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      return {
        success: false,
        error: 'Firebase is not yet configured. Please add your credentials in .env.local',
        notConfigured: true
      };
    }

    try {
      setSyncStatus('saving');
      const result = await signInWithPopup(auth, googleProvider);
      setSyncStatus('synced');
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setSyncStatus(currentUser ? 'synced' : 'guest');
      let message = error.message;
      if (error.code === 'auth/popup-closed-by-user') {
        message = 'Sign-in popup was closed before completion.';
      } else if (error.code === 'auth/unauthorized-domain') {
        message = 'This domain is not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains.';
      } else if (error.code === 'auth/operation-not-allowed') {
        message = 'Google sign-in is not enabled in Firebase Console -> Authentication -> Sign-in method.';
      }
      return { success: false, error: message, code: error.code };
    }
  };

  const logout = async () => {
    if (!isFirebaseConfigured || !auth) {
      setCurrentUser(null);
      setSyncStatus('guest');
      return;
    }
    try {
      await signOut(auth);
      setCurrentUser(null);
      setSyncStatus('guest');
    } catch (error) {
      console.error('Sign Out Error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authLoading,
        isConfigured: isFirebaseConfigured,
        syncStatus,
        setSyncStatus,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
