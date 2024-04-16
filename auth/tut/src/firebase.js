import React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByOQwEFFsdZPy2WDC_j6RACtykrNRmxvY",
  authDomain: "authentication-9d6ce.firebaseapp.com",
  projectId: "authentication-9d6ce",
  storageBucket: "authentication-9d6ce.appspot.com",
  messagingSenderId: "38778722679",
  appId: "1:38778722679:web:45f101e9be49e849596972",
  measurementId: "G-BYH5S70YPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export { auth }