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

export function onAuthStateChanged(cb: NextOrObserver<User>) {
  return _onAuthStateChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const creds = await signInWithPopup(auth, provider);
    if (
      creds.user.metadata.creationTime === creds.user.metadata.lastSignInTime
    ) {
      // await createUser({
      //   email: creds.user.email!,
      //   id: creds.user.uid,
      //   firstName: creds.user.displayName ?? "",
      //   imageUrl: creds.user.photoURL,
      // });
    }
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
    // await createUser({
    //   email: creds.user.email!,
    //   id: creds.user.uid,
    //   firstName: userCreds.firstName,
    //   lastName: userCreds.lastName,
    //   imageUrl: creds.user.photoURL,
    // });
  } catch (error) {
    console.error(
      "Error signiup in with email and password"
      // (error as AuthError)["message"]
    );
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
