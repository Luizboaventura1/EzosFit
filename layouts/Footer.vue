<template>
  <footer class="bg-dark-charcoal py-8">
    <div class="container m-auto px-3">
      <div class="logo">
        <EzosFitLogo size="small" />
      </div>

      <div class="w-full h-[1px] bg-charcoal-gray my-6"></div>

      <div class="flex-1 sm:flex items-center y-3 text-xs text-white">
        <div class="w-full sm:w-auto mb-3 sm:mb-0">
          <NuxtLink to="/privacy-policy" class="mx-2 hover:underline">
            Privacy Policy
          </NuxtLink>
        </div>
        <div class="w-full sm:w-auto mb-3 sm:mb-0">
          <NuxtLink to="/terms" class="mx-2 hover:underline"> Terms </NuxtLink>
        </div>
        <div class="w-full sm:w-auto mb-3 sm:mb-0">
          <span class="mx-2">
            Copyright &copy; {{ new Date().getFullYear() }} EzosFit
          </span>
        </div>
        <div class="ms-auto w-full sm:w-auto mb-3 sm:mb-0">
          <p class="text-sm mx-2 mt-4 sm:mt-0">
            Developed by
            <a
              class="font-bold hover:underline"
              target="_blank"
              href="https://github.com/Luizboaventura1"
            >
              Luiz
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import EzosFitLogo from "~/components/global/EzosFitLogo.vue";
</script>
