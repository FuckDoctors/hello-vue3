<template>
  <div>
    <h1>Reactivity Fundamentals</h1>
    <router-link to="reactivity-fundamentals/reactive-state" class="link">
      reactive-state
    </router-link>
    <router-link to="reactivity-fundamentals/setup-sugar" class="link">
      setup-sugar
    </router-link>
    <router-link to="reactivity-fundamentals/nextTick" class="link">
      nextTick
    </router-link>
    <router-view />
  </div>
</template>

<route lang="yaml">
meta:
  layout: guide/sub
</route>
