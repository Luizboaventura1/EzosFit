<template>
  <section
    class="grid gap-5 grid-cols-1 md:grid-cols-[300px,1fr] bg-almost-black h-screen p-5"
  >
    <aside
      class="grid grid-rows-[auto,1fr] bg-dark-charcoal rounded-2xl p-5 border border-charcoal min-h-max"
    >
      <div>
        <header class="mb-16">
          <EzosFitLogo size="small" />
        </header>
        <div class="flex gap-5 justify-between items-center mb-5">
          <PrimaryText xl> Meals </PrimaryText>
          <PlusButton @click="toggleAddNewMealModal" />
        </div>
      </div>

      <section class="overflow-y-auto">
        <MealList />
      </section>
    </aside>

    <main class="grid grid-rows-[auto,1fr] pt-5">
      <ToolbarDashboard />

      <div class="mt-5 space-y-5">
        <div class="grid gap-5 grid-cols-1 lg:grid-cols-3">
          <StatusBody />
          <DailyMacroGoals />
          <DailyWater />
        </div>
        <div class="grid gap-5 grid-cols-3 lg:grid-cols-3">
          <UserProgress class="col-span-2" />

          <BodyDataCard />
        </div>
      </div>
    </main>
  </section>

  <AddMealModal
    modal-title="Add new meal"
    @close-modal="stateAddNewMealModal = false"
    :state-modal="stateAddNewMealModal"
  />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import PlusButton from "~/components/global/buttons/PlusButton.vue";
import MealList from "~/components/dashboard/MealComponent/MealList.vue";
import PrimaryText from "~/components/global/text/PrimaryText.vue";
import ToolbarDashboard from "~/layouts/ToolbarDashboard.vue";
import BodyDataCard from "@/components/dashboard/BodyDataCard/index.vue";
import DailyMacroGoals from "@/components/dashboard/DailyMacroGoals/index.vue";
import StatusBody from "@/components/dashboard/StatusBody/index.vue";
import DailyWater from "@/components/dashboard/DailyWater/index.vue";
import AddMealModal from "@/components/dashboard/AddMealModal/index.vue";
import UserProgress from "@/components/dashboard/UserProgress/index.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const { user } = storeToRefs(userStore());
const stateAddNewMealModal = ref(false);

const toggleAddNewMealModal = () =>
  (stateAddNewMealModal.value = !stateAddNewMealModal.value);

onMounted(async () => {
  await loadUserData(router).then(() => {
    if (
      user.value &&
      user.value.bodyMetrics &&
      !isBodyMetricsValid(user.value.bodyMetrics)
    ) {
      router.push("/questionnaire");
    }
  });
});
</script>

<style scoped lang="scss">
section > aside {
  section {
    &::-webkit-scrollbar-thumb {
      background-color: rgb(54, 54, 54);
      border-radius: 20px;
      &:hover {
        background-color: rgb(69, 69, 69);
      }
    }

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
}
</style>
