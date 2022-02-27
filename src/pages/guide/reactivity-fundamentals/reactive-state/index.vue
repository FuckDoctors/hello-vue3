<template>
  <h2>Declaring Reactive State</h2>
  <button class="btn" @click="increment">
    {{ state.count }}
  </button>
</template>

<script>
export default {
  setup() {
    const state = reactive({
      count: 0,
    })

    function increment() {
      state.count++
    }

    return {
      state,
      increment,
    }
  },
}
</script>

<route lang="yaml">
meta:
  layout: guide
</route>
