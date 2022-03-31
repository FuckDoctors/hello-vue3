<template>
  <h3>Slot Content and Outlet</h3>
  <FancyButton />
  <button>{{ btnText }}</button>
  <FancyButton>
    {{ btnText }}
  </FancyButton>
  <FancyButton>
    <span style="color: red">Click me!</span>
    <AwesomeIcon name="heart" />
  </FancyButton>
</template>

<script setup>
import FancyButton from './FancyButton.vue'
import AwesomeIcon from './AwesomeIcon.vue'

const btnText = ref('Click me!')
</script>
