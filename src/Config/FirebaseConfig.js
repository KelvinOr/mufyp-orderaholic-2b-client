// Import the functions you need from the SDKs you need
//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCjH8g4cTLOztPFcfIdImlUbUbMt-TpfEk",
  authDomain: "orderaholic-f387d.firebaseapp.com",
  projectId: "orderaholic-f387d",
  storageBucket: "orderaholic-f387d.appspot.com",
  messagingSenderId: "297782769824",
  appId: "1:297782769824:web:1401326d175d1de73471c5",
  measurementId: "G-MYH5X4MXR8"
};

// Initialize Firebase
// const analytics = getAnalytics(Firebaseapp);

const app = initializeApp(firebaseConfig);

export default app;


