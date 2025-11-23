<script setup lang="ts">
import { ref } from 'vue';
import ControllerAnimation from './animations/ControllerAnimation.vue';

const props = defineProps<{
  season: 'centerstage' | 'into-the-deep';
}>();

const showBothControllers = ref(true);
const selectedDriver = ref<1 | 2>(1);
</script>

<template>
  <div class="driver-controls-interactive">
    <div class="view-toggle">
      <button 
        :class="{ active: showBothControllers }" 
        @click="showBothControllers = true"
        class="toggle-btn"
      >
        Both Controllers
      </button>
      <button 
        :class="{ active: !showBothControllers }" 
        @click="showBothControllers = false"
        class="toggle-btn"
      >
        Single View
      </button>
    </div>

    <div v-if="!showBothControllers" class="driver-selector">
      <button 
        :class="{ active: selectedDriver === 1 }" 
        @click="selectedDriver = 1"
        class="driver-btn"
      >
        Driver 1
      </button>
      <button 
        :class="{ active: selectedDriver === 2 }" 
        @click="selectedDriver = 2"
        class="driver-btn"
      >
        Driver 2
      </button>
    </div>

    <div v-if="showBothControllers" class="controllers-grid">
      <ControllerAnimation :season="season" :driver-number="1" />
      <ControllerAnimation :season="season" :driver-number="2" />
    </div>

    <div v-else class="single-controller">
      <ControllerAnimation :season="season" :driver-number="selectedDriver" />
    </div>
  </div>
</template>

<style scoped>
.driver-controls-interactive {
  width: 100%;
  margin: 2vw 0;
}

.view-toggle {
  display: flex;
  justify-content: center;
  gap: 1vw;
  margin-bottom: 2vw;
}

.toggle-btn,
.driver-btn {
  padding: 0.8vw 2vw;
  background: rgba(0, 0, 0, 0.5);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.3vw;
  color: #aaa;
  font-size: 1vw;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-btn:hover,
.driver-btn:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: var(--mechabyte-green);
  color: var(--mechabyte-green);
}

.toggle-btn.active,
.driver-btn.active {
  background: rgba(0, 255, 0, 0.2);
  border-color: var(--mechabyte-green);
  color: var(--mechabyte-green);
  font-weight: 600;
}

.driver-selector {
  display: flex;
  justify-content: center;
  gap: 1vw;
  margin-bottom: 2vw;
}

.controllers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2vw;
}

.single-controller {
  max-width: 800px;
  margin: 0 auto;
}

@media only screen and (max-width: 1000px) {
  .toggle-btn,
  .driver-btn {
    padding: 10px 20px;
    border: 1px solid rgba(0, 255, 0, 0.3);
    border-radius: 5px;
    font-size: 14px;
  }

  .view-toggle,
  .driver-selector {
    gap: 10px;
    margin-bottom: 20px;
  }

  .controllers-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
