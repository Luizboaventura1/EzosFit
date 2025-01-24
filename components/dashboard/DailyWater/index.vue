<template>
  <Card>
    <template #icon>
      <WaterIcon size="24" />
    </template>

    <template #title> Water </template>

    <template #action>
      <button
        @click="toggleWaterModal"
        class="rounded-lg bg-transparent hover:bg-charcoal p-[10px] border border-charcoal-gray transition-colors duration-200"
      >
        <PencilIcon size="18" />
      </button>
    </template>

    <template #default>
      <div class="h-full flex items-end">
        <h1 class="text-2xl">
          <span class="text-light-gray font-bold">{{ waterConsumed }}ml</span
          ><span class="text-medium-gray">/{{ waterTarget }}ml</span>
        </h1>
      </div>
    </template>
  </Card>

  <AddWater @close-modal="toggleWaterModal" :state-modal="stateWaterModal" />
</template>

<script setup lang="ts">
import Card from "@/components/dashboard/Card/index.vue";
import WaterIcon from "~/components/icons/WaterIcon.vue";
import BodyCalculations from "~/utils/bodyCalculations";
import PencilIcon from "~/components/icons/PencilIcon.vue";
import AddWater from "./AddWater.vue";

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
const waterTarget = ref<number | null>(null);
const waterConsumed = ref<number | null>(null);
const stateWaterModal = ref(false);
const toggleWaterModal = () => (stateWaterModal.value = !stateWaterModal.value);

watch(
  user,
  () => {
    if (user.value && user.value.bodyMetrics) {
      const bodyMetrics = user.value.bodyMetrics as UserInfo;
      bodyCalculations.value = new BodyCalculations(bodyMetrics);

      waterTarget.value = bodyCalculations.value.calculateWaterIntake();
      waterConsumed.value = user.value.dailyLog?.dailyConsumption?.water || 0;
    }
  },
  { deep: true }
);
</script>
