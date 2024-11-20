import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function isUserLoggedIn() {
  return new Promise((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      resolve(!!user);
    });
  });
}
