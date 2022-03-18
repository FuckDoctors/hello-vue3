<template>
  <p>
    watch is lazy, the callback won't be called util the watched sources has
    changed.
  </p>
  <p>
    watchEffect allows us to perform a side effect immediately while
    automatically tracking the effect's reactive dependencies.
  </p>
  <div>
    x: <input v-model="x" class="border" /> y:
    <input v-model="y" class="border" />
  </div>
  <h2>watch vs watchEffect</h2>
  <ul>
    <li>
      watch只能跟踪明确的对象，不会跟踪在callback里的任何东西。而且，callback只会在watch的对象发生变化时执行。
    </li>
    <li>
      watchEffect把依赖跟踪和副作用放到了一起。它会在同步处理中自动跟踪每一个reactive
      property访问。
    </li>
  </ul>
  <p>
    watchEffect only tracks dependencies during its synchronous execution. When
    using it with an async callback, only properties accessed before the first
    await tick will be tracked.
  </p>
  <h2>Callback Flush Timing</h2>
  <p>
    When you mutate reactive state, it may trigger both Vue component updates
    and watcher callbacks created by you.
  </p>
  <p>
    By default, user-created watcher callbacks are called <em>before</em> Vue
    component updates.
  </p>
  <p>
    If you want to access the DOM in a watcher callback <em>after</em> Vue has
    updated it, you need to specify the flush: 'post' option:
  </p>
  <code>
    <pre>
  watch(source, callback, {
    flush: 'post'
  })
  watchEffect(callback, {
    flush: 'post'
  })
  </pre
    >
  </code>

  <p>
    Post-flush watchEffect() also has a convenience alias, watchPostEffect():
  </p>
  <code>
    <pre>
      watchPostEffect(() => {

      })
    </pre>
  </code>

  <h2>Stopping a Watcher</h2>
  <p>
    Watchers declared synchronously inside setup() or &lt;script setup&gt; are
    bound to the owner component instance, and will be automatically stopped
    when the owner component is unmounted. In most cases, you don't need to
    worry about stopping the watcher yourself.
  </p>
  <p>
    The key here is that the watcher must be created synchronously: if the
    watcher is created in an async callback, it won't be bound to the owner
    component and must be stopped manually to avoid memory leaks. Here's an
    example:
  </p>
  <p>
    画重点，<em>同步</em>方式声明在setup 或 script
    setup中的watcher属于组件实例，会在unmounted时自动销毁。
    <em>异步</em>时，需要手动停止，以避免内存泄露。
  </p>

  <code>
    <pre>
      // this will be automatically stopped
      watchEffect(() => {})

      setTimeout(() => {
        // this one will not!
        watchEffect(() => {})
      }, 200)

      const unwatch = watchEffect(() => {})

      // manually stop the watcher
      unwatch()
    </pre>
  </code>

  <p>结论：synchronous creation should be preferred whenever possible</p>
  <p>
    If you need to wait for some async data, you can make your watch logic
    conditional instead:
  </p>

  <code>
    <pre>
      //  data to be loaded asynchronously
      const data = ref(null)

      watchEffect(() => {
        if (data.value) {
          // do something when data is loaded
        }
      })
    </pre>
  </code>
</template>

<script setup>
/* eslint no-console: ["error", { allow: ["log"] }] */
const x = ref('')
const y = ref('')
watchEffect(() => {
  console.log('watchEffect ', x.value)
})

watchEffect(async () => {
  const res = await fetch({
    url: 'https://yesno.wtf/api',
    body: JSON.stringify({
      x: x.value,
    }),
  })
  const result = res.status
  console.log(result)
  // 下面的y不会track，因为在异步callback中，watchEffect只会跟踪第一个await之前的响应对象
  console.log(y.value)
})
</script>
