<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';

// Language state - centralized for the entire app
const language = ref<'en' | 'ro'>('en');
</script>

<template>
  <div id="app-container" class="app-container">
    <NavBar :language="language" @update:language="language = $event" />
    <RouterView :language="language" />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
</style>
