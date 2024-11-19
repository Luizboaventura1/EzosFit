<template>
  <section class="grid grid-rows-3 md:grid-rows-none md:grid-cols-2 w-full h-screen">
    <div class="image-bg w-full h-full">
      <div class="flex justify-center items-center w-full h-full bg-black bg-opacity-70"> 
        <div class="flex gap-4 items-center"> 
          <img class="w-14 h-14" src="../../../assets/images/ezos-fit-logo.png" alt="EzosFit Logo">
          <h1 class="font-bold text-5xl text-light-gray">EzosFit</h1>
        </div>
      </div>
    </div>
    <div class="w-full h-full bg-dark-charcoal row-span-2 md:row-span-1">
      <div
        class="container mx-auto h-full flex justify-center items-start md:items-center pt-14 md:pt-0 px-8"
      >
        <main class="w-full md:max-w-md lg:max-w-lg">
          <header class="mb-10">
            <h1 class="text-light-gray font-bold text-2xl">Login</h1>
          </header>
          <div class="mb-10">
            <GoogleButton> Login with Google </GoogleButton>
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
</template>

<script setup lang="ts">
import GoogleButton from "./GoogleButton.vue";

useHead({
  title: "Login",
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
