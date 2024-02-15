// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnau4sRLZInYa0G3uFK3XcKT__ZUVqM1k",
  authDomain: "clientportal-25451.firebaseapp.com",
  projectId: "clientportal-25451",
  storageBucket: "gs://clientportal-25451.appspot.com",
  messagingSenderId: "1085095390031",
  appId: "1:1085095390031:web:a62841c672be6446dcf33a",
  measurementId: "G-E39JQNFB37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
