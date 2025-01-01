<template>
  <svg
    :style="`width: ${size};height: ${size};`"
    class="fill-light-gray"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 24 24"
    xml:space="preserve"
  >
    <g>
      <path
        d="M16.5 13.5h-9a1.5 1.5 0 0 1 0-3h9a1.5 1.5 0 0 1 0 3Z"
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
