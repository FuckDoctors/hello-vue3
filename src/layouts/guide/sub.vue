<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200 guide">
    <h1>跟着 Vue 官网学 Vue3.</h1>
    <h2 v-if="route.meta?.subTitle">
      {{ route.meta?.subTitle }}
    </h2>
    <router-view />
    <Footer />
  </main>
</template>

<script setup>
// import GuideIndex from './index.vue'

const route = useRoute()
</script>
