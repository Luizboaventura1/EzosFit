<template>
  <header class="h-[95vh] overflow-hidden">
    <nav class="flex items-center w-full h-[100px] px-4">
      <div class="grid gap-3 grid-cols-[auto,1fr] container mx-auto">
        <div>
          <a href="/">
            <EzosFitLogo size="small" />
          </a>
        </div>
        <div class="flex justify-end">
          <NuxtLink to="/auth/login">
            <button
              class="bg-primary-color hover:bg-primary-color/80 sm:hover:bg-white text-white transition-all duration-300 sm:text-neutral-700 sm:bg-white py-3 px-12 font-semibold rounded-md"
            >
              Login
            </button>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <main
      class="grid gap-4 grid-cols-1 md:grid-cols-2 items-center container mx-auto px-4 h-[calc(100vh-100px)] transition-all duration-1000"
    >
      <div class="text-center sm:text-left">
        <h1
          class="text-neutral-200 font-extrabold text-5xl lg:text-7xl mb-6 transition-all duration-1000"
        >
          Better control your earnings
        </h1>
        <p
          class="text-neutral-300 font-semibold text-base sm:text-lg md:text-xl mb-12 transition-all duration-1000"
        >
          Enhance your results with precise, detailed control, empowering you to
          reach the next level.
        </p>
        <NuxtLink to="auth/login">
          <button
            class="bg-primary-color hover:bg-primary-color/80 text-white py-4 px-10 md:px-12 font-semibold rounded-md transition-all duration-300"
          >
            Start Your Journey
          </button>
        </NuxtLink>
      </div>
    </main>
  </header>

  <BrandSlider />

  <section class="bg-dark-charcoal py-12 md:py-24">
    <div
      class="grid gap-16 items-center grid-cols-1 md:grid-cols-2 container mx-auto px-4"
    >
      <div>
        <h1
          class="text-neutral-100 font-bold text-5xl lg:text-7xl mb-5 transition-all duration-1000"
        >
          Set Your <span class="text-primary-color">Meals</span>
        </h1>
        <h2
          class="text-neutral-300 font-semibold text-base sm:text-lg md:text-xl transition-all duration-1000"
        >
          Add the foods in your diet, name and time and get feedback on your
          progress dashboard
        </h2>
      </div>
      <div class="flex justify-center items-center">
        <img
          src="../assets/images/meal-example.webp"
          class="w-full lg:w-[80%] transition-all duration-1000"
          alt="Meal Modal"
        />
      </div>
    </div>
  </section>

  <section class="bg-dark-charcoal py-24">
    <div
      class="grid gap-14 grid-cols-1 lg:grid-cols-3 container mx-auto px-4 transition-all duration-1000"
    >
      <div
        class="bg-gradient-to-tr from-dark-charcoal to-neutral-800 px-6 py-10 rounded-3xl shadow-lg border border-neutral-700 transition-all duration-1000"
      >
        <h1
          class="flex gap-4 items-center text-2xl font-bold mb-12 text-neutral-100 transition-all duration-1000"
        >
          <div class="bg-primary-color p-2 rounded-xl">
            <EatIcon size="24" />
          </div>
          Food Control
        </h1>
        <p class="text-neutral-300 text-xl transition-all duration-1000">
          Easily track your calories and macronutrients and maximize your gains
        </p>
      </div>
      <div
        class="bg-gradient-to-tr from-dark-charcoal to-neutral-800 px-6 py-10 rounded-3xl shadow-lg border border-neutral-700 transition-all duration-1000"
      >
        <h1
          class="flex gap-4 items-center text-2xl font-bold mb-12 text-neutral-100"
        >
          <div class="bg-primary-color p-2 rounded-xl">
            <ProgressIcon size="24" />
          </div>
          Progress Tracker
        </h1>
        <p class="text-neutral-300 text-xl">
          Monitor your weight, body fat percentage, and muscle growth over time
        </p>
      </div>
      <div
        class="bg-gradient-to-tr from-dark-charcoal to-neutral-800 px-6 py-10 rounded-3xl shadow-lg border border-neutral-700 transition-all duration-1000"
      >
        <h1
          class="flex gap-4 items-center text-2xl font-bold mb-12 text-neutral-100"
        >
          <div class="bg-primary-color p-2 rounded-xl">
            <WaterIcon size="24" />
          </div>
          Hydration Monitor
        </h1>
        <p class="text-neutral-300 text-xl">
          Stay hydrated by tracking your water intake and set daily goals
        </p>
      </div>
    </div>
  </section>

  <section class="bg-dark-charcoal py-12 md:py-24">
    <div class="flex justify-center container mx-auto px-4 text-center">
      <div class="max-w-4xl">
        <h1 class="text-5xl lg:text-7xl mb-10 text-neutral-100 font-bold">Start <span class="text-primary-color">now</span> without paying anything</h1>
        <NuxtLink to="auth/login">
          <button
            class="bg-primary-color hover:bg-primary-color/80 text-white py-4 px-10 md:px-12 font-semibold rounded-md transition-all duration-300"
          >
            Start Your Journey
          </button>
        </NuxtLink>
      </div>
    </div>
  </section>

  <Footer />
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";
import EzosFitLogo from "~/components/global/EzosFitLogo.vue";
import BrandSlider from "~/components/home/BrandSlider.vue";
import EatIcon from "~/components/icons/EatIcon.vue";
import ProgressIcon from "~/components/icons/ProgressIcon.vue";
import WaterIcon from "~/components/icons/WaterIcon.vue";
import Footer from "~/layouts/Footer.vue";

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

<style scoped>
header {
  background-image: url("../assets/images/background-ezosfit.webp");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
