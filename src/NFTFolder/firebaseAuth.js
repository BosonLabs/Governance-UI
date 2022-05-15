import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
//import firebase from "firebase/";
//import { initializeApp } from "firebase/app";
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import firebase from '@firebase/app';
// require('firebase/auth');
// import { auth } from "firebase/app";
//import 'firebase/compat/auth';
//import "firebase/auth";
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
//import { GoogleAuthProvider, getAuth,  signInWithPopup,  signInWithEmailAndPassword,  createUserWithEmailAndPassword,  sendPasswordResetEmail,  signOut} from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBCI7P5q_yYhkutdn-ogzVvEd5tQAOgf1s",
    authDomain: "agovus.firebaseapp.com",
    databaseURL: "https://agovus-default-rtdb.firebaseio.com",
    projectId: "agovus",
    storageBucket: "agovus.appspot.com",
    messagingSenderId: "1053164251958",
    appId: "1:1053164251958:web:a6ddefce9efb0f16392197",
    measurementId: "G-WQF86SKLTL"
  };
const fireDbAuth = firebase.initializeApp(firebaseConfig);
export default fireDbAuth;  