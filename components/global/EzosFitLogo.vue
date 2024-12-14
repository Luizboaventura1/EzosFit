<template>
  <div class="flex gap-4 items-center">
    <img
      :class="imageClass"
      src="../../assets/images/ezos-fit-logo.png"
      alt="EzosFit Logo"
    />
    <h1 class="font-extrabold text-light-gray" :class="textClass">
      <span class="text-primary-color">Ezos</span>Fit
    </h1> 
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface LogoProps {
  size?: 'small' | 'medium' | 'big'
}

// Definindo as props
const props = defineProps<LogoProps>()

// Computed para a classe da imagem
const imageClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-[2.2rem] h-[2.2rem]'
    case 'medium':
      return 'w-[2.5rem] h-[2.5rem]'
    case 'big':
      return 'w-[4rem] h-[4rem]'
    default:
      return 'w-[3rem] h-[3rem]' // Tamanho padrão
  }
})

// Computed para a classe do texto
const textClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'text-[1.5rem]'
    case 'medium':
      return 'text-[2rem]'
    case 'big':
      return 'text-[3rem]'
    default:
      return 'text-[2rem]' // Tamanho padrão
  }
})
</script>
