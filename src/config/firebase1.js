import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAAXgi4kLzfJlz_OxVy94CZmDjHnSrk0M",
  authDomain: "yoga1-3d95c.firebaseapp.com",
  projectId: "yoga1-3d95c",
  storageBucket: "yoga1-3d95c.firebasestorage.app",
  messagingSenderId: "397693250120",
  appId: "1:397693250120:web:b0ba696d6b4c3f57b2867d",
  databaseURL: "https://yoga1-3d95c-default-rtdb.firebaseio.com/"
};

// Instead of directly initializing, check if an app already exists
let firebaseApp;
try {
  firebaseApp = getApp(); // Try to get existing app
} catch (e) {
  firebaseApp = initializeApp(firebaseConfig); // Initialize if not exists
}

export const db = getFirestore(firebaseApp);
export const rtdb = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);
