<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xml:space="preserve"
    :style="`width: ${size};height: ${size};`"
    class="fill-light-gray"
  >
    <g>
      <path
        d="M495.93 82.599H332.84c-8.87 0-16.07 7.19-16.07 16.07v32.46c0 8.87 7.2 16.07 16.07 16.07h68.89l-140.96 140.95-59.76-59.76c-12.62-12.61-33.07-12.61-45.69 0L4.71 379.019c-6.28 6.27-6.28 16.45 0 22.72l22.95 22.96c6.27 6.27 16.45 6.27 22.72 0l127.79-127.79 59.75 59.76c12.619 12.623 33.072 12.628 45.69 0l163.79-163.79v68.89c0 8.87 7.19 16.07 16.07 16.07h32.46c8.88 0 16.07-7.2 16.07-16.07v-163.1c0-8.88-7.19-16.07-16.07-16.07z"
        opacity="1"
        data-original="#000000"
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size: string;
}>();
</script>
