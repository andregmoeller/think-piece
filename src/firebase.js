import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyD8L-n7U5WEWCPlyxlW3ARnF14knp-lc_Q',
  authDomain: 'think-piece-953f0.firebaseapp.com',
  databaseURL: 'https://think-piece-953f0.firebaseio.com',
  projectId: 'think-piece-953f0',
  storageBucket: 'gs://think-piece-953f0.appspot.com',
  messagingSenderId: '670930039772',
  appId: '1:670930039772:web:f0f31e3f91e23d5d',
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return getUserDocument(user.uid);
};
export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};

window.firebase = firebase;

export default firebase;
