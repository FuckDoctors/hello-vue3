<template>
  <slot :text="greetingMessage" :count="1" />
</template>

<script setup>
const greetingMessage = 'hello'
</script>
