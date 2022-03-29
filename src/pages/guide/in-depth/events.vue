<template>
  <h2>Component Events</h2>

  <h3>Emitting and Listening to Events</h3>
  <p>
    A component can emit custom events directly in template expressions (e.g. in
    a v-on handler) using the built-in $emit function:
  </p>
  <code>
    <pre>
      <!-- MyComponent -->
      &lt;button @click="$emit('someEvent')"&gt;click me&lt;/button&gt;
    </pre>
  </code>

  <p>The parent can then listen to it using v-on:</p>
  <code>
    <pre>
      &lt;MyComponent @some-event="callback" /&gt;
    </pre>
  </code>

  <p>The .once modifier is also supported on component event listeners:</p>
  <code>
    <pre>
      &lt;MyComponent @some-event.once="callback" /&gt;
    </pre>
  </code>

  <h3>Event Arguments</h3>
  <p>
    It's sometimes useful to emit a specific value with an event. In those
    cases, we can pass extra arguments to $emit to provide this value:
  </p>
  <code>
    <pre>
      &lt;button @click="$emit('increaseBy', 1)"&gt;
        Increase by 1
      &lt;/button&gt;
    </pre>
  </code>

  <p>
    Then, when we listen to the event in the parent, we can use an inline arrow
    function as the listener, which allows us to access the event argument:
  </p>
  <code>
    <pre>
      &lt;MyButton @increase-by="(n) => count += n" /&gt;
    </pre>
  </code>

  <p>
    All extra arguments passed to $emit() after the event name will be forwarded
    to the listener. For example, with $emit('foo', 1, 2, 3) the listener
    function will receive three arguments.
  </p>

  <p>
    Although optional, it is recommended to define all emitted events in order
    to better document how a component should work. It also allows Vue to
    exclude known listeners from fallthrough attributes.
  </p>

  <p>
    If a native event (e.g., click) is defined in the emits option, the listener
    will now only listen to component-emitted click events and no longer respond
    to native click events.
  </p>

  <h3>Events Validation</h3>
  <p>
    Similar to prop type validation, an emitted event can be validated if it is
    defined with the object syntax instead of the array syntax.
  </p>
  <p>
    To add validation, the event is assigned a function that receives the
    arguments passed to the emit call and returns a boolean to indicate whether
    the event is valid or not.
  </p>

  <code>
    <pre>
      &lt;script setup&gt;
        const emit = defineEmits({
          // No validation
          click: null,

          // Validate submit event
          submit: ({ email, password }) => {
            if (email && password) {
              return true
            } else {
              console.warn('Invalid submit event payload!')
              return false
            }
          }
        })

        function submitForm(email, password) {
          emit('submit', { email, password })
        }
        &lt;/script&gt;
    </pre>
  </code>

  <h3>Usage with v-model</h3>
  <p>
    Custom events can also be used to create custom inputs that work with
    v-model. Remember that:
  </p>
  <code>
    <pre>
      &lt;input v-model="searchText" /&gt;
    </pre>
  </code>
  <p>does the same thing as:</p>
  <code>
    <pre>
      &lt;input
        :value="searchText"
        @input="searchText = $event.target.value"
      /&gt;
    </pre>
  </code>

  <p>When used on a component, v-model instead does this:</p>
  <code>
    <pre>
      &lt;CustomInput
        :modelValue="searchText"
        @update:modelValue="newValue => searchText = newValue"
      /&gt;
    </pre>
  </code>

  <p>
    For this to actually work though, the &lt;input&gt; inside the component
    must:
  </p>
  <ul>
    <li>Bind the value attribute to the modelValue prop</li>
    <li>On input, emit an update:modelValue event with the new value</li>
  </ul>

  <CustomInput v-model="searchText" class="border" />
  <span>{{ searchText }}</span>

  <p>
    Another way of implementing v-model within this component is to use a
    writable computed property with both a getter and a setter. The get method
    should return the modelValue property and the set method should emit the
    corresponding event:
  </p>

  <CustomInput2 v-model="searchText2" class="border" />
  <span>{{ searchText2 }}</span>

  <h3>v-model arguments</h3>
  <p>
    By default, v-model on a component uses modelValue as the prop and
    update:modelValue as the event. We can modify these names passing an
    argument to v-model:
  </p>
  <code>
    <pre>
      &lt;MyComponent v-model:title="bookTitle" /&gt;
    </pre>
  </code>
  <p>
    In this case, the child component should expect a title prop and emit an
    update:title event to update the parent value:
  </p>
  <code>
    <pre>
      <!-- MyComponent.vue -->
      &lt;script setup&gt;
      defineProps(['title'])
      defineEmits(['update:title'])
      &lt;/script&gt;

      &lt;template&gt;
        &lt;input
          type="text"
          :value="title"
          @input="$emit('update:title', $event.target.value)"
        /&gt;
      &lt;/template&gt;
    </pre>
  </code>

  <h3>Multiple v-model bindings</h3>
  <p>
    By leveraging the ability to target a particular prop and event as we
    learned before with v-model arguments, we can now create multiple v-model
    bindings on a single component instance.
  </p>
  <p>
    Each v-model will sync to a different prop, without the need for extra
    options in the component:
  </p>

  <MultiVModel v-model:firstName="firstName" v-model:lastName="lastName" />
  <div>{{ fullName }}</div>

  <h3>Handling v-model modifiers</h3>
  <p>
    When we were learning about form input bindings, we saw that v-model has
    built-in modifiers - .trim, .number and .lazy. In some cases, however, you
    might also want to add your own custom modifiers.
  </p>
  <p>
    Modifiers added to a component v-model will be provided to the component via
    the modelModifiers prop.
  </p>
  <p>
    Notice the component's modelModifiers prop contains capitalize and its value
    is true - due to it being set on the v-model binding
    v-model.capitalize="myText".
  </p>
  <p>
    For v-model bindings with both argument and modifiers, the generated prop
    name will be arg + "Modifiers".
  </p>

  <CustomVModelModifier
    v-model.capitalize="title"
    v-model:extra.capitalize="extra"
  />

  <div>
    <div>{{ title }}</div>
    <div>{{ extra }}</div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from './CustomInput.vue'
import CustomInput2 from './CustomInput2.vue'
import MultiVModel from './MultiVModel.vue'
import CustomVModelModifier from './CustomVModelModifier.vue'

const emits = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

const searchText = ref('')
const searchText2 = ref('')

const firstName = ref('')
const lastName = ref('')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

const title = ref('')
const extra = ref('')
</script>
