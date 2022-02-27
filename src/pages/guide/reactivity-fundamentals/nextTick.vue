<template>
  <button class="btn" @click="increment">
    {{ state.count }}
  </button>
</template>

<script setup>
const state = reactive({
  count: 0,
})
const increment = () => {
  nextTick(() => {
    state.count++
  })
}
</script>

<route lang="yaml">
meta:
  layout: guide/sub
  subTitle: Reactivity Fundamentals
</route>
