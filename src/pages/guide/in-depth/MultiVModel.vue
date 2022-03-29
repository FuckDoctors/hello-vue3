<template>
  <input
    type="text"
    class="border"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    class="border"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>

<script setup>
defineProps(['firstName', 'lastName'])
defineEmits(['update:firstName', 'update:lastName'])
</script>
