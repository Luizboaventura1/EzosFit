import { setDoc, doc, getFirestore } from "firebase/firestore";

export default async function addUserToFirebase(userData: any) {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, "users", userData.uid);  // Use o uid como ID do documento
    await setDoc(userDocRef, userData);  // Cria ou atualiza o documento com os dados

    console.log("Usuário adicionado com ID: ", userData.uid);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar usuário: ", error);
    return false;
  }
}
