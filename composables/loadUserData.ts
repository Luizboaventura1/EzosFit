import { getAuth, onAuthStateChanged } from "firebase/auth";

export default async function loadUserData(
  router: ReturnType<typeof useRouter>
) {
  const auth = getAuth();

  return new Promise<void>((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      try {
        const token = useCookie<boolean>("token");
        token.value = !!user;

        if (!token.value) {
          router.push("/auth/login");
          return resolve();
        }

        if (user && user.email) {
          await userStore().loadUserData(user.email);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}
