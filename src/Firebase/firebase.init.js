// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_zYOdJfi6odcp40dlDNDyd2Wts0EOEJY",
  authDomain: "fir-1-ccdcc.firebaseapp.com",
  projectId: "fir-1-ccdcc",
  storageBucket: "fir-1-ccdcc.firebasestorage.app",
  messagingSenderId: "223041367051",
  appId: "1:223041367051:web:6a33f5ddd2fa2166762b0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

