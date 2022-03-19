<template>
  <p>
    ref allows us to obtain a direct reference to a specific DOM element or
    child component instance after it's mounted. This may be useful when you
    want to, for example, programmatically focus an input on component mount, or
    initialize a 3rd party library on an element.
  </p>
  <h2>Accessing the Refs</h2>
  <p>
    To obtain the reference with Composition API, we need to declare a ref with
    the same name:
  </p>
  <div>
    template ref: <input ref="input" class="border" /> template ref2:
    <input ref="input2" class="border" />
  </div>
  <p>
    Note that you can only access the ref after the component is mounted. If you
    try to access input in a template expression, it will be null on the first
    render. This is because the element doesn't exist until after the first
    render!
  </p>
  <p>
    If you are trying to watch the changes of a template ref, make sure to
    account for the case where the ref has null value:
  </p>

  <h2>Refs inside v-for</h2>
  <div>
    <p>
      When ref is used inside v-for, the corresponding ref should contain an
      Array value, which will be populated with the elements after mount:
    </p>
    <ul>
      <li v-for="item in list" :key="item.id" ref="itemRef">
        {{ item.text }}
      </li>
    </ul>
  </div>

  <h2>Function Refs</h2>
  <p>
    Instead of a string key, the ref attribute can also be bound to a function,
    which will be called on each component update and gives you full flexibility
    on where to store the element reference. The function receives the element
    reference as the first argument:
  </p>
  <pre>
    <code>
      &lt;input :ref="(el) => { /* assign el to a property or ref */ }"&gt;
    </code>
  </pre>
  <input :ref="funcRef" class="border" />
  <p>
    Note we are using a dynamic <em>:ref</em> binding so we can pass it a
    function instead of a ref name string. When the element is unmounted, the
    argument will be null. You can, of course, use a method instead of an inline
    function.
  </p>
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["log"] }] */
// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)
const input2 = ref(null)

onMounted(() => {
  // Note that you can only access the ref after the component is mounted.
  input.value.focus()
})

watchEffect(() => {
  if (input2.value) {
    input2.value.value = 'auto set'
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})

const list = ref([
  {
    id: 1,
    text: 'text1',
  },
  {
    id: 2,
    text: 'text2',
  },
  {
    id: 3,
    text: 'text3',
  },
])
const itemRef = ref([])
onMounted(() => {
  // FIXME:  不明原因，不是想要的结果。。。
  // 同样的代码，官方playground可以，vue版本也没问题
  console.log('Refs inside v-for', itemRef.value)
  // alert(itemRef.value.map(i => i.textContent))
})

const funcRef = (el) => {
  console.log('funcRef', el)
}
</script>
