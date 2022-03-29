<template>
  <div>
    <p>Object or array defaults must be returned from a factory function</p>
    <p>
      If using Type-based props declarations, Vue will try its best to compile
      the type annotations into equivalent runtime prop declarations. For
      example, defineProps&lt;{ msg: string }&gt; will be compiled into { msg: {
      type: String, required: true }}.
    </p>
  </div>

  <p>Additional details:</p>
  <ul>
    <li>
      All props are optional by default, unless required: true is specified.
    </li>
    <li>An absent optional prop will have undefined value.</li>
    <li>
      If a default value is specified, it will be used if the resolved prop
      value is undefined
    </li>
  </ul>

  <h3>Binding Multiple Properties Using an Object</h3>
  <p>
    If you want to pass all the properties of an object as props, you can use
    v-bind without an argument (v-bind instead of :prop-name). For example,
    given a post object:
  </p>

  <code>
    <pre>
      const post = {
        id: 1,
        title: 'My Journey with Vue'
      }

      &lt;BlogPost v-bind="post" /&gt;
    </pre>
  </code>

  <p>Will be equivalent to:</p>
  <code>
    <pre>
      &lt;BlogPost :id="post.id" :title="post.title" /&gt;
    </pre>
  </code>

  <h3>One-Way Data Flow</h3>
  <p>
    All props form a one-way-down binding between the child property and the
    parent one: when the parent property updates, it will flow down to the
    child, but not the other way around.
  </p>
  <p>
    In addition, every time the parent component is updated, all props in the
    child component will be refreshed with the latest value. This means you
    should <em>not</em> attempt to mutate a prop inside a child component.
  </p>

  <p>There are usually two cases where it's tempting to mutate a prop:</p>
  <ol>
    <li>
      The prop is used to pass in an initial value; the child component wants to
      use it as a local data property afterwards. In this case, it's best to
      define a local data property that uses the prop as its initial value:
      <code>
        <pre>
          const props = defineProps(['initialCounter'])

          // counter only uses props.initialCounter as the initial value;
          // it is disconnected from future prop updates.
          const counter = ref(props.initialCounter)
        </pre>
      </code>
    </li>
    <li>
      <code>
        The prop is passed in as a raw value that needs to be transformed. In
        this case, it's best to define a computed property using the prop's
        value:
        <pre>
          const props = defineProps(['size'])

          // computed property that auto-updates when the prop changes
          const normalizedSize = computed(() => props.size.trim().toLowerCase())
        </pre>
      </code>
    </li>
  </ol>
</template>

<script setup lang="ts">
/* eslint no-console: ["error", { allow: ["log"] }] */
const props = defineProps<{
  title?: String
  likes?: Number
}>()

onMounted(() => {
  /**
   * ShallowReactive<
   *  likes: undefined
   *  title: undefined
   * >
   */
  console.log(props)
})
</script>
