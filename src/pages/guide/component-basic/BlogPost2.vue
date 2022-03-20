<template>
  <div>
    <h4>{{ title }}</h4>
    <button @click="enlargeText">+</button>
  </div>
</template>

<script>
/* eslint no-console: ["error", { allow: ["log"] }] */
export default {
  props: ['title'],
  emits: ['enlarge-text'],
  setup(props, ctx) {
    console.log(props) // ShallowReactive
    console.log(props.title)

    const enlargeText = () => {
      ctx.emit('enlarge-text')
    }

    return {
      enlargeText,
    }
  },
}
</script>
