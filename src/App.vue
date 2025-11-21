<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import GearConveyor from './components/GearConveyor.vue';

// Language state - centralized for the entire app
const language = ref<'en' | 'ro'>('en');
</script>

<template>
  <div id="app-container" class="app-container">
    <!-- Decorative gear background - visible on all pages -->
    <!-- To enable parallax, change to: <GearConveyor :enable-parallax="true" /> -->
    <GearConveyor />
    
    <NavBar :language="language" @update:language="language = $event" />
    <RouterView :language="language" />
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
</style>
