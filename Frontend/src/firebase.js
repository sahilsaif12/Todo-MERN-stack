import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBMY-ScJNmpotGy9fPRB38F-H0jJutfcq8",
  authDomain: "todo-52e04.firebaseapp.com",
  projectId: "todo-52e04",
  storageBucket: "todo-52e04.appspot.com",
  messagingSenderId: "914664899728",
  appId: "1:914664899728:web:a0956af41b033ff8140415",
  measurementId: "G-KYND112J7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
