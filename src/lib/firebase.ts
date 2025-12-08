
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: "test-76193",
  storageBucket: "test-76193.firebasestorage.app",
  messagingSenderId: "1094893950791",
  appId: "1:1094893950791:web:36ec87f688d89b96be5e62",
  measurementId: "G-4S2ZNH2H6Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);