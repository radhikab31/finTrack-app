import {createContext, useContext, use, useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase, ref, set, get} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyC6pCvglpuhKgC_fax0yzZEm_jEETwi3-w",
  authDomain: "fintrack-app-9589d.firebaseapp.com",
  projectId: "fintrack-app-9589d",
  storageBucket: "fintrack-app-9589d.firebasestorage.app",
  messagingSenderId: "605192864602",
  appId: "1:605192864602:web:284b98da35fa3a992c2963",
  measurementId: "G-RRZZHED2MZ",
  databaseURL: "https://fintrack-app-9589d-default-rtdb.firebaseio.com/",
};

// Default data blueprint
const DEFAULT_USER_DATA = {
  finance: {
    currentBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    sourceAccounts: [], // Initial empty list
  },
  settings: {
    expenseCategories: ["food", "transport", "household", "health", "education", "savings", "entertainment"],
    incomeCategories: ["Salary", "Allowance", "Petty Cash", "Bonus"],
    paymentPlatforms: ["Cash", "Account"],
  },
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);

const firebaseAuth = getAuth(app);

export let userDet = null;

export function FirebaseProvider(props) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  // 2. Use useEffect to listen for auth changes (Session Persistence)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userRef = ref(db, `user/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setUserData(snapshot.val()); // Store your financial data in state
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const storeData = async (path, data) => {
    await set(ref(db, path), data);
  };

  const createUserwithEmailPassword = async (fname, lname, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const newUser = userCredential.user;

      // Merge profile info with default schema
      await storeData(`users/${newUser.uid}`, {
        profile: {name: `${fname} ${lname}`, email},
        ...DEFAULT_USER_DATA, // Spread the defaults here
        createdAt: new Date().toISOString(),
      });

      return userCredential;
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  const signInUser = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return result;
    } catch (error) {
      console.error("Invalid user credentials:", error);
      return null;
    }
  };

  const createUserwithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(firebaseAuth, provider);
      const googleUser = response.user;

      const userRef = ref(db, `users/${googleUser.uid}`);
      const snapshot = await get(userRef);

      // Only write if it's a first-time login
      if (!snapshot.exists()) {
        await storeData(`users/${googleUser.uid}`, {
          profile: {
            name: googleUser.displayName,
            email: googleUser.email,
          },
          ...DEFAULT_USER_DATA, // Apply defaults for new user
          createdAt: new Date().toISOString(),
        });
      }
      return response;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      return null;
    }
  };

  const logoutuser = async () => {
    try {
      await signOut(firebaseAuth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  };

  // Pass 'user' (state) in the value object instead of 'userDet'
  return (
    <FirebaseContext.Provider
      value={{
        storeData,
        createUser: createUserwithEmailPassword,
        signInUser,
        logoutuser,
        createUserwithGoogle,
        user: user, // Access this as firebase.user in components
        userData,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
}

// Custom hook
export const useFirebase = () => useContext(FirebaseContext);
