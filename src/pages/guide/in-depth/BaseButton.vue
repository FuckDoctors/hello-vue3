<template>
  <button class="btn" @click="innerClick">Base Button</button>
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["log"] }] */
import { useAttrs } from 'vue'

const innerClick = () => {
  console.log('innerClick')
}

const attrs = useAttrs()
console.log(attrs)
</script>
