<template>
  <h2>Ref on Component</h2>
  <p>
    ref can also be used on a child component. In this case the reference will
    be that of a component instance:
  </p>
  <div>
    <p>child is not using script setup</p>
    <Child ref="child" />
  </div>
  <p>
    If the child component is using Options API or not using script setup, the
    referenced instance will be identical to the child component's this, which
    means the parent component will have full access to every property and
    method of the child component.
  </p>

  <div>
    <p>child is using script setup</p>
    <Child2 ref="child2" />
  </div>
  <p>
    An exception here is that components using script setup are private by
    default: a parent component referencing a child component using script setup
    won't be able to access anything unless the child component chooses to
    expose a public interface using the defineExpose macro:
  </p>
  <p>
    When a parent gets an instance of this component via template refs, the
    retrieved instance will be of the shape { a: number, b: number } (refs are
    automatically unwrapped just like on normal instances).
  </p>
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["log"] }] */
import Child from './child.vue'
import Child2 from './child2.vue'

const child = ref(null)
onMounted(() => {
  console.log('child ref', child.value)
  console.log('child ref', child.value.msg)
  console.log('child ref', child.value.greet)
})

const child2 = ref(null)
onMounted(() => {
  console.log('child ref setup', child2.value)
  console.log('child ref setup', child2.value.msg)
  console.log('child ref setup', child2.value.greet)
})
</script>
