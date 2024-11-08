import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA7fjmHnBQZeh7aYIG-81dE2_6ISIFBPdA",
  authDomain: "blogbeam-c79f3.firebaseapp.com",
  projectId: "blogbeam-c79f3",
  storageBucket: "blogbeam-c79f3.firebasestorage.app",
  messagingSenderId: "507335482649",
  appId: "1:507335482649:web:ff3b33b58e590447fcb988",
  measurementId: "G-NBFMJHE7NX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
