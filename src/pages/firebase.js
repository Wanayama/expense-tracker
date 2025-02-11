import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVwGW7p2DNWkr9AfbdWnJDA0JskS-8y8I",
  authDomain: "expense-tracker-933f2.firebaseapp.com",
  projectId: "expense-tracker-933f2",
  storageBucket: "expense-tracker-933f2.firebasestorage.app",
  messagingSenderId: "151201779292",
  appId: "1:151201779292:web:60a1b0fc253b47c4eee099"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);