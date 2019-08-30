import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyD8L-n7U5WEWCPlyxlW3ARnF14knp-lc_Q',
  authDomain: 'think-piece-953f0.firebaseapp.com',
  databaseURL: 'https://think-piece-953f0.firebaseio.com',
  projectId: 'think-piece-953f0',
  storageBucket: '',
  messagingSenderId: '670930039772',
  appId: '1:670930039772:web:f0f31e3f91e23d5d',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

window.firebase = firebase;

export default firebase;
