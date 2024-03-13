// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {collection, getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjtescmBKMFHfkuDqn3HY1uI23SnN1dw0",
  authDomain: "video-conference-app-dd66e.firebaseapp.com",
  projectId: "video-conference-app-dd66e",
  storageBucket: "video-conference-app-dd66e.appspot.com",
  messagingSenderId: "53010656510",
  appId: "1:53010656510:web:dc66122885fc2de6ea89af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
export const firebaseDB = getFirestore(app)
export const userRef = collection(firebaseDB,"users")
export const meetingref = collection(firebaseDB,"meetings")