<template>
  <Card>
    <template #icon>
      <BodyIcon size="24" />
    </template>

    <template #title> Body Data </template>

    <template #action>
      <button
        @click="toggleBodyMetricsModal"
        class="rounded-lg bg-transparent hover:bg-charcoal p-[10px] border border-charcoal-gray transition-colors duration-200"
      >
        <PencilIcon size="18" />
      </button>
    </template>

    <template #default>
      <ul>
        <li class="flex gap-3">
          <div class="font-light text-medium-gray">Weight</div>
          <div class="font-semibold text-light-gray">
            {{ user?.bodyMetrics.weight }}kg
          </div>
        </li>
        <li class="flex gap-3">
          <div class="font-light text-medium-gray">Height</div>
          <div class="font-semibold text-light-gray">
            {{ user?.bodyMetrics.height }}cm
          </div>
        </li>
        <li class="flex gap-3">
          <div class="font-light text-medium-gray">Age</div>
          <div class="font-semibold text-light-gray">
            {{ user?.bodyMetrics.age }}y
          </div>
        </li>
        <li class="flex gap-3">
          <div class="font-light text-medium-gray">Sex</div>
          <div class="font-semibold text-light-gray">
            {{ user?.bodyMetrics.sex }}
          </div>
        </li>
      </ul>
    </template>
  </Card>

  <EditBodyMetricsModal
    @closeModal="toggleBodyMetricsModal"
    :state-modal="stateBodyMetricsModal"
  />
</template>

<script setup lang="ts">
import BodyIcon from "~/components/icons/BodyIcon.vue";
import Card from "../Card/index.vue";
import PencilIcon from "~/components/icons/PencilIcon.vue";
import EditBodyMetricsModal from "./EditBodyMetricsModal.vue";

const { user } = storeToRefs(userStore());
const stateBodyMetricsModal = ref(false);
const toggleBodyMetricsModal = () =>
  (stateBodyMetricsModal.value = !stateBodyMetricsModal.value);
</script>

<style scoped></style>
