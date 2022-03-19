<template>
  <div>
    This is child2.
    <p>{{ msg }}</p>
    <p>{{ msg2 }}</p>
  </div>
</template>

<script setup>
const msg = ref('child2')
const greet = (somebody) => {
  return `Hello ${somebody}`
}

const msg2 = ref('msg2')
const greet2 = (somebody) => {
  return `Hello again ${somebody}`
}

defineExpose({
  msg,
  greet,
})
</script>
