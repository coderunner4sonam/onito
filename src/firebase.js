import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB4eF_5p6vum-FYg56gOzjMblChZc9As78",
    authDomain: "onito-assignment.firebaseapp.com",
    projectId: "onito-assignment",
    storageBucket: "onito-assignment.appspot.com",
    messagingSenderId: "1039517698949",
    appId: "1:1039517698949:web:76df3a3f3773a84af212ec"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
