<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    :style="`width: ${size};height: ${size};`"
    class="fill-light-gray"
  >
    <g>
      <path
        d="M480 224H288V32c0-17.673-14.327-32-32-32s-32 14.327-32 32v192H32c-17.673 0-32 14.327-32 32s14.327 32 32 32h192v192c0 17.673 14.327 32 32 32s32-14.327 32-32V288h192c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
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
