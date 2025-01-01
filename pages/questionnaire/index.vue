<template>
  <div class="flex items-center justify-center h-screen bg-dark-charcoal">
    <div class="container max-w-2xl px-4 mx-auto">
      <IntroForm />
      <main class="mb-16">
        <Transition mode="out-in">
          <!-- Question 1 -->
          <div v-if="stepperControl.steppers[1]">
            <header class="text-center mb-16">
              <PrimaryText class="text-3xl lg:text-4xl">
                {{ questions.objective.question }}
              </PrimaryText>
            </header>
            <div class="flex justify-center">
              <Dropdown
                selectName="Select"
                :options="[...questions.objective.options]"
              />
            </div>
          </div>
          <!-- Question 2 -->
          <div v-else-if="stepperControl.steppers[2]">
            <header class="text-center mb-16">
              <PrimaryText class="text-3xl lg:text-4xl">
                {{ questions.activityLevel.question }}
              </PrimaryText>
            </header>
            <div class="flex justify-center">
              <Dropdown
                selectName="Select"
                :options="[...questions.activityLevel.options]"
              />
            </div>
          </div>
          <!-- Question 3 -->
          <div v-else-if="stepperControl.steppers[3]">
            <header class="text-center mb-16">
              <PrimaryText class="text-3xl lg:text-4xl">
                {{ questions.height.question }}
              </PrimaryText>
            </header>
            <div class="flex justify-center">
              <NumberInputForm
                @modelValue="(val) => console.log(val)"
                unit="cm"
              />
            </div>
          </div>
          <!-- Question 4 -->
          <div v-else-if="stepperControl.steppers[4]">
            <header class="text-center mb-16">
              <PrimaryText class="text-3xl lg:text-4xl">
                {{ questions.sex.question }}
              </PrimaryText>
            </header>
            <div class="flex justify-center">
              <Dropdown
                selectName="Select"
                :options="[...questions.sex.options]"
              />
            </div>
          </div>
          <!-- Question 5 -->
          <div v-else-if="stepperControl.steppers[5]">
            <header class="text-center mb-16">
              <PrimaryText class="text-3xl lg:text-4xl">
                {{ questions.age.question }}
              </PrimaryText>
            </header>
            <div class="flex justify-center">
              <NumberInputForm
                @modelValue="(val) => console.log(val)"
                unit="years"
              />
            </div>
          </div>
          <!-- Question 6 -->
          <div v-else-if="stepperControl.steppers[6]">
            <header class="text-center mb-16">
              <PrimaryText class="text-3xl lg:text-4xl">
                {{ questions.weight.question }}
              </PrimaryText>
            </header>
            <div class="flex justify-center">
              <NumberInputForm
                @modelValue="(val) => console.log(val)"
                unit="kg"
              />
            </div>
          </div>
          <!-- Question 7 -->
          <div v-else-if="stepperControl.steppers[7]">
            <header class="text-center mb-16">
              <PrimaryText class="text-3xl lg:text-4xl">
                {{ questions.bodyFat.question }}
              </PrimaryText>
              <h2 class="text-medium-gray mt-3">
                Remember, the <strong>BF</strong> is optional, but if it is not
                filled in it may affect the calculations. You can change it
                later on the dashboard
              </h2>
            </header>
            <div class="flex justify-center">
              <NumberInputForm
                @modelValue="(val) => console.log(val)"
                unit="%"
              />
            </div>
          </div>
        </Transition>
      </main>
      <footer class="flex justify-between gap-4 items-center">
        <SecondaryButton @click="stepperControl.previous()">
          Prev
        </SecondaryButton>
        <SecondaryButton @click="stepperControl.next()"> Next </SecondaryButton>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import IntroForm from "~/components/questionnaire/IntroForm.vue";
import type User from "~/types/UserType";
import { userDataStructure } from "@/utils/userDataStructure";
import Dropdown from "~/components/global/Dropdowns/Dropdown.vue";
import SecondaryButton from "../../components/global/buttons/SecondaryButton.vue";
import PrimaryText from "~/components/global/text/PrimaryText.vue";
import NumberInputForm from "~/components/questionnaire/NumberInputForm.vue";

const router = useRouter();
const { user } = storeToRefs(userStore());
const questions = {
  sex: {
    question: "What is your sex?",
    options: ["Male", "Female"],
  },
  age: {
    question: "What is your age?",
  },
  height: {
    question: "What is your height?",
  },
  weight: {
    question: "What is your weight?",
  },
  bodyFat: {
    question: "What is your body fat percentage? (optional)",
  },
  activityLevel: {
    question: "What is your activity level?",
    options: ["Sedentary", "Moderately Active", "Very Active"],
  },
  objective: {
    question: "What is your objective?",
    options: ["Lose Weight", "Maintain Weight", "Build Muscle"],
  },
} as const;
const bodyMetricsQuestionnaire: User["bodyMetrics"] = {
  ...userDataStructure.bodyMetrics,
};

interface Stepper {
  steppers: { [id: number]: boolean };
  currentStepper: number;
  next: () => void;
  previous: () => void;
}

const stepperControl = ref<Stepper>({
  steppers: { 1: true, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false },
  currentStepper: 1,
  next: function () {
    const totalSteps = Object.keys(this.steppers).length;
    if (this.currentStepper < totalSteps) {
      this.steppers[this.currentStepper] = false;
      ++this.currentStepper;
      this.steppers[this.currentStepper] = true;
    }
  },
  previous: function () {
    if (this.currentStepper > 1) {
      this.steppers[this.currentStepper] = false;
      --this.currentStepper;
      this.steppers[this.currentStepper] = true;
    }
  },
});

onMounted(async () => {
  await loadUserData(router).then(() => {
    if (
      user.value &&
      user.value.bodyMetrics &&
      isBodyMetricsValid(user.value.bodyMetrics)
    ) {
      router.push("/questionnaire");
    }
  });
});
</script>

<style setup lang="scss">
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
