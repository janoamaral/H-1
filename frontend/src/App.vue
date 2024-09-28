<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Suspense, ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const data = ref('')
const loading = ref(false)

let sse = new EventSource('http://localhost:9000/sse')

sse.onmessage = (event) => {
  data.value = event.data
}

// onMounted(async () => {
//   loading.value = true
//   const res = await fetch('http://localhost:9000/')
//   if (!res.ok) {
//     data.value = 'Failed to fetch data'
//   } else {
//     const decoder = new TextDecoder('utf-8')
//     for await (const chunk of res.body.values()) {
//       data.value += decoder.decode(chunk)
//     }
//   }
// 
//   setTimeout(() => {
//     loading.value = false
//   }, 2400)
// })
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <p id="h1" v-bind:class="{ thinking: loading }">{{ data }}</p>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

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

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
