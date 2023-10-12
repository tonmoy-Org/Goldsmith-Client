// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkKKVX3FYsWQjnsHIHPG_xj_jVhPZV8A0",
  authDomain: "goldsmith-org.firebaseapp.com",
  projectId: "goldsmith-org",
  storageBucket: "goldsmith-org.appspot.com",
  messagingSenderId: "47571157949",
  appId: "1:47571157949:web:dd5842502671f3dd38c8d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;