<template>
  <div class="static" :class="{ active: isActive, 'has-error': hasError }">
    Binding to object
  </div>
  <div :class="classObject">classObject</div>
  <div :class="computedClass">computedClass</div>
  <div :class="[clsBold, 'has-error', { active: isActive }]">Binding array</div>
  <div :style="{ color: fontColor, fontSize: fontSize + 'px' }">
    inline style
  </div>
  <div :style="styleObject">style object</div>
</template>

<script setup>
const isActive = ref(true)
const hasError = ref(false)
const clsBold = ref('bold')

const classObject = reactive({
  active: true,
  'has-error': false,
})

const computedClass = computed(() => ({
  active: isActive.value && !hasError.value,
  'has-error': hasError.value,
}))

const fontColor = ref('red')
const fontSize = ref(30)
const styleObject = reactive({
  color: 'red',
  fontSize: '24px',
})
</script>

<style lang="scss" scoped>
.static {
  color: gray;
}

.active {
  color: red;
}

.has-error {
  background-color: blue;
}

.bold {
  font-weight: 600;
}
</style>
