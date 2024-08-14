import { initializeApp } from 'firebase/app '
import { getAuth } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAXJW2T0QbvD614zXXdqnhNF4guUa4R2dQ",
  authDomain: "next-first-6b29a.firebaseapp.com",
  projectId: "next-first-6b29a",
  storageBucket: "next-first-6b29a.appspot.com",
  messagingSenderId: "781132671825",
  appId: "1:781132671825:web:844b56256781af4a294170",
  measurementId: "G-8F0XE9ZBWM"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, app };
