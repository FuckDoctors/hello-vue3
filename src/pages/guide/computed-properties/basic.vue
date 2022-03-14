<template>
  <p>Has published books:</p>
  <span>{{ publishedBookMessage }}</span>
</template>

<script setup>
const author = reactive({
  name: 'zhaobc',
  books: ['Vue2', 'Vue3'],
})

const publishedBookMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>
