import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  AuthError,
} from "firebase/auth";

import { auth } from "../firebase/clientApp";
import { createUser } from "@/fetch_calls";
import { addUser } from "./firestore/storage";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider).then(async (cred) => {
      await addUser({
        email: cred.user.email!,
        id: cred.user.uid,
        firstName: cred.user.displayName ?? "",
        imageUrl: cred.user.photoURL,
      });
    });
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
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
    throw error;
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
    await addUser({
      email: creds.user.email!,
      id: creds.user.uid,
      firstName: userCreds.firstName,
      lastName: userCreds.lastName,
      imageUrl: creds.user.photoURL,
    });
  } catch (error) {
    console.error("Error signiup in with email and password");
    throw error;
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
    throw error;
  }
}
