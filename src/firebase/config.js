import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Timestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDawwhibZ8NOycTA5PyRCchbfkk2ZP7AmA",
    authDomain: "my-s-1f4d4.firebaseapp.com",
    projectId: "my-s-1f4d4",
    storageBucket: "my-s-1f4d4.appspot.com",
    messagingSenderId: "685504054758",
    appId: "1:685504054758:web:35695cd16af7a88e7c4227"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const timeStamp = Timestamp

// init firestore
const db = getFirestore()

const auth = getAuth()

export { db, auth, timeStamp }