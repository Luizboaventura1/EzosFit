<template>
  <div class="relative w-full select-none">
    <div class="px-6 py-4">
      <h1 class="font-semibold text-light-gray">{{ selectedOption }}</h1>
    </div>
    <div  
      class="absolute top-0 left-0 bg-dark-charcoal rounded-2xl border border-charcoal-gray w-full cursor-pointer"
    >
      <div
        @click="toggleDrowdownState"
        class="grid gap-3 grid-cols-[1fr,auto] px-6 py-4"
      >
        <div class="flex items-center">
          <h1 class="font-semibold text-light-gray">{{ selectedOption }}</h1>
        </div>
        <div class="flex justify-end items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xml:space="preserve"
            :class="dropdownState ? 'rotate-90' : 'rotate-0'"
            class="fill-light-gray w-4 h-4"
          >
            <g>
              <path
                d="M6.079 22.5a1.5 1.5 0 0 1 .44-1.06l7.672-7.672a2.5 2.5 0 0 0 0-3.536L6.529 2.565A1.5 1.5 0 0 1 8.65.444l7.662 7.661a5.506 5.506 0 0 1 0 7.779L8.64 23.556A1.5 1.5 0 0 1 6.079 22.5Z"
                opacity="1"
                data-original="#000000"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <ul
        :class="dropdownState ? 'block' : 'hidden'"
        class="text-light-gray space-y-2 font-light overflow-hidden bottom-0 left-0 w-full mb-4"
      >
        <li
          v-for="option in props.options"
          @click="selectOption(option)"
          class="px-6 transition-colors duration-100 hover:bg-charcoal/70 py-2"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: string[];
  selectName: string;
  defaultValue?: string | null;
}>();

const emit = defineEmits(['selectedOption'])

const dropdownState = ref(false);
const selectedOption = ref(props.defaultValue ?? props.selectName);

const selectOption = (option: string) => {
  selectedOption.value = option;
  emit('selectedOption', selectedOption.value) 
  toggleDrowdownState();
};

const toggleDrowdownState = () => (dropdownState.value = !dropdownState.value);
</script>

<style scoped></style>
