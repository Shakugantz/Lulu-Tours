import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbZvmQfHpSohCwbKRPOnW4Nk2CeiTMPWk",
  authDomain: "webtour-lulu-reviews.firebaseapp.com",
  projectId: "webtour-lulu-reviews",
  storageBucket: "webtour-lulu-reviews.firebasestorage.app",
  messagingSenderId: "471076204475",
  appId: "1:471076204475:web:186d770791695c45a21e9e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Exporta todo desde aquí
export { db, storage, collection, addDoc, getDocs };
