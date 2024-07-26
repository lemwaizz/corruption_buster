"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../firebase/clientApp";

export function useUser() {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("USER" + user);
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log(authUser?.uid);
      console.log("LOADING", loading);
      if (authUser == null) {
        setLoading(false);
        return;
      }
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading };
}
