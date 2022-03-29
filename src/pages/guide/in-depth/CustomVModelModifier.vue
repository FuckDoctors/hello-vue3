<template>
  <input
    type="text"
    class="border"
    :value="modelValue"
    @input="emitCapitalizedValue('update:modelValue', $event.target.value)"
  />
  <textarea
    class="border"
    :value="extra"
    @input="emitCapitalizedValue('update:extra', $event.target.value)"
  />
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["log"] }] */
// defineProps(['modelValue', 'extra'])
const props = defineProps({
  modelValue: String,
  modelModifiers: {
    default: () => ({}),
  },
  extra: String,
  extraModifiers: {
    default: () => ({}),
  },
})

const emits = defineEmits(['update:modelValue', 'update:extra'])

console.log(props)
// 输出结果
// extra: ""
// extraModifiers: {capitalize: true}
// modelModifiers: {capitalize: true}
// modelValue: ""

const capitalize = (val) => {
  if (val && val.length > 0) return val.charAt(0).toUpperCase() + val.slice(1)

  return val
}

const emitCapitalizedValue = (evt, val) => {
  const capitalizedValue = capitalize(val)
  emits(evt, capitalizedValue)
}
</script>
