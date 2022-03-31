<template>
  <h3>Named Slots</h3>
  <p>A &lt;slot&gt; outlet without name implicitly has the name "default".</p>

  <p>
    To pass a named slot, we need to use a &lt;template&gt; element with the
    v-slot directive, and then pass the name of the slot as an argument to
    v-slot:
  </p>

  <code>
    <pre>
      &lt;BaseLayout&gt;
        &lt;template v-slot:header&gt;
          &lt;!-- content for the header slot --&gt;
        &lt;/template&gt;
      &lt;/BaseLayout&gt;
    </pre>
  </code>

  <p>
    v-slot has a dedicated shorthand #, so &lt;template v-slot:header&gt; can be
    shortened to just &lt;template #header&gt;.
  </p>

  <BaseLayout>
    <template #header>
      <h1>这里是header</h1>
    </template>
    <template #default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>
    <template #footer>
      <p>这里是footer</p>
    </template>
  </BaseLayout>

  <h3>Dynamic Slot Names</h3>
  <p>
    Dynamic directive arguments also work on v-slot, allowing the definition of
    dynamic slot names:
  </p>
  <code>
    <pre>
      &lt;BaseLayout&gt;
        &lt;template v-slot:[dynamicSlotName]&gt;
          ...
        &lt;/template&gt;

        &lt;!-- with shorthand --&gt;
        &lt;template #[dynamicSlotName]&gt;
          ...
        &lt;/template&gt;
      &lt;/BaseLayout&gt;
    </pre>
  </code>

  <BaseLayout>
    <template #[dynamicSlotName]>
      dynamicSlotName: {{ dynamicSlotName }}
    </template>
  </BaseLayout>

  <BaseLayout>
    <template #[dynamicSlotName]>
      dynamicSlotName: {{ dynamicSlotName }} shorthand
    </template>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from './BaseLayout.vue'

const dynamicSlotName = ref('header')
</script>
