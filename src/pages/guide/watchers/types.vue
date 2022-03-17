<template>
  <p>
    watcher's first argument can be different types of reactive "sources": it
    can be a ref(including computed refs), a reactive object, a getter function,
    or an array of multiple sources:
  </p>
  <div>
    x: <input v-model.number="x" type="text" class="border" />
    <p>New x is {{ newX }}</p>
  </div>
  <div>
    y: <input v-model.number="y" type="text" class="border" />
    <p>x + y x is {{ sumRef }}</p>
  </div>
  <div>
    <p>Do note that you can't watch a property of a reactive object.</p>
    <p>instead, use a getter</p>
    <div>count: <input v-model="obj.count" type="number" class="border" /></div>
  </div>
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["log"] }] */
const x = ref(0)
const y = ref(0)

// single ref
const newX = ref(0)
watch(x, (newVal) => {
  // console.log(`newX is ${newVal}`)
  newX.value = newVal
})

// getter
const sumRef = ref(0)
watch(
  () => x.value + y.value,
  (sum) => {
    // this is callback
    console.log(`sum of x + y is ${sum}`)
    sumRef.value = sum
  }
)

// array of multiple sources
watch([x, () => y.value], ([newXVal, newYVal]) => {
  newX.value = newXVal
  sumRef.value = newXVal + newYVal
  console.log('watch array type', sumRef.value)
})

const obj = reactive({
  count: 0,
  arr: [],
  obj: {},
})

watch(obj.count, (newVal) => {
  // not work
  console.log('obj.count', newVal)
})

watch(
  () => obj.count,
  (count) => {
    console.log('watch count using a getter', count)
  }
)

watch(obj.arr, (newVal) => {
  console.log('watch reactive array property', newVal)
})
obj.arr.push(1)
obj.arr.push(2)

watch(obj.obj, (newVal, oldVal) => {
  console.log('watch reactive object property: ', newVal, oldVal)
})
obj.obj.a = 'a'
obj.obj.b = 'b'
</script>
