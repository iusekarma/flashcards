import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDpk99wJvYohJs_Bq8M6_ksqug4LXEFyoo",
  authDomain: "flashcards-1189d.firebaseapp.com",
  projectId: "flashcards-1189d",
  storageBucket: "flashcards-1189d.appspot.com",
  messagingSenderId: "1083794500531",
  appId: "1:1083794500531:web:b8c1d5c8075b9d880039c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;