import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpMqeU-zdOAYGnQSJ9HTCBuZ8cTDUaNOA",
  authDomain: "yogasanas-99e8e.firebaseapp.com",
  projectId: "yogasanas-99e8e",
  storageBucket: "yogasanas-99e8e.appspot.com",
  messagingSenderId: "942267391149",
  appId: "1:942267391149:web:6cda0cb7b60024a39efa24",
  databaseURL:"https://yogasanas-99e8e-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export services
export { auth, db, storage };
export default app;