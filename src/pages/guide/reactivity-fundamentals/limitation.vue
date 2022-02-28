<template>
  <div class="limitation">
    <h2>Reactive Proxy vs. Original</h2>
    <p>
      the returned value from reactive() is a Proxy of the original object,
      which is not equal to the original object
    </p>
    <pre>
      <code>
        const raw = {}
        const proxy = reactive(raw)

        // proxy is NOT equal to the original
        console.log(proxy === raw) // false
      </code>
    </pre>

    <p>
      calling reactive() on the same object always returns the same proxy, and
      calling reactive() on an existing proxy also returns that same proxy
    </p>

    <pre>
      <code>
        // calling reactive() on the same object returns the same proxy
        console.log(reactive(raw) === proxy) // true

        // calling reactive() on a proxy returns itself
        console.log(reactive(proxy) === proxy) // true
      </code>
    </pre>

    <p>
      This rule applies to nested objects as well. <br />
      Due to deep reactivity, nested objects inside a reactive object are also
      proxies:
    </p>

    <pre>
      <code>
        const proxy = reactive({})

        const raw = {}
        proxy.nested = raw

        console.log(proxy .nested === raw) // false
      </code>
    </pre>

    <h2>Limitations of reactive()</h2>
    <ol>
      <li>
        It only works for object types (objects, arrays, and collection types
        such as Map and Set). It cannot hold primitive types such as string,
        number or boolean.(ref可以)
      </li>
      <li>
        Since Vue's reactivity tracking works over property access, we must
        always keep the same reference to the reactive object. This means we
        can't easily "replace" a reactive object
      </li>
    </ol>

    <pre>
      <code>
        let state = reactive({ count: 0 })

        // this won't work! ref可以
        state = reactive({ count: 1 })
      </code>
    </pre>

    <p>
      It also means that when we assign or destructure a reactive object's
      property into local variables, or when we pass that property into a
      function, or destructure properties from a reactive object, we will lose
      the reactivity connection:
    </p>

    <pre>
      <code>
        const state = reactive({ count: 0 })

        // n is a local variable that is disconnected from state.count.
        let n = state.count
        n++

        // count is also disconnected from state.count.
        let { count } = state
        // does not affect original state
        count++

        // the function receives a plain number and
        // won't be able to track changes to state.count
        callSomeFunction(state.count)

      </code>
    </pre>

    <h2>Reactive Variables with ref()</h2>
    <p>
      To address the limitations of reactive(), Vue also provides a ref()
      function which allows us to create reactive "refs" that can hold any value
      type:
    </p>
    <p>
      Similar to properties on a reactive object, the .value property of a ref
      is reactive. In addition, when holding object types, ref automatically
      converts its .value with reactive().
    </p>
    <p>
      A ref containing an object value can reactively replace the entire object:
    </p>

    <pre>
      <code>
        const objectRef = ref({ count: 0 })

        // this works reactively
        objectRef.value = { count: 1 }
      </code>
    </pre>

    <p>
      Refs can also be passed into functions or destructured from plain objects
      without losing reactivity:
    </p>

    <pre>
      <code>
        const obj = {
          foo: ref(1),
          bar: ref(2)
        }

        // the function receives a ref
        // it needs to access the value via .value
        // will retain the reactivity connection
        callSomeFunction(obj.foo)
      </code>
    </pre>

    <p>
      In other words, ref() allows us to create a "reference" to any value and
      pass it around without losing reactivity.
    </p>
    <p>
      This capability is quite important as it is frequently used when
      extracting logic into Composable Functions.
    </p>

    <h2>Ref Unwrapping in Templates</h2>
    When refs are accessed as <em>top-level</em> properties in the template,
    they are automatically "unwrapped" so there is no need to use .value.

    <p>
      Note the unwrapping only applies to top-level properties - nested access
      to refs will not be unwrapped:
    </p>
    <pre>
      <code>
        const object = { foo: ref(1) }

        &lcub;&lcub; object.foo &rcub;&rcub;<!-- does NOT get unwrapped -->
      </code>
    </pre>

    <p>We can fix that by making foo a top-level property:</p>

    <pre>
      <code>
        const { foo } = object

       &lcub;&lcub; foo &rcub;&rcub; <!-- properly unwrapped -->
      </code>
    </pre>

    <h2>Ref Unwrapping in Reactive Objects</h2>
    <p>
      When a ref is accessed or mutated as a property of a reactive object, it
      is also automatically unwrapped so it behaves like a normal property:
    </p>

    <pre>
      <code>
        const count = ref(0)
        const state = reactive({ count })

        console.log(count.value) // 0
        state.count = 1
        console.log(count.value) // 1
      </code>
    </pre>

    <p>
      If a new ref is assigned to a property linked to an existing ref, it will
      replace the old ref:
    </p>
    <pre>
      <code>
        const otherCount = ref(2)
        state.count = otherCount

        console.log(state.count) // 2
        console.log(count.value) // 1
      </code>
    </pre>

    <p>
      Ref unwrapping only happens when nested inside a deep reactive object. It
      does not apply when it is accessed as a property of a shallow reactive
      object.
    </p>

    <h2>Ref Unwrapping in Arrays and Collections</h2>
    <p>
      Unlike reactive objects, there is no unwrapping performed when the ref is
      accessed as an element of a reactive array or a native collection type
      like Map:
    </p>

    <pre>
      <code>
        const books = reactive([ref('Vue3 Guide')])
        // need .value here
        console.log(books[0].value)

        const map = reactive(new Map([['count', ref(0)]]))
        // need .value here
        console.log(map.get('count').value)
      </code>
    </pre>
  </div>
</template>
