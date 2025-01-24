<template>
  <Card>
    <template #icon>
      <EatIcon size="24" />
    </template>

    <template #title> Daily Macro Goals </template>

    <template #default>
      <div class="grid gap-3 grid-cols-2">
        <div>
          <ul>
            <li class="font-light text-medium-gray">Protein</li>
            <li class="font-light text-medium-gray">Carbohydrate</li>
            <li class="font-light text-medium-gray">Fat</li>
            <li class="font-light text-medium-gray">Calories</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <span class="text-light-gray font-semibold">0g</span
              ><span class="text-medium-gray"
                >/{{ macronutrientsTarget?.protein }}g</span
              >
            </li>
            <li>
              <span class="text-light-gray font-semibold">0g</span
              ><span class="text-medium-gray"
                >/{{ macronutrientsTarget?.carbs }}g</span
              >
            </li>
            <li>
              <span class="text-light-gray font-semibold">0g</span
              ><span class="text-medium-gray"
                >/{{ macronutrientsTarget?.fats }}g</span
              >
            </li>
            <li>
              <span class="text-light-gray font-semibold">0cal</span
              ><span class="text-medium-gray"
                >/{{ macronutrientsTarget?.calories }}cal</span
              >
            </li>
          </ul>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "@/components/dashboard/Card/index.vue";
import EatIcon from "~/components/icons/EatIcon.vue";
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

interface MacronutrientsTarget {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

const { user } = storeToRefs(userStore());
const bodyCalculations = ref<BodyCalculations>();
const macronutrientsTarget = ref<MacronutrientsTarget | null>(null);

watch(
  user,
  () => {
    if (user.value && user.value.bodyMetrics) {
      const bodyMetrics = user.value.bodyMetrics as UserInfo;
      bodyCalculations.value = new BodyCalculations(bodyMetrics);

      macronutrientsTarget.value = bodyCalculations.value.calculateMacros();
    }
  },
  { deep: true }
);
</script>
