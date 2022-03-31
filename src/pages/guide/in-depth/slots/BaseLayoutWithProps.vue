<template>
  <div class="container">
    <header>
      <slot name="header" message="message from header" />
    </header>
    <main>
      <slot message="message from main" />
    </main>
    <footer>
      <slot name="footer" message="message from footer" />
    </footer>
  </div>
</template>
