import { defineStore } from "pinia";
import {
  getFirestore,
  query,
  updateDoc,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import type User from "../types/UserType.ts";

export const userStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  const loadUserData = async (email: string) => {
    const db = getFirestore();
    
    try {
      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs[0].data()) {
        user.value = querySnapshot.docs[0].data() as User;
      } else {
        console.log("User not found in Firestore");
      }
    } catch (error) {
      console.error("Error loading user data", error);
    }
  };

  const updateUserData = async (updatedData: Partial<User>) => {
    const db = getFirestore();

    if (user.value && user.value.email) {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.value.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          await updateDoc(userDocRef, updatedData);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      console.error("No email was provided.");
    }
  };

  return {
    user,
    loadUserData,
    updateUserData,
  };
});
