<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    :style="`width: ${size};height: ${size};`"
    class="fill-medium-gray"
  >
    <g>
      <path
        d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-21c-4.962 0-9 4.037-9 9s4.038 9 9 9 9-4.037 9-9-4.038-9-9-9Zm1.25 10.799A1.5 1.5 0 0 0 14 12.5v-6a1.5 1.5 0 1 0-3 0v3.401l-1.214-.7a1.5 1.5 0 0 0-1.5 2.598l3.464 2a1.499 1.499 0 0 0 1.5 0Z"
        opacity="1"
        data-original="#000000"
        class=""
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size: string;
}>();
</script>
