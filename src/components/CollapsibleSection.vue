<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  defaultOpen?: boolean;
}>();

const isOpen = ref(props.defaultOpen ?? false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="collapsible-section">
    <button class="section-header" @click="toggle">
      <h3>{{ title }}</h3>
      <span class="toggle-icon" :class="{ open: isOpen }">▼</span>
    </button>
    
    <transition name="expand">
      <div v-if="isOpen" class="section-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.collapsible-section {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 0.15vw solid rgba(0, 255, 0, 0.2);
  border-radius: 0.5vw;
  margin: 2vw 0;
  overflow: hidden;
}

.section-header {
  width: 100%;
  background: rgba(0, 255, 0, 0.05);
  border: none;
  padding: 1.5vw 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.section-header:hover {
  background: rgba(0, 255, 0, 0.1);
}

.section-header h3 {
  color: var(--mechabyte-green);
  font-size: 1.6vw;
  margin: 0;
  text-align: left;
}

.toggle-icon {
  color: var(--mechabyte-green);
  font-size: 1.2vw;
  transition: transform 0.3s ease;
}

.toggle-icon.open {
  transform: rotate(180deg);
}

.section-content {
  padding: 2vw;
  border-top: 0.1vw solid rgba(0, 255, 0, 0.2);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media only screen and (max-width: 1000px) {
  .collapsible-section {
    border: 2px solid rgba(0, 255, 0, 0.2);
    border-radius: 8px;
    margin: 20px 0;
  }
  
  .section-header {
    padding: 15px 20px;
  }
  
  .section-header h3 {
    font-size: 20px;
  }
  
  .toggle-icon {
    font-size: 16px;
  }
  
  .section-content {
    padding: 20px;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
  }
}
</style>
