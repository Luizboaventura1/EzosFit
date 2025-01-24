<template>
  <ul
    v-for="(meal, index) in user?.meals"
    @click="openEditModal(index)"
    class="space-y-3"
  >
    <MealItem :meal="meal" :index="index" />
  </ul>

  <EditMealModal
    modal-title="Edit meal"
    @close-modal="stateMealModal = false"
    :state-modal="stateMealModal"
    :food-index="selectedMealIndex"
  />
</template>

<script setup lang="ts">
import MealItem from "./MealItem.vue";
import { storeToRefs } from "pinia";
import EditMealModal from "./EditMealModal.vue";

const { user } = storeToRefs(userStore());
const stateMealModal = ref(false);
const selectedMealIndex = ref<number | null>(null);

const openEditModal = (index: number) => {
  selectedMealIndex.value = index;
  stateMealModal.value = true;
};
</script>
