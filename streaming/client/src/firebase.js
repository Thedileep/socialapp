// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfsRRo3Qp7CPmOnaLa_BC-Rl4lVQhwV48",
  authDomain: "stream-cc137.firebaseapp.com",
  projectId: "stream-cc137",
  storageBucket: "stream-cc137.appspot.com",
  messagingSenderId: "839752499540",
  appId: "1:839752499540:web:a40d616395af8d627a08c1",
  measurementId: "G-ZL0F2ZVFXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eslint-disable-next-line
const auth=getAuth(app);

export { auth };