<template>
  <Card>
    <template #icon>
      <BatteryIcon size="24" />
    </template>

    <template #title> Status Body </template>

    <template #default>
      <div class="h-full flex items-end">
        <h1 :class="statusBodyColor" class="text-4xl font-bold">
          {{ statusBody }}
        </h1>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/components/dashboard/Card/index.vue";
import BatteryIcon from "~/components/icons/BatteryIcon.vue";

import BodyCalculations from "~/utils/bodyCalculations";

type Sex = "male" | "female";
type Objective = "Lose Weight" | "Maintain Weight" | "Build Muscle";
type ActivityLevel = "Sedentary" | "Moderately Active" | "Very Active";

interface UserInfo {
  sex: Sex;
  age: number;
  height: number;
  weight: number;
  objective: Objective;
  activityLevel: ActivityLevel;
  bodyFat?: number;
}

const { user } = storeToRefs(userStore());
const bodyCalculations = ref<BodyCalculations>();
const statusBody = ref<string | null>(null);

const statusBodyColor = computed(() => {
  switch (statusBody.value) {
    case "Underweight":
      return "text-blue-500";
    case "Healthy":
      return "text-green-500";
    case "Overweight":
      return "text-yellow-500";
    case "Obese":
      return "text-red-500";
    default:
      return "text-light-gray";
  }
});

watch(user, () => {
  if (user.value && user.value.bodyMetrics) {
    const bodyMetrics = user.value.bodyMetrics as UserInfo;
    bodyCalculations.value = new BodyCalculations(bodyMetrics);

    statusBody.value = bodyCalculations.value.getHealthStatus();
  }
});
</script>
