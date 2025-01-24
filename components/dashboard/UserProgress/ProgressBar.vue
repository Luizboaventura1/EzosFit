<template>
  <div class="h-8 rounded-full bg-charcoal w-full overflow-hidden">
    <div
      :style="`width:${props.progress || 0}%;`"
      class="bg-primary-color rounded-full h-full transition-all duration-500"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  progress: number;
}>();
</script>

<style scoped></style>
