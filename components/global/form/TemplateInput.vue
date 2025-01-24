<template>
  <input
    @input="$emit('modelValue', value)"
    v-model="value"
    class="bg-transparent placeholder-neutral-500 focus:outline-none py-2 text-light-gray font-medium border border-charcoal-gray bg-dark-charcoal rounded-full px-4 w-full"
  />
</template>

<script setup lang="ts">
const { defaultValue } = defineProps<{ defaultValue?: any }>();
const value = ref(defaultValue || "");
</script>
