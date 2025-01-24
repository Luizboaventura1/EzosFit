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
        <PrimaryText xl>Daily water</PrimaryText>
      </header>

      <main class="space-y-4">
        <NumberInputForm
          @modelValue="(val) => (waterToAdd = val)"
          :default-value="waterToAdd"
          unit="ml"
        />
      </main>

      <footer class="flex gap-3 mt-4">
        <SecondaryButton @click="saveWaterConsumed(waterToAdd)"
          >Add water</SecondaryButton
        ><SecondaryButton @click="emit('closeModal')"> Close </SecondaryButton>
      </footer>
    </div>
  </div>

  <Toast :toast />
</template>

<script setup lang="ts">
import SecondaryButton from "~/components/global/buttons/SecondaryButton.vue";
import PrimaryText from "~/components/global/text/PrimaryText.vue";
import NumberInputForm from "~/components/questionnaire/NumberInputForm.vue";
import Toast from "@/components/global/popups/Toast/index.vue";
import validateWaterIntake from "~/utils/bodyMetricsValidation/validateWaterIntake";

const props = defineProps<{
  stateModal: boolean;
}>();

const emit = defineEmits(["closeModal"]);

const toast = useToast();
const { user } = storeToRefs(userStore());
const waterConsumed = ref<number | null>(null);
const waterToAdd = ref(0);

const saveWaterConsumed = (water: number) => {
  if (
    validateWaterIntake(water) &&
    user.value &&
    user?.value?.dailyLog?.dailyConsumption.water
  ) {
    const waterSum = Number(waterConsumed.value) + Number(waterToAdd.value);

    user.value.dailyLog.dailyConsumption.water = waterSum;

    userStore().updateUserData({
      dailyLog: {
        dailyConsumption: {
          water: waterSum,
        },
      },
    });

    emit("closeModal");
  } else {
    toast.add({
      title: "Check that the above information is correct.",
      timeout: 5000,
    });
  }
};

watch(user, () => {
  if (user.value && user.value.dailyLog?.dailyConsumption.water) {
    waterConsumed.value = user.value.dailyLog?.dailyConsumption.water;
  }
});
</script>
