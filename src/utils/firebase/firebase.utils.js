import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-QwXFFarI27sn6J9eybq0tE2PrDk6fe0",
  authDomain: "crwn-clothing-db-4e536.firebaseapp.com",
  projectId: "crwn-clothing-db-4e536",
  storageBucket: "crwn-clothing-db-4e536.appspot.com",
  messagingSenderId: "20402902122",
  appId: "1:20402902122:web:9626aa62a33b1571752613"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async userAuth => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  //if user does not exist create/set the document with data from userauth in collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // the below passes data that we want to set the new user with
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // if user exists
  return userDocRef;
};
