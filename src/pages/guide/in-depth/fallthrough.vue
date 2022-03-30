<template>
  <h1>Fallthrough Attributes</h1>

  <h2>Attribute Inheritance</h2>
  <p>
    A "fallthrough attribute" is an attribute or v-on event listener that is
    passed to a component, but is not explicitly declared in the receiving
    component's props or emits. Common examples of this include class, style,
    and id attributes.
  </p>

  <h3>class and style Merging</h3>
  <p>
    If the child component's root element already has existing class or style
    attributes, it will be merged with the class and style values that are
    inherited from the parent.
  </p>

  <h3>v-on Listener Inheritance</h3>
  <p>The same rule applies to v-on event listeners:</p>
  <code>
    <pre>
      &lt;MyButton @click="onClick" /&gt;
    </pre>
  </code>
  <p>
    The click listener will be added to the root element of &lt;MyButton&gt;,
    i.e. the native &lt;button&gt; element. When the native &lt;button&gt; is
    clicked, it will trigger the onClick method of the parent component. If the
    native &lt;button&gt; already has a click listener bound with v-on, then
    both listeners will trigger.
  </p>

  <h3>Nested Component Inheritance</h3>
  <p>
    If a component renders another component as its root node, for example, we
    refactored &lt;MyButton&gt; to render a &lt;BaseButton&gt; as its root:
  </p>
  <code>
    <pre>
      &lt;!-- template of &lt;MyButton/&gt; that simply renders another component --&gt;
      &lt;BaseButton /&gt;
    </pre>
  </code>
  <p>
    Then the fallthrough attributes received by &lt;MyButton&gt; will be
    automatically forwarded to &lt;BaseButton&gt;.
  </p>

  <p>Note that:</p>
  <ol>
    <li>
      Forwarded attributes do not include any attributes that are declared as
      props, or v-on listeners of declared events by &lt;MyButton&gt; - in other
      words, the declared props and listeners have been "consumed" by
      &lt;MyButton&gt;.
    </li>
    <li>
      Forwarded attributes may be accepted as props by &lt;BaseButton&gt;, if
      declared by it.
    </li>
  </ol>

  <h3>Disabling Attribute Inheritance</h3>
  <p>
    If you do not want a component to automatically inherit attributes, you can
    set inheritAttrs: false in the component's options.
  </p>
  <p>
    If using &lt;script setup&gt;, you will need to declare this option using a
    separate, normal &lt;script&gt; block:
  </p>

  <code>
    <pre>
      &lt;script&gt;
      export default {
        inheritAttrs: false
      }
      &lt;/script&gt;

      &lt;script setup&gt;
      // setup logic...
      &lt;/script&gt;
    </pre>
  </code>

  <p>
    These fallthrough attributes can be accessed directly in template
    expressions as $attrs:
  </p>
  <code>
    <pre>
      &lt;span&gt;Fallthrough attributes: {{ $attrs }}&lt;/span&gt;
    </pre>
  </code>

  <p>
    The $attrs object includes all attributes that are not declared by the
    component's props or emits options (e.g., class, style, v-on listeners,
    etc.).
  </p>

  <p>Some notes:</p>
  <ul>
    <li>
      Unlike props, fallthrough attributes preserve their original casing in
      JavaScript, so an attribute like foo-bar needs to be accessed as
      $attrs['foo-bar'].
    </li>
    <li>
      A v-on event listener like @click will be exposed on the object as a
      function under $attrs.onClick.
    </li>
  </ul>

  <h3>Accessing Fallthrough Attributes in JavaScript</h3>
  <p>
    If needed, you can access a component's fallthrough attributes in &lt;script
    setup&gt; using the useAttrs() API:
  </p>

  <code>
    <pre>
      &lt;script&gt; setup&gt;
        import { useAttrs } from 'vue'

        const attrs = useAttrs()
      &lt;/script&gt;
    </pre>
  </code>

  <p>
    If not using &lt;script setup&gt;, attrs will be exposed as a property of
    the setup() context:
  </p>
  <code>
    <pre>
      &lt;script&gt; setup&gt;
        export default {
          setup(props, ctx) {
            console.log(ctx.attrs)
          }
        }
      &lt;/script&gt;
    </pre>
  </code>

  <p>
    Note that although the attrs object here always reflect the latest
    fallthrough attributes, it isn't reactive (for performance reasons).
  </p>
  <p>
    You cannot use watchers to observe its changes. If you need reactivity, use
    a prop.
  </p>
  <p>
    Alternatively, you can use onUpdated() to perform side effects with latest
    attrs on each update.
  </p>

  <BaseButton class="outter-class" prop-a="a" prop-b="b" @click="outterClick" />
  <BaseButton2
    class="outter-class"
    prop-a="a2"
    prop-b="b2"
    @click="outterClick"
  />
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["log"] }] */
import BaseButton from './BaseButton.vue'
import BaseButton2 from './BaseButton2.vue'

const outterClick = () => {
  console.log('outterClick')
}
</script>
