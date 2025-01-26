<template>
  <div
    class="brand-slider p-4 bg-neutral-900 border-y border-neutral-600 overflow-hidden"
  >
    <div
      :class="[
        'flex',
        'gap-20',
        'items-center',
        'text-light-gray',
        animationClass,
      ]"
      ref="slider"
    >
      <div v-for="(brand, index) in 40" :key="index" class="brand-item">
        EzosFit
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const slider = ref<HTMLDivElement | null>(null);
const animationClass = ref("animate-scroll");

const restartAnimation = () => {
  if (slider.value) {
    slider.value.classList.remove("animate-scroll");

    void slider.value.offsetWidth;

    slider.value.classList.add("animate-scroll");
  }
};

onMounted(() => {
  const interval = setInterval(restartAnimation, 15000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
.brand-slider {
  width: 100%;
  overflow: hidden;
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.brand-item {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
