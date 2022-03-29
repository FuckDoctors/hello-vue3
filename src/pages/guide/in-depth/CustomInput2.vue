<template>
  <input v-model="value" type="text" />
</template>

<script setup>
const props = defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emits('update:modelValue', newVal)
  },
})
</script>
