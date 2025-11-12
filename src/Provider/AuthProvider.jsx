import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

const auth = getAuth(app);
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔹 FIXED — updated to store user after Google login
  const signInWithGoogle = () => {
    
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedUser = result.user;
        console.log("Google login user:", loggedUser); // ✅ check photoURL here
        setUser(loggedUser); // 🔹 make sure state updates instantly
        return loggedUser;
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // 🔹 Added console.log to verify photoURL is present
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User:", currentUser); // ✅ see if photoURL appears here
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading, 
    setUser,
    createUser,
    logOut,
    signIn,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
