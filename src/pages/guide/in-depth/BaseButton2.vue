<template>
  <div class="btn-wrapper">
    <button v-bind="$attrs" class="btn" @click="innerClick">Base Button</button>
  </div>
</template>

<script>
/* eslint no-console: ["error", { allow: ["log"] }] */
export default {
  setup(props, ctx) {
    const innerClick = () => {
      console.log('innerClick')
    }

    console.log(ctx.attrs)

    return {
      innerClick,
    }
  },
}
</script>
