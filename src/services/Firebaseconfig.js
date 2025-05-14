
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_c_YaSzN8X4XOmopHjCw7OxUOUVCzI4s",
  authDomain: "dona-violeta.firebaseapp.com",
  projectId: "dona-violeta",
  storageBucket: "dona-violeta.firebasestorage.app",
  messagingSenderId: "918045096763",
  appId: "1:918045096763:web:be5f6c2e2ac3cd6b07d51e"
};

// 🔹 Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


