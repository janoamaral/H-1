<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Suspense, ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const data = ref('')
const loading = ref(false)

let sse = new EventSource('http://localhost:9000/sse')

sse.onmessage = (event) => {
  if (event.data === '{{start}}') {
    loading.value = true
    data.value = ''
    return
  }

  if (event.data === '{{end}}') {
    setTimeout(() => {
      loading.value = false
    }, 2400)
    return
  }

  data.value += event.data
}

sse.onerror = (event) => {
  console.error('EventSource failed:', event)
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <p id="h1" v-bind:class="{ thinking: loading }">{{ data }}</p>
    </div>
  </header>
</template>

<style scoped>
#h1 {
  margin-top: 2em;
}

.thinking::after {
  content: ' ⬤';
  color: #40d1a4;
  animation: blink 0.8s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}
</style>
