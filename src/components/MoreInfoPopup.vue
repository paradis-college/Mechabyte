<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  buttonText?: string;
}>();

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="more-info-wrapper">
    <button class="more-info-button" @click="toggle">
      <span class="icon">{{ isOpen ? '▼' : '▶' }}</span>
      {{ buttonText || 'More Info' }}
    </button>
    
    <transition name="slide">
      <div v-if="isOpen" class="popup-overlay" @click.self="close">
        <div class="popup-content">
          <div class="popup-header">
            <h3>{{ title }}</h3>
            <button class="close-button" @click="close">✕</button>
          </div>
          <div class="popup-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.more-info-wrapper {
  display: inline-block;
}

.more-info-button {
  background: rgba(0, 255, 0, 0.1);
  border: 0.1vw solid var(--mechabyte-green);
  color: var(--mechabyte-green);
  padding: 0.6vw 1.2vw;
  border-radius: 0.3vw;
  cursor: pointer;
  font-size: 0.9vw;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5vw;
}

.more-info-button:hover {
  background: rgba(0, 255, 0, 0.2);
  transform: translateY(-0.1vw);
  box-shadow: 0 0 0.5vw rgba(0, 255, 0, 0.3);
}

.icon {
  font-size: 0.8vw;
  transition: transform 0.3s ease;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2vw;
}

.popup-content {
  background: #1a1a24;
  border: 0.2vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  max-width: 50vw;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2vw rgba(0, 255, 0, 0.3);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5vw 2vw;
  border-bottom: 0.1vw solid rgba(0, 255, 0, 0.3);
  background: rgba(0, 255, 0, 0.05);
}

.popup-header h3 {
  color: var(--mechabyte-green);
  font-size: 1.4vw;
  margin: 0;
}

.close-button {
  background: transparent;
  border: none;
  color: var(--mechabyte-green);
  font-size: 1.8vw;
  cursor: pointer;
  padding: 0;
  width: 2vw;
  height: 2vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(0, 255, 0, 0.2);
  transform: rotate(90deg);
}

.popup-body {
  padding: 2vw;
  overflow-y: auto;
  color: #ddd;
  font-size: 1vw;
  line-height: 1.6;
}

.popup-body :deep(p) {
  margin-bottom: 1vw;
}

.popup-body :deep(ul) {
  margin-left: 1.5vw;
  margin-bottom: 1vw;
}

.popup-body :deep(li) {
  margin-bottom: 0.5vw;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-active .popup-content,
.slide-leave-active .popup-content {
  transition: transform 0.3s ease;
}

.slide-enter-from .popup-content,
.slide-leave-to .popup-content {
  transform: scale(0.9);
}

@media only screen and (max-width: 1000px) {
  .more-info-button {
    padding: 8px 16px;
    font-size: 13px;
    border: 1px solid var(--mechabyte-green);
    border-radius: 4px;
  }
  
  .more-info-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
  }
  
  .icon {
    font-size: 11px;
  }
  
  .popup-overlay {
    padding: 20px;
  }
  
  .popup-content {
    max-width: 90vw;
    max-height: 85vh;
    border: 2px solid var(--mechabyte-green);
    border-radius: 8px;
  }
  
  .popup-header {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0, 255, 0, 0.3);
  }
  
  .popup-header h3 {
    font-size: 18px;
  }
  
  .close-button {
    font-size: 24px;
    width: 30px;
    height: 30px;
  }
  
  .popup-body {
    padding: 20px;
    font-size: 14px;
  }
  
  .popup-body :deep(p) {
    margin-bottom: 15px;
  }
  
  .popup-body :deep(ul) {
    margin-left: 20px;
    margin-bottom: 15px;
  }
  
  .popup-body :deep(li) {
    margin-bottom: 8px;
  }
}
</style>
