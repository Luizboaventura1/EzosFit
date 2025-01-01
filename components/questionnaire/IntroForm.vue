<template>
  <Transition>
    <div
      v-if="introFormState"
      class="bg-dark-charcoal fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50"
    >
      <div class="container max-w-2xl mx-auto px-4">
        <div>
          <h1 class="text-center font-bold text-light-gray text-xl md:text-2xl">
            {{ getFirstName(user?.name || "") }}, please fill in the necessary information so we can
            help you achieve your goals.
          </h1>
          <div class="flex justify-center mt-10">
            <button
              @click="introFormState = false"
              class="px-10 py-2 font-bold text-light-gray transition-colors duration-300 bg-primary-color rounded-full hover:bg-primary-color/70"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import getFirstName from "@/utils/getFirstName"

const { user } = storeToRefs(userStore());
const introFormState = ref(true);
</script>

<style setup lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
