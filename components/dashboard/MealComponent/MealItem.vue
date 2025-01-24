<template>
  <li
    class="border-b border-charcoal-gray pb-3 cursor-pointer transition-colors duration-200 hover:bg-charcoal/50 p-3"
  >
    <header class="flex gap-2 justify-between items-center mb-1">
      <h1 class="text-light-gray font-medium text-base">
        {{ props.meal.mealName }}
      </h1>
      <CheckBox @click="checkButton" :checked="checked" />
    </header>
    <div class="flex items-center gap-1">
      <ClockIcon size="14" />
      <span class="text-medium-gray text-sm">{{
        formatTime(props.meal.date)
      }}</span>
    </div>
    <ul class="text-medium-gray text-sm">
      <li v-for="food in props.meal.foods" class="flex gap-3 items-center">
        {{ food.name }} {{ food.quantity }}g
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import CheckBox from "./CheckBox.vue";
import ClockIcon from "./ClockIcon.vue";
import type Meal from "~/types/MealType";
import formatTime from "@/utils/formatTime";

const props = defineProps<{
  meal: Meal;
  index: number | null;
}>();

const checked = ref(false);

const { user } = storeToRefs(userStore());

const checkButton = () => {
  checked.value = !checked.value;

  if (user.value && user.value.meals && props.index !== null) {
    user.value.meals[props.index].completed = checked.value;

    userStore().updateUserData(user.value);
  }
};

onMounted(() => {
  if (user.value && user.value.meals && props.index !== null) {
    checked.value = user.value.meals[props.index].completed;
  }
});

watch(
  user,
  () => {
    if (user.value && user.value.meals && props.index !== null) {
      checked.value = user.value.meals[props.index].completed;
    }
  },
  { deep: true }
);
</script>

<style scoped></style>
