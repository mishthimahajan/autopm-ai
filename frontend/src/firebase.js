// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJcOvQIRMHRcU3kxak6gr4xYfiO1LoKeI",
  authDomain: "autopm-ai.firebaseapp.com",
  projectId: "autopm-ai",
  storageBucket: "autopm-ai.firebasestorage.app",
  messagingSenderId: "67792851442",
  appId: "1:67792851442:web:f61b9a154f85719ed25b6b",
  measurementId: "G-ZKVJ55JYEW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };