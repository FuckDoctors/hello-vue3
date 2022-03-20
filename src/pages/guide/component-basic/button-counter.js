import { ref } from 'vue'

export default {
  setup() {
    const counter = ref(0)
    const increment = () => counter.value++

    return {
      counter,
      increment,
    }
  },
  template: `
    <button @click="increment"> You clicked me {{ counter }} times. </Button>
   `,
}
