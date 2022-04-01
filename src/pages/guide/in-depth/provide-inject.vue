<template>
  <h2>Provide / Inject</h2>

  <h3>Provide</h3>
  <p>
    To provide data to a component's descendants, use the provide() function:
  </p>

  <code>
    <pre>
      &lt;script setup&gt;
        import { provide } from 'vue'

        provide(/* key */ 'message', /* value */ 'hello!')
      &lt;/script&gt;
    </pre>
  </code>

  <p>
    If not using &lt;script setup&gt;, make sure provide() is called
    synchronously inside setup():
  </p>
  <code>
    <pre>
      import { provide } from 'vue'

      export default {
        setup() {
          provide(/* key */ 'message', /* value */ 'hello!')
        }
      }
    </pre>
  </code>

  <p>
    The provide() function accepts two arguments. The first argument is called
    the injection key, which can be a string or a Symbol. The injection key is
    used by descendent components to lookup the desired value to inject. A
    single component can call provide() multiple times with different injection
    keys to provide different values.
  </p>

  <p>
    The second argument is the provided value. The value can be of any type,
    including reactive state such as refs:
  </p>

  <code>
    <pre>
      import { ref, provide } from 'vue'

      const count = ref(0)
      provide('key', count)
    </pre>
  </code>

  <p>
    Providing reactive values allows the descendent components using the
    provided value to establish a reactive connection to the provider component.
  </p>

  <h3>App-level Provide</h3>
  <p>
    In addition to providing data in a component, we can also provide at the app
    level:
  </p>
  <code>
    <pre>
      import { createApp } from 'vue'

      const app = createApp({})

      app.provide(/* key */ 'message', /* value */ 'hello!')
    </pre>
  </code>

  <p>
    App-level provides are available to all components rendered in the app. This
    is especially useful when writing plugins, as plugins typically wouldn't be
    able to provide values using components.
  </p>

  <h3>Inject</h3>
  <p>
    To inject data provided by an ancestor component, use the inject() function:
  </p>

  <code>
    <pre>
      &lt;script setup&gt;
      import { inject } from 'vue'

      const message = inject('message')
      &lt;/script&gt;
    </pre>
  </code>

  <p>
    If the provided value is a ref, it will be injected as-is and will not be
    automatically unwrapped. This allows the injector component to retain the
    reactivity connection to the provider component.
  </p>

  <p>
    Again, if not using &lt;script setup&gt;, inject() should only be called
    synchronously inside setup():
  </p>

  <code>
    <pre>
      import { inject } from 'vue'

      export default {
        setup() {
          const message = inject('message')
          return {
            message
          }
        }
      }
    </pre>
  </code>

  <h3>Injection Default Values</h3>

  <p>
    By default, inject assumes that the injected key is provided somewhere in
    the parent chain. In the case where the key is not provided, there will be a
    runtime warning.
  </p>

  <p>
    If we want to make an injected property work with optional providers, we
    need to declare a default value, similar to props:
  </p>

  <code>
    <pre>
      // `value` will be "default value"
      // if no data matching "message" was provided
      const value = inject('message', 'default value')
    </pre>
  </code>

  <p>
    In some cases, the default value may need to be created by calling a
    function or instantiating a new class. To avoid unnecessary computation or
    side effects in case the optional value is not used, we can use a factory
    function for creating the default value:
  </p>

  <code>
    <pre>
      const value = inject('key', () => new ExpensiveClass())
    </pre>
  </code>

  <h3>Working with Reactivity</h3>
  <p>
    When using reactive provide / inject values, it is recommended to keep any
    mutations to reactive state inside of the provider whenever possible. This
    ensures that the provided state and its possible mutations are co-located in
    the same component, making it easier to maintain in the future.
  </p>
  <p>
    There may be times when we need to update the data from an injector
    component. In such cases, we recommend providing a function that is
    responsible for mutating the state:
  </p>

  <code>
    <pre>
      &lt;!-- inside provider component --&gt;
      &lt;script setup&gt;
      import { provide, ref } from 'vue'

      const location = ref('North Pole')

      function updateLocation() {
        location.value = 'South Pole'
      }

      provide('location', {
        location,
        updateLocation
      })
      &lt;/script&gt;
    </pre>
  </code>

  <code>
    <pre>
      &lt;!-- in injector component --&gt;
      &lt;script setup&gt;
      import { inject } from 'vue'

      const { location, updateLocation } = inject('location')
      &lt;/script&gt;

      &lt;template&gt;
        &lt;button @click="updateLocation"&gt;{{ location }}&lt;/button&gt;
      &lt;/template&gt;
    </pre>
  </code>

  <p>
    Finally, you can wrap the provided value with readonly() if you want to
    ensure that the data passed through provide cannot be mutated by the
    injected component.
  </p>

  <code>
    <pre>
      &lt;script setup&gt;
      import { ref, provide, readonly } from 'vue'

      const count = ref(0)
      provide('read-only-count', readonly(count))
      &lt;/script&gt;
    </pre>
  </code>

  <h3>Working with Symbol Keys</h3>
  <p>
    So far, we have been using string injection keys in the examples. If you are
    working in a large application with many dependency providers, or you are
    authoring components that are going to be used by other developers, it is
    best to use Symbol injection keys to avoid potential collisions.
  </p>
  <p>It's recommended to export the Symbols in a dedicated file:</p>

  <code>
    <pre>
      // keys.js
      export const myInjectionKey = Symbol()

      // in provider component
      import { provide } from 'vue'
      import { myInjectionKey } from './keys.js'

      provide(myInjectionKey, {
        /* data to provide */
      })

      // in injector component
      import { inject } from 'vue'
      import { myInjectionKey } from './keys.js'

      const injected = inject(myInjectionKey)
    </pre>
  </code>

  <input v-model="message" type="text" class="border" />
  <Child />
</template>

<script setup>
import Child from './provide-inject/Child.vue'
import { myInjectionKey } from './provide-inject/keys'

const message = ref('')

provide('message', message)

const location = ref('')
const updateLocation = (loc) => {
  location.value = loc
}
provide('location', {
  location,
  updateLocation,
})

provide(myInjectionKey, 'Symbol Keys')
</script>
