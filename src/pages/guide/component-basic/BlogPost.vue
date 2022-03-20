<template>
  <div>
    <h4>{{ title }}</h4>
    <button @click="enlargeText">+</button>
  </div>
</template>

<script setup>
defineProps(['title'])
const emit = defineEmits('enlarge-text')
const enlargeText = () => {
  emit('enlarge-text')
}
</script>
