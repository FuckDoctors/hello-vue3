<template>
  <div>
    <button @click="greet">click me</button>
  </div>
  <div @click="warn('你点击了', $event)">click me</div>
  <p @click="(event) => warn('你点击了', event)">click me</p>
  <div>
    <a href="/guide" @click.prevent="greet">click me</a>
  </div>
  <p @click.ctrl="greet">ctrl + click me(not work)</p>
</template>

<script setup>
const greet = (event) => {
  alert(`你点击了${event.target.tagName}`)
}

const warn = (msg, evt) => {
  alert(msg + evt.target.tagName)
}
</script>
