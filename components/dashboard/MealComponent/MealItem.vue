<template>
  <li
    class="border-b border-charcoal-gray pb-3 cursor-pointer transition-colors duration-200 hover:bg-charcoal/50 p-3"
  >
    <header class="flex gap-2 justify-between items-center">
      <h1 class="text-light-gray font-medium text-base">Breakfast</h1>
      <CheckBox :checked="false" />
    </header>
    <div class="flex items-center gap-1">
      <ClockIcon size="14" />
      <span class="text-medium-gray text-sm">7:00</span>
    </div>
    <ul class="text-medium-gray text-sm">
      <li>4 ovos</li>
      <li>4 pães</li>
      <li>100ml de café</li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import CheckBox from "./CheckBox.vue";
import ClockIcon from "./ClockIcon.vue";

/* defineProps<{
  mealName: string,
  date: Date,
  foods: []
}>() */
</script>

<style scoped></style>
