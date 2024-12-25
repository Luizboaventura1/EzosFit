<template>
  <section
    class="grid grid-rows-3 md:grid-rows-none md:grid-cols-2 w-full h-screen"
  >
    <div class="image-bg w-full h-full">
      <div
        class="flex justify-center items-center w-full h-full bg-black bg-opacity-70"
      >
        <EzosFitLogo size="big" />
      </div>
    </div>
    <div class="w-full h-full bg-dark-charcoal row-span-2 md:row-span-1">
      <div
        class="container mx-auto h-full flex justify-center items-start md:items-center pt-14 md:pt-0 px-8"
      >
        <main class="w-full md:max-w-md lg:max-w-lg">
          <header class="mb-10">
            <h1 class="text-light-gray font-extrabold text-2xl">Login</h1>
          </header>
          <div class="mb-10">
            <GoogleButton @click="loginWithGoogle">
              Login with Google
            </GoogleButton>
          </div>
          <article>
            <section>
              <blockquote class="text-zinc-400">
                "What doesn't kill us makes us stronger." -
                <cite>Arnold Schwarzenegger</cite>
              </blockquote>
            </section>
          </article>
        </main>
      </div>
    </div>
  </section>

  <Toast :toast />
</template>

<script setup lang="ts">
import GoogleButton from "./GoogleButton.vue";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { userDataStructure } from "~/utils/userDataStructure";
import Toast from "@/components/global/popups/Toast/index.vue";

const router = useRouter();
const toast = useToast();

const loginWithGoogle = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!(await checkIfTheUserExists(user.email ? user.email : null))) {
      Object.assign(userDataStructure, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      });

      await addUserToFirebase(userDataStructure);

      router.push("/questionnaire");
      return;
    }

    router.push("/dashboard");
  } catch (error: any) {
    toast.add({
      title: "Error logging in with Google. Come back later.",
      timeout: 3000,
    });
  }
};

useHead({
  title: "Login",
});

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    let token = useCookie<boolean>("token");
    token.value = !!user;

    if (token.value) {
      router.push("/dashboard");
    }
  });
});
</script>

<style scoped>
.image-bg {
  background-image: url(../../../assets/images/img-bodybuilder-login-page.webp);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
