import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "binary-mlm-bbac3",
  appId: "1:283861305050:web:187a23d3cc13c554e987e3",
  storageBucket: "binary-mlm-bbac3.firebasestorage.app",
  apiKey: "AIzaSyAGoBAPD1msxqdPGlcHh__gjBgyOwSamDc",
  authDomain: "binary-mlm-bbac3.firebaseapp.com",
  messagingSenderId: "283861305050",
  measurementId: "G-D14FWRW2P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export commonly used services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
