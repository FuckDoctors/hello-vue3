<template>
  <p>Injected message: {{ message }}</p>
  <p>Injected location: {{ location }}</p>
  <p>
    location: <input v-model="newLocation" class="border" />
    <button class="btn" @click="handleLocation">Update</button>
  </p>

  <p>Injected by Symbol key: {{ symbolMessage }}</p>
</template>

<script setup>
import { myInjectionKey } from './keys'

const message = inject('message', 'Here is default value')

const newLocation = ref('')
const { location, updateLocation } = inject('location')

const handleLocation = () => {
  updateLocation(newLocation.value)
}

const symbolMessage = inject(myInjectionKey)
</script>
