import { collection, getFirestore, addDoc } from "firebase/firestore";

export default async function addUserToFirebase(userData: any) {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, "users");
    const docRef = await addDoc(usersCollection, userData);

    console.log("Usuário adicionado com ID: ", docRef.id);
    return true
  } catch (error) {
    console.error("Erro ao adicionar usuário: ", error);
    return false
  }
}
