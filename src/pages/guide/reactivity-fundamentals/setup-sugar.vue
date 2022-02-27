<template>
  <h2>&lt;script setup&gt;</h2>
  <p>{{ t('guide.reactivity.setup-sugar.desc') }}</p>
  <button class="btn" @click="increment">
    {{ state.count }}
  </button>
</template>

<script setup>
const { t } = useI18n()

const state = reactive({
  count: 0,
})

function increment() {
  state.count++
}
</script>

<route lang="yaml">
meta:
  layout: guide
</route>
