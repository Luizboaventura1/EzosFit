<template>
  <Card>
    <template #icon>
      <ProgressIcon size="24" />
    </template>

    <template #title> Progress of the day </template>

    <template #default>
      <div class="h-full flex items-end">
        <div class="w-full">
          <div class="mb-3">
            <h1 class="text-medium-gray">
              Completed
              <span class="text-light-gray font-semibold"
                >{{ currentProgress }}%</span
              >
            </h1>
          </div>

          <div>
            <ProgressBar :progress="currentProgress" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/components/dashboard/Card/index.vue";
import ProgressIcon from "~/components/icons/ProgressIcon.vue";
import ProgressBar from "./ProgressBar.vue";

const { user } = storeToRefs(userStore());
const totalCompletedMeals = ref(0);
const totalMeals = ref(0);

const currentProgress = computed(() => {
  return (totalCompletedMeals.value / totalMeals.value) * 100 || 0;
});

onMounted(() => {
  if (user.value && user.value.meals) {
    user.value.meals.forEach((meal) => {
      if (meal.completed) {
        totalCompletedMeals.value += 1;
      }
    });

    totalMeals.value = user.value.meals.length;
  }
});

watch(
  user,
  () => {
    if (user.value && user.value.meals) {
      totalCompletedMeals.value = 0;

      user.value.meals.forEach((meal) => {
        if (meal.completed) {
          totalCompletedMeals.value += 1;
        }
      });

      totalMeals.value = user.value.meals.length;
    }
  },
  { deep: true }
);
</script>
