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
              <DefaultDropdown
                selectName="Select"
                :default-value="bodyMetricsQuestionnaire.objective"
                :options="[...questions.objective.options]"
                @selectedOption="
                  (val) => (bodyMetricsQuestionnaire.objective = val)
                "
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
              <DefaultDropdown
                selectName="Select"
                :default-value="bodyMetricsQuestionnaire.activityLevel"
                :options="[...questions.activityLevel.options]"
                @selectedOption="
                  (val) => (bodyMetricsQuestionnaire.activityLevel = val)
                "
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
                @modelValue="(val) => (bodyMetricsQuestionnaire.height = val)"
                :default-value="bodyMetricsQuestionnaire.height"
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
              <DefaultDropdown
                selectName="Select"
                :default-value="bodyMetricsQuestionnaire.sex"
                :options="[...questions.sex.options]"
                @selectedOption="(val) => (bodyMetricsQuestionnaire.sex = val)"
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
                @modelValue="(val) => (bodyMetricsQuestionnaire.age = val)"
                :default-value="bodyMetricsQuestionnaire.age"
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
                @modelValue="(val) => (bodyMetricsQuestionnaire.weight = val)"
                :default-value="bodyMetricsQuestionnaire.weight"
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
                @modelValue="(val) => (bodyMetricsQuestionnaire.bodyFat = val)"
                :default-value="bodyMetricsQuestionnaire.bodyFat"
                unit="%"
              />
            </div>
          </div>
        </Transition>
      </main>
      <footer class="flex justify-between gap-4 items-center">
        <SecondaryButton
          v-if="!stepperControl.steppers[1]"
          @click="stepperControl.previous()"
        >
          Prev
        </SecondaryButton>

        <SecondaryButton
          v-if="!stepperControl.steppers[7]"
          class="ms-auto"
          @click="stepperControl.next()"
        >
          Next
        </SecondaryButton>

        <SecondaryButton
          v-if="stepperControl.steppers[7]"
          @click="saveBodyMetrics(bodyMetricsQuestionnaire)"
        >
          Finish
        </SecondaryButton>
      </footer>
    </div>
  </div>

  <Toast :toast />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import IntroForm from "@/components/questionnaire/IntroForm.vue";
import type User from "@/types/UserType";
import { userDataStructure } from "@/utils/userDataStructure";
import DefaultDropdown from "~/components/global/dropdowns/DefaultDropdown.vue";
import SecondaryButton from "../../components/global/buttons/SecondaryButton.vue";
import PrimaryText from "@/components/global/text/PrimaryText.vue";
import NumberInputForm from "@/components/questionnaire/NumberInputForm.vue";
import Toast from "@/components/global/popups/Toast/index.vue";
import validateAllMetrics from "@/utils/bodyMetricsValidation/validateAllMetrics";
import validateCurrentQuestion from "@/utils/bodyMetricsValidation/validateCurrentQuestion";

const router = useRouter();
const { user } = storeToRefs(userStore());
const toast = useToast();
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
const bodyMetricsQuestionnaire = ref<User["bodyMetrics"]>({
  ...userDataStructure.bodyMetrics,
});

type BodyMetrics = User["bodyMetrics"];

interface Stepper {
  steppers: { [id: number]: boolean };
  currentStepper: number;
  next: () => void;
  previous: () => void;
}

const stepperControl = ref<Stepper>({
  steppers: {
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  },
  currentStepper: 1,
  next: function () {
    const totalSteps = Object.keys(this.steppers).length;

    if (
      this.currentStepper < totalSteps &&
      validateCurrentQuestion(
        this.currentStepper,
        bodyMetricsQuestionnaire.value
      )
    ) {
      this.steppers[this.currentStepper] = false;
      ++this.currentStepper;
      this.steppers[this.currentStepper] = true;
    } else if (
      !validateCurrentQuestion(
        this.currentStepper,
        bodyMetricsQuestionnaire.value
      )
    ) {
      toast.add({
        title: "Check that the above information is correct.",
        timeout: 5000,
      });
    }
  },
  previous: function () {
    // Check if the current step is greater than 1 (to avoid going to a non-existent step)
    if (this.currentStepper > 1) {
      this.steppers[this.currentStepper] = false;
      --this.currentStepper;
      this.steppers[this.currentStepper] = true;
    }
  },
});

const saveBodyMetrics = (bodyMetrics: BodyMetrics) => {
  if (validateAllMetrics(bodyMetrics) && user.value) {
    user.value.bodyMetrics = bodyMetrics;

    userStore().updateUserData({
      bodyMetrics: bodyMetrics,
    });

    router.push("/dashboard");
  } else {
    toast.add({
      title: "Check that the above information is correct.",
      timeout: 5000,
    });
  }
};

onMounted(async () => {
  await loadUserData(router).then(() => {
    if (user.value && isBodyMetricsValid(user.value.bodyMetrics)) {
      router.push("/dashboard");
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
