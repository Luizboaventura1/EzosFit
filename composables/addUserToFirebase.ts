import { collection, getFirestore, addDoc } from "firebase/firestore";

export default async function addUserToFirebase(userData: any): Promise<boolean> {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, "users");
    await addDoc(usersCollection, userData);

    return true;
  } catch (error) {
    throw new Error(`Error adding user: ${error instanceof Error ? error.message : error}`);
  }
}