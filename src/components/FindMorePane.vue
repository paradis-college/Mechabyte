<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

const props = defineProps<{
  show: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.show) {
    emit("close");
  }
};

const handleBackdropClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains("find-more-pane")) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="pane">
      <div
        v-if="show"
        class="find-more-pane"
        role="dialog"
        aria-modal="true"
        :aria-label="title"
        @click="handleBackdropClick"
      >
        <div class="find-more-pane-content">
          <button
            class="find-more-pane-close"
            @click="emit('close')"
            aria-label="Close"
          >
            ×
          </button>
          <h2 class="find-more-pane-title">{{ title }}</h2>
          <div class="find-more-pane-body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.find-more-pane {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.find-more-pane-content {
  background: var(--dark-grey);
  border: 2px solid var(--mechabyte-green);
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.find-more-pane-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: var(--light-grey);
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  transition: color 0.2s ease;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.find-more-pane-close:hover {
  color: var(--mechabyte-green);
}

.find-more-pane-close:focus {
  outline: 2px solid var(--mechabyte-green);
  outline-offset: 2px;
}

.find-more-pane-title {
  margin-bottom: 1.5rem;
  padding-right: 3rem;
  color: var(--mechabyte-green);
}

.find-more-pane-body {
  color: var(--light-grey);
  line-height: 1.6;
}

/* Transition animations */
.pane-enter-active,
.pane-leave-active {
  transition: opacity 0.3s ease;
}

.pane-enter-from,
.pane-leave-to {
  opacity: 0;
}

.pane-enter-active .find-more-pane-content,
.pane-leave-active .find-more-pane-content {
  transition: transform 0.3s ease;
}

.pane-enter-from .find-more-pane-content {
  transform: translateY(30px);
}

.pane-leave-to .find-more-pane-content {
  transform: translateY(30px);
}

@media (max-width: 767px) {
  .find-more-pane {
    padding: 1rem;
  }

  .find-more-pane-content {
    padding: 1.5rem;
    max-height: 90vh;
  }
}
</style>
