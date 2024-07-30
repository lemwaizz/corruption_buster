import { Politician, ReachOutToUs, User } from "@/types";
import { db } from "../clientApp";
import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { removeNullValues } from "@/utils/remove_null_values";

export const addUser = async (user: User) => {
  try {
    await setDoc(doc(db, "users", user.id), {
      firstName: user.firstName,
      lastName: user.lastName ? user.lastName : null,
      imageUrl: user.imageUrl ? user.imageUrl : null,
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error("There was an error creating the user");
    console.error(error);
  }
};

export const getUser = async (userId: string): Promise<User> => {
  const userRef = doc(db, "users", userId);
  const userSnapShot = await getDoc(userRef);
  const user = userSnapShot.data();
  if (!user) {
    throw Error("user not found");
  }
  return {
    firstName: user.firstName,
    lastName: user.lastName ? user.lastName : null,
    imageUrl: user.imageUrl ? user.imageUrl : null,
    id: user.id,
    email: user.email,
  };
};

export const submitReachOutToUs = async (reachOutToUs: ReachOutToUs) => {
  try {
    await addDoc(collection(db, "reachOutToUs"), reachOutToUs);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPoliticians = async (): Promise<Politician[]> => {
  const q = query(collection(db, "politicians"));
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      description: data.description,
      imageUrl: data.imageUrl,
      name: data.name,
      politicalCategory: data.politicalCategory,
    };
  });
};

export const getPolitician = async (
  politicianId: string
): Promise<Politician> => {
  const politicianRef = doc(db, "politicians", politicianId);
  const politicianSnapshot = await getDoc(politicianRef);
  if (!politicianSnapshot.exists()) {
    throw Error("not Found");
  }
  const data = politicianSnapshot.data();
  return {
    id: politicianSnapshot.id,
    description: data.description,
    name: data.name,
    imageUrl: data.imageUrl,
    politicalCategory: data.politicalCategory,
  };
};

export const updateUser = async (userUpdate: {
  userId: string;
  firstName: string | undefined;
  lastName: string | undefined;
}) => {
  if (!userUpdate.firstName && !userUpdate.lastName) {
    return;
  }
  const userRef = doc(db, "users", userUpdate.userId);
  const user = {
    firstName: userUpdate.firstName,
    lastName: userUpdate.lastName,
  };
  await updateDoc(userRef, removeNullValues(user));
};
