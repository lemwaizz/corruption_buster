import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase/clientApp";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const creds = await signInWithPopup(auth, provider);
    // Send the user to the server
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function emailAndPasswordSignIn(userCreds: {
  email: string;
  password: string;
}) {
  try {
    const creds = await signInWithEmailAndPassword(
      auth,
      userCreds.email,
      userCreds.password
    );
  } catch (error) {
    console.error("Error signing in with email and password", error);
  }
}

export async function emailAndPasswordSignUp(userCreds: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  try {
    const creds = await createUserWithEmailAndPassword(
      auth,
      userCreds.email,
      userCreds.password
    );
    // Send the user to the server
    console.log(creds.user.email);
    console.log(creds.user.photoURL);
    console.log(creds.user.uid);
    console.log(creds.user.displayName);
  } catch (error) {
    console.error("Error signiup in with email and password", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
