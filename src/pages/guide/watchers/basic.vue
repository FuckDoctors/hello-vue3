<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" type="text" class="border" />
  </p>
  <p>{{ answer }}</p>
</template>

<script setup>
const question = ref('')
const answer = ref('Questions usually contain a mark. ;-)')

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = `Error! Could not reach the API. ${error}`
    }
  }
})
</script>
