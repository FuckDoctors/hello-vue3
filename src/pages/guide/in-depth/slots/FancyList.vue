<template>
  <ul class="fancy-list">
    <li v-if="!items.length">Loading...</li>
    <li v-for="(item, index) in items" :key="index">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps(['apiUrl', 'perPage'])

const items = ref([])

setTimeout(() => {
  items.value = [
    { body: 'Scoped Slots Guide', username: 'Evan You', likes: 20 },
    { body: 'Vue Tutorial', username: 'Natalia Tepluhina', likes: 10 },
  ]
}, 1500)
</script>

<style lang="scss" scoped>
ul.fancy-list {
  padding: 5px;
  background: linear-gradient(315deg, #42d392 25%, #647eff);
  list-style-type: none;

  li {
    margin: 10px;
    padding: 5px 20px;
    background: #fff;
  }
}
</style>
