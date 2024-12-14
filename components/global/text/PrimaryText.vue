<template>
  <h1 :class="font" class="text-light-gray font-semibold">
    <slot />
  </h1>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}>();

const font = computed(() => {
  if (props.sm) return "text-sm";
  if (props.md) return "text-base";
  if (props.lg) return "text-lg";
  if (props.xl) return "text-xl";
  return "";
});
</script>
