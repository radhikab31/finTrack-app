import {createContext, use} from "react";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getDatabase, ref, set} from "firebase/database";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);

const firebaseAuth = getAuth(app);

export function FirebaseProvider(props) {
  const storeData = async (path, data) => {
    await set(ref(db, path), data);
  };

  const createUserwithEmailPassword = async (fname, lname, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      // Store additional user information (e.g., name) in the database
      await storeData(`users/${user.uid}`, {name: `${fname} ${lname}`, email});
      return userCredential;
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  const signInUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log("User signed in:", userCredential);
      return userCredential; // Add this return statement!
    } catch (error) {
      console.error("Invalid user credentials:", error);
      return null;
    }
  };

  const createUserwithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const response = await signInWithPopup(firebaseAuth, provider);
      console.log("Google sign-in successful:", response);
      return response;
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      return null;
    }
  };

  const logoutuser = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  };
  return <FirebaseContext.Provider value={{storeData, createUser: createUserwithEmailPassword, signInUser, logoutuser, createUserwithGoogle}}>{props.children}</FirebaseContext.Provider>;
}

export const useFirebase = () => use(FirebaseContext);
