<template>
  <!-- 这里写了多个节点，不会报错，因为vue3可以支持 -->
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
