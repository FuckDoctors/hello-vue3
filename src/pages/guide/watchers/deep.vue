<template>
  <p>
    when you call watch() directly on a reactive object, it will implicitly
    create a deep watcher - the callback will be triggered on all nested
    mutations
  </p>
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["log"] }] */
const obj = reactive({
  count: 0,
  obj: {},
  obj2: {},
})

watch(obj, (newVal, oldVal) => {
  // fires on nested property mutations
  // Note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object!
  // This should be differentiated with a getter that returns a reactive object
  console.log('watch reactive object ', newVal)
  console.log('newVal === oldVal', newVal === oldVal)
})
obj.count++

watch(
  () => obj.obj,
  (obj) => {
    // fires only when state.someObject is replaced
    console.log('obj replaced', obj)
  }
)
obj.obj.a = 'a'
obj.obj = { b: 'b' }

watch(
  () => obj.obj2,
  (obj2) => {
    // fires only when state.someObject is replaced
    console.log('obj2 deep', obj2)
  },
  {
    deep: true,
  }
)
obj.obj2.a = 'a'
obj.obj2 = { b: 'b' }
</script>
