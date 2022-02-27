<template>
  <div>
    <button class="btn" @click="increment">
      {{ state.count }}
    </button>
  </div>
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
