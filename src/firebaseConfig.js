
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración personal de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDl_6KuvfFPgvoTXnGkz4xz_ZVPv66tn40",
    authDomain: "mi-app-modular-gsg.firebaseapp.com",
    projectId: "mi-app-modular-gsg",
    storageBucket: "mi-app-modular-gsg.firebasestorage.app",
    messagingSenderId: "829432507933",
    appId: "1:829432507933:web:c0ca70a5c629ef2173a0f4",
    measurementId: "G-F7H6DKC7LH"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore y exportarlo para usarlo en la app
export const db = getFirestore(app);
