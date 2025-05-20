// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjNTG5OBdHDP4Ny_8vqiksmDFdpSFkdHE",
  authDomain: "netflixgpt-b5fac.firebaseapp.com",
  projectId: "netflixgpt-b5fac",
  storageBucket: "netflixgpt-b5fac.firebasestorage.app",
  messagingSenderId: "282639227520",
  appId: "1:282639227520:web:b349cbc91a465998aa6465",
  measurementId: "G-YS2G89368W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
