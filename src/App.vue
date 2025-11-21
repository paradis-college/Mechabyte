<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import GearConveyor from './components/GearConveyor.vue';

// Language state - centralized for the entire app
const language = ref<'en' | 'ro'>('en');

// Show GearConveyor on all pages except home
const route = useRoute();
const showGearConveyor = computed(() => route.name !== 'home');
</script>

<template>
  <div id="app-container" class="app-container">
    <GearConveyor v-if="showGearConveyor" />
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
