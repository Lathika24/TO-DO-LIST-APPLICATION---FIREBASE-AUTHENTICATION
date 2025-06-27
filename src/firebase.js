import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPplFUTyKlQakptu6cDljAJPqG5xAssiM",  // your actual API key only
  authDomain: "todo-app-6e7e3.firebaseapp.com",
  projectId: "todo-app-6e7e3",
  storageBucket: "todo-app-6e7e3.appspot.com",
  messagingSenderId: "1090106528198",
  appId: "1:1090106528198:web:323a179e8132e17705e2c7"  // your actual App ID only
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Fix: Export `app` along with `db` and `auth`
export { app, db, auth };
