<template>
  <div>
    <div>
      First Name: <input v-model="firstName" type="text" class="border" />
    </div>
    <div>
      Last Name: <input v-model="lastName" type="text" class="border" />
    </div>
    <div>
      Full Name: <input v-model="fullName" type="text" class="border" />
    </div>
  </div>
</template>

<script setup>
const firstName = ref('')
const lastName = ref('')

// 注意，此处的computed不是个剪头函数，而是一个对象
const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    // // Note: we are using destructuring assignment syntax here.
    ;[firstName.value, lastName.value] = newValue.split(' ')
  },
})
</script>
