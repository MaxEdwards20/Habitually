// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHSlOWUMbR5zvz2DNskKtYEn63Om9XFJ4",
  authDomain: "habitually-9a2a1.firebaseapp.com",
  projectId: "habitually-9a2a1",
  storageBucket: "habitually-9a2a1.appspot.com",
  messagingSenderId: "1023252836352",
  appId: "1:1023252836352:web:1f72a907826145553d68e5",
  measurementId: "G-H6DW1M1ZNQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
