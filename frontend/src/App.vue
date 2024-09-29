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
    <div class="main">
      <p id="h1" v-bind:class="{ thinking: loading }">{{ data }}</p>
    </div>
  </header>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 70vw;
}
#h1 {
  margin-top: 2em;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2em;
}

.thinking::after {
  content: '█';
  color: #40d1a4;
  animation: blink 0.6s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}
</style>
