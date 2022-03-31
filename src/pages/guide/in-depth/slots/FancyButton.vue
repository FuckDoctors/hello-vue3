<template>
  <button class="fancy-btn">
    <slot>fancy button</slot>
  </button>
</template>

<script setup></script>

<style scoped>
.fancy-btn {
  margin: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(315deg, #42d392, 25%, #647eff);
  color: #fff;
  cursor: pointer;
}
</style>
