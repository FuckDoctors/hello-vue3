<template>
  <h2>Dynamic Components</h2>
  <p>
    <code>
      <pre>
        &lt;!-- Component changes when currentTab changes --&gt;
        &lt;component :is="tabs[currentTab]"&gt;&lt;/component&gt;
      </pre>
    </code>
  </p>

  <p>In the example above, the value passed to :is can contain either:</p>
  <ul>
    <li>the name string of a registered component, OR</li>
    <li>the actual imported component object</li>
  </ul>
  <p>You can also use the is attribute to create regular HTML elements.</p>
  <p>
    When switching between multiple components with &lt;component :is="..."&gt;,
    a component will be unmounted when it is switched away from. We can force
    the inactive components to stay "alive" with the built-in &lt;KeepAlive&gt;
    component.
  </p>

  <h2>Element Placement Restrictions</h2>
  <p>
    <code>
      <pre>
        &lt;table&gt;
          &lt;tr is="vue:blog-post-row"&gt;&lt;/tr&gt;
        &lt;/table&gt;
      </pre>
    </code>
  </p>
</template>
