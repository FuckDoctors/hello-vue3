<template>
  <div>
    <h1>Vue3 向导</h1>
    <nav>
      <router-link to="/guide/reactivity-fundamentals" class="link">
        Reactivity Fundamentals
      </router-link>
      <router-view />
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<route lang="yaml">
meta:
  layout: guide/index
</route>
