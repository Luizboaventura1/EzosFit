<template>
  <div
    class="grid grid-rows-[auto,1fr] gap-y-4 bg-dark-charcoal rounded-2xl py-5 px-7 border border-charcoal"
  >
    <header class="flex gap-4 items-center">
      <div class="bg-primary-color rounded-lg flex justify-center items-center p-2">
        <slot name="icon" />
      </div>
      <slot name="title" />
    </header>
    <main class="self-end">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
