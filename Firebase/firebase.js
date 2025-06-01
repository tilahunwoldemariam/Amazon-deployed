// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUlv6Ne3-B3rkxGstiaJI2ZRwYz7lTTE8",
  authDomain: "pro-1f85b.firebaseapp.com",
  projectId: "pro-1f85b",
  storageBucket: "pro-1f85b.firebasestorage.app",
  messagingSenderId: "961780648413",
  appId: "1:961780648413:web:8bf41a19fdc15cf1078e34",
  measurementId: "G-RTPKQTL41V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db = getFirestore(app)
