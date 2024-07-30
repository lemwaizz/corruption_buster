import { User } from "@/types";
import admin from "../init";

const db = admin.firestore();

export const createUser = async (user: User): Promise<void> => {
  const userRef = db.collection("users").doc(user.id);
  console.log("CREATING THE USER👤👤 ");
  try {
    const doc = await userRef.get();
    if (doc.exists) {
      console.log("User already exists");
      throw new Error("user exists");
    }
    await userRef.set({
      addedAt: admin.firestore.FieldValue.serverTimestamp(),
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error("Error ❌❌:", error);
    throw error;
  }
};

export const getUserDetails = async (userId: string): Promise<User> => {
  const userRef = db.collection("users").doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("The user doesnt exist");
    throw Error("User doesnt exist");
  }
  const user = doc.data();
  if (!user) {
    throw Error("Unknown error");
  }
  return {
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    imageUrl: user.imageUrl,
    lastName: user.lastName,
  };
};
