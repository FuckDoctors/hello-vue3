<template>
  <div>
    This is child.
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  setup() {
    const msg = ref('child')
    const greet = (somebody) => {
      return `Hello ${somebody}`
    }

    return {
      msg,
      greet,
    }
  },
}
</script>
