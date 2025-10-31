// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl_6KuvfFPgvoTXnGkz4xz_ZVPv66tn40",
  authDomain: "mi-app-modular-gsg.firebaseapp.com",
  projectId: "mi-app-modular-gsg",
  storageBucket: "mi-app-modular-gsg.firebasestorage.app",
  messagingSenderId: "829432507933",
  appId: "1:829432507933:web:c0ca70a5c629ef2173a0f4",
  measurementId: "G-F7H6DKC7LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);