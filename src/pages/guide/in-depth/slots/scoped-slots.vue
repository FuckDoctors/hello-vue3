<template>
  <h3>Scoped Slots</h3>

  <p>
    As discussed in Render Scope, slot content does not have access to state in
    the child component.
  </p>

  <p>
    However, there are cases where it could be useful if a slot's content can
    make use of data from both the parent scope and the child scope.
  </p>

  <p>
    In fact, we can do exactly that - we can pass attributes to a slot outlet
    just like passing props to a component:
  </p>

  <code>
    <pre>
      <!-- <MyComponent> template -->
      &lt;div&gt;
        &lt;slot&gt; :text="greetingMessage" :count="1"&gt;&lt;/slot&gt;
      &lt;/div&gt;
    </pre>
  </code>

  <p>
    Receiving the slot props is a bit different when using a single default slot
    vs. using named slots. We are going to show how to receive props using a
    single default slot first, by using v-slot directly on the child component
    tag:
  </p>

  <code>
    <pre>
      &lt;MyComponent v-slot="slotProps"&gt;
        &lcub;&lcub; slotProps.text &rcub;&rcub; &lcub;&lcub; slotProps.count &rcub;&rcub;
      &lt;/MyComponent&gt;
    </pre>
  </code>

  <MyComponent v-slot="slotProps">
    {{ slotProps.text }} {{ slotProps.count }}
  </MyComponent>

  <p>
    The props passed to the slot by the child are available as the value of the
    corresponding v-slot directive, which can be accessed by expressions inside
    the slot.
  </p>

  <p>
    You can think of a scoped slot as a function being passed into the child
    component. The child component then calls it and passing props as arguments:
  </p>

  <code>
    <pre>
      MyComponent({
        // passing the default slot, but as a function
        default: (slotProps) => {
          return `${slotProps.text} ${slotProps.count}`
        }
      })

      function MyComponent(slots) {
        const greetingMessage = 'hello'
        return (
          `
            &lt;div&gt;
            ${
              // call the slot function with props!
              slots.default({ text: greetingMessage, count: 1 })
            }
            &lt;/div&gt;
          `
        )
      }
    </pre>
  </code>

  <p>
    Notice how v-slot="slotProps" matches the slot function signature. Just like
    with function arguments, we can use destructuring in v-slot:
  </p>

  <code>
    <pre>
      &lt;MyComponent v-slot="{ text, count }"&gt;
        &lcub;&lcub; text &rcub;&rcub; &lcub;&lcub; count &rcub;&rcub;
      &lt;/MyComponent&gt;
    </pre>
  </code>

  <MyComponent v-slot="{ text, count }"> {{ text }} {{ count }} </MyComponent>

  <h3>Named Scoped Slots</h3>

  <p>
    Named scoped slots work similarly - slot props are accessible as the value
    of the v-slot directive: v-slot:name="slotProps". When using the shorthand,
    it looks like this:
  </p>

  <code>
    <pre>
      &lt;MyComponent&gt;
        &lt;template #header="headerProps"&gt;
          &lcub;&lcub; headerProps &rcub;&rcub;
        &lt;/template&gt;

        &lt;template #default="defaultProps"&gt;
          &lcub;&lcub; defaultProps &rcub;&rcub;
        &lt;/template&gt;

        &lt;template #footer="footerProps"&gt;
          &lcub;&lcub; footerProps &rcub;&rcub;
        &lt;/template&gt;
      &lt;/MyComponent&gt;
    </pre>
  </code>

  <p>Passing props to a named slot:</p>
  <code>
    <pre>
      &lt;slot name="header" message="hello"&gt;&lt;/slot&gt;
    </pre>
  </code>
  <p>
    Note the name of a slot won't be included in the props because it is
    reserved - so the resulting headerProps would be { message: 'hello' }.
  </p>

  <BaseLayoutWithProps>
    <template #header="headerProps">
      {{ headerProps }}
    </template>
    <template #default="defaultProps">
      {{ defaultProps }}
    </template>
    <template #footer="footertProps">
      {{ footertProps }}
    </template>
  </BaseLayoutWithProps>

  <FancyList :api-url="url" :per-page="10">
    <template #item="{ body, username, likes }">
      <div class="item">
        <p>{{ body }}</p>
        <p class="meta">by {{ username }} | {{ likes }} likes</p>
      </div>
    </template>
  </FancyList>

  <h3>Renderless Components</h3>
  <p>
    we can come up with components that only encapsulate logic and do not render
    anything by themselves - visual output is fully delegated to the consumer
    component with scoped slots. We call this type of component a Renderless
    Component.
  </p>

  <p>
    An example renderless component could be one that encapsulates the logic of
    tracking the current mouse position:
  </p>

  <code>
    <pre>
      &lt;MouseTracker v-slot="{ x, y }"&gt;
        Mouse is at: &lcub;&lcub; x &rcub;&rcub;, &lcub;&lcub; y &rcub;&rcub;
      &lt;/MouseTracker&gt;
    </pre>
  </code>

  <MouseTracker v-slot="{ x, y }"> Mouse is at: {{ x }}, {{ y }} </MouseTracker>

  <p>
    While an interesting pattern, most of what can be achieved with Renderless
    Components can be achieved in a more efficient fashion with Composition API,
    without incurring the overhead of extra component nesting. Later, we will
    see how we can implement the same mouse tracking functionality as a
    Composable.
  </p>
</template>

<script setup>
import MyComponent from './MyComponent.vue'
import BaseLayoutWithProps from './BaseLayoutWithProps.vue'
import FancyList from './FancyList.vue'
import MouseTracker from './MouseTracker.vue'
</script>

<style scoped>
.meta {
  color: #42b883;
  font-size: 0.8em;
}
</style>
