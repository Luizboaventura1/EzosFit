<template>
  <div class="bg-dark-charcoal h-screen flex justify-center items-center px-10">
    <h1 class="text-light-gray text-lg">Em fase de desenvolvimento 🚧</h1>
  </div>  
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

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

<style scoped></style>
