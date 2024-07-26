import admin from "./init";

export const verifyIdToken = async (
  idToken: string | undefined
): Promise<string | null> => {
  if (!idToken) return null;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    console.log(error);
    return null;
  }
};
