<template>
  <div
    class="grid grid-rows-[auto,1fr] gap-y-4 bg-dark-charcoal rounded-2xl py-5 px-7 border border-charcoal"
  >
    <header class="flex gap-4 items-center">
      <div class="bg-primary-color rounded-lg flex justify-center items-center p-2">
        <slot name="icon" />
      </div>
      <div class="flex gap-3 justify-between items-center w-full">
        <h1 class="text-light-gray font-semibold">
          <slot  name="title" />
        </h1>
        <div>
          <slot name="action" />
        </div>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>