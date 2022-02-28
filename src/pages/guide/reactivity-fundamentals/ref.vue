<template>
  <div>
    <button class="btn" @click="increment">
      {{ count }}
    </button>
    <button class="btn" @click="increment2">
      {{ objectRef.count }}
    </button>
    <!-- 跟文档说的不一样？ -->
    <div>
      非top-level，不unwrap {{ nestedRef.foo }}, top-level才会unwrap {{ foo }}
    </div>
    <button class="btn">Reactivity Transform : 暂不可使用</button>
  </div>
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
// vitesse中不可使用
// import { $ref } from 'vue/macros'

const count = ref(0)
const increment = () => count.value++

const objectRef = ref({ count: 0 })
const increment2 = () => (objectRef.value = { count: 1 })

// 跟文档说的不一样？
const nestedRef = { foo: ref(2) }
console.log(nestedRef.foo)

const { foo } = nestedRef

const count3 = ref(0)
const state = reactive({ count3 })

console.log(state.count3)
state.count3 = 1
console.log(count3.value)

const otherCount = ref(2)
state.count3 = otherCount
console.log(state.count3)
console.log(count3.value)

// vitesse中不可使用
// const countTrans = $ref(0)
// const incrementTrans = () => countTrans++
</script>
