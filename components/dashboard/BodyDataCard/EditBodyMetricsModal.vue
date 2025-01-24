<template>
  <div
    v-if="props.stateModal"
    @click="$emit('closeModal')"
    class="fixed top-0 left-0 h-screen w-full flex justify-center items-center px-5 bg-black/30"
  >
    <div
      @click.stop
      class="bg-dark-charcoal rounded-2xl p-5 border border-charcoal w-full md:max-w-md lg:max-w-xl"
    >
      <header class="mb-6">
        <PrimaryText xl>Body Metrics</PrimaryText>
      </header>

      <main class="space-y-4">
        <Dropdown
          class="z-40"
          selectName="Select"
          :default-value="bodyMetrics.objective"
          :options="[...questions.objective.options]"
          @selectedOption="(val) => (bodyMetrics.objective = val)"
        />
        <Dropdown
          class="z-30"
          selectName="Select"
          :default-value="bodyMetrics.activityLevel"
          :options="[...questions.activityLevel.options]"
          @selectedOption="(val) => (bodyMetrics.activityLevel = val)"
        />
        <Dropdown
          class="z-20"
          selectName="Select"
          :default-value="bodyMetrics.sex"
          :options="[...questions.sex.options]"
          @selectedOption="(val) => (bodyMetrics.sex = val)"
        />
        <NumberInputForm
          @modelValue="(val) => (bodyMetrics.height = val)"
          :default-value="bodyMetrics.height"
          unit="cm"
        />
        <NumberInputForm
          @modelValue="(val) => (bodyMetrics.weight = val)"
          :default-value="bodyMetrics.weight"
          unit="kg"
        />
        <NumberInputForm
          @modelValue="(val) => (bodyMetrics.age = val)"
          :default-value="bodyMetrics.age"
          unit="years"
        />
        <NumberInputForm
          @modelValue="(val) => (bodyMetrics.bodyFat = val)"
          :default-value="bodyMetrics.bodyFat"
          unit="%"
        />
      </main>

      <footer class="flex gap-3 mt-4">
        <SecondaryButton @click="saveBodyMetrics(bodyMetrics)">Save</SecondaryButton
        ><SecondaryButton @click="emit('closeModal')"> Close </SecondaryButton>
      </footer>
    </div>
  </div>

  <Toast :toast />
</template>

<script setup lang="ts">
import SecondaryButton from "~/components/global/buttons/SecondaryButton.vue";
import PrimaryText from "~/components/global/text/PrimaryText.vue";
import type User from "~/types/UserType";
import NumberInputForm from "~/components/questionnaire/NumberInputForm.vue";
import Dropdown from "~/components/global/dropdowns/Dropdown.vue";
import validateAllMetrics from "~/utils/bodyMetricsValidation/validateAllMetrics";
import Toast from "@/components/global/popups/Toast/index.vue";

type BodyMetrics = User["bodyMetrics"];

const props = defineProps<{
  stateModal: boolean;
}>();

const emit = defineEmits(["closeModal"]);

const toast = useToast();
const { user } = storeToRefs(userStore());
const bodyMetrics = ref<BodyMetrics>(userDataStructure.bodyMetrics);
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

const saveBodyMetrics = (bodyMetrics: BodyMetrics) => {
  if (validateAllMetrics(bodyMetrics)) {
    userStore().updateUserData({ bodyMetrics: bodyMetrics });

    emit('closeModal')
  } else {
    toast.add({
      title: "Check that the above information is correct.",
      timeout: 5000,
    });
  }
};

watch(user, () => {
  if (user.value) {
    bodyMetrics.value = user.value.bodyMetrics;
  }
});
</script>
