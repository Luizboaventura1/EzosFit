<template>
  <div
    class="flex gap-3 text-light-gray font-medium border border-charcoal-gray bg-dark-charcoal rounded-full overflow-hidden"
  >
    <button
      type="button"
      @click="$emit('modelValue', ++inputValue)"
      class="border-r border-charcoal-gray ps-5 pr-3 py-3 hover:bg-charcoal transition-colors duration-200"
    >
      <PlusIcon size="14" />
    </button>
    <div class="grid gap-2 grid-cols-[1fr,auto]">
      <input
        @input="$emit('modelValue', inputValue)"
        v-model="inputValue"
        class="appearance-none bg-transparent text-center focus:outline-none py-3"
        type="number"
      />
      <div v-if="props.unit" class="text-medium-gray foont-light self-end pb-2">
        {{ props.unit }}
      </div>
    </div>
    <button
      type="button"
      @click="$emit('modelValue', --inputValue)"
      class="border-s border-charcoal-gray pr-5 ps-3 py-3 hover:bg-charcoal transition-colors duration-200"
    >
      <LessIcon size="14" />
    </button>
  </div>
</template>

<script setup lang="ts">
import LessIcon from "../icons/LessIcon.vue";
import PlusIcon from "../icons/PlusIcon.vue";

const props = defineProps<{
  unit?: string;
  defaultValue?: number | null;
}>();

const inputValue = ref(props.defaultValue ?? 0);

watch(inputValue, (newValue, oldValue) => {
  if (newValue < 0) inputValue.value = oldValue;
});
</script>
