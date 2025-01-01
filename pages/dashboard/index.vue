<template>
  <section
    class="grid gap-5 grid-cols-1 md:grid-cols-[300px_1fr] bg-almost-black h-screen p-5"
  >
    <aside class="bg-dark-charcoal rounded-2xl p-5 border border-charcoal">
      <header class="mb-16">
        <EzosFitLogo size="small" />
      </header>

      <div class="flex gap-5 justify-between items-center mb-5">
        <PrimaryText xl> Meals </PrimaryText>
        <PlusButton />
      </div>

      <section>
        <MealList />
      </section>
    </aside>

    <main class="grid grid-rows-[auto,1fr] pt-5">
      <ToolbarDashboard />

      <div></div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import PlusButton from "~/components/global/buttons/PlusButton.vue";
import MealList from "~/components/dashboard/MealComponent/MealList.vue";
import PrimaryText from "~/components/global/text/PrimaryText.vue";
import ToolbarDashboard from "~/layouts/ToolbarDashboard.vue";
import { storeToRefs } from "pinia";

const router = useRouter();
const { user } = storeToRefs(userStore());

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

<style scoped></style>
