<template>
  <ul v-for="meal in 4" class="space-y-3">
    <MealItem   />
  </ul>
</template>

<script setup lang="ts">
import MealItem from './MealItem.vue';


</script>

<style scoped>

</style>