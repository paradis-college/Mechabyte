<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';

interface Props {
  name?: 'sensor' | 'bolt' | 'circuit' | 'chip';
  size?: number | string;
  className?: string;
  animateOnVisible?: boolean;
  visible?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'sensor',
  size: 24,
  animateOnVisible: false,
  visible: false,
});

const isAnimating = ref(false);

const sizeValue = computed(() => {
  return typeof props.size === 'number' ? `${props.size}px` : props.size;
});

// Trigger animation on mount if not waiting for visibility
onMounted(() => {
  if (!props.animateOnVisible) {
    isAnimating.value = true;
  }
});

// Trigger animation when visible prop changes
watch(() => props.visible, (newVal) => {
  if (props.animateOnVisible && newVal) {
    isAnimating.value = true;
  }
});

// SVG path definitions for different icons
const icons = {
  sensor: {
    viewBox: '0 0 24 24',
    paths: [
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
      'M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z',
      'M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
    ],
  },
  bolt: {
    viewBox: '0 0 24 24',
    paths: [
      'M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z',
    ],
  },
  circuit: {
    viewBox: '0 0 24 24',
    paths: [
      'M3 3v18h18V3H3zm8 16H5v-2h6v2zm0-4H5v-2h6v2zm0-4H5V9h6v2zm0-4H5V5h6v2zm8 12h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6V9h6v2zm0-4h-6V5h6v2z',
    ],
  },
  chip: {
    viewBox: '0 0 24 24',
    paths: [
      'M6 4h12v2h2v2h-2v2h2v2h-2v2h2v2h-2v2h2v2h-2v-2H6v2H4v-2h2v-2H4v-2h2v-2H4v-2h2V8H4V6h2V4h2V2H6v2zm2 4v8h8V8H8z',
      'M10 10h4v4h-4z',
    ],
  },
};
</script>

<template>
  <svg
    :class="['animated-svg-icon', className, { 'is-animating': isAnimating }]"
    :width="sizeValue"
    :height="sizeValue"
    :viewBox="icons[name].viewBox"
    :aria-hidden="!ariaLabel"
    :aria-label="ariaLabel"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      v-for="(path, index) in icons[name].paths"
      :key="index"
      :d="path"
      :class="`path-${index}`"
    />
  </svg>
</template>

<style scoped>
.animated-svg-icon {
  display: inline-block;
  fill: currentColor;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.animated-svg-icon path {
  transform-origin: center;
  opacity: 0;
  animation: none;
}

.animated-svg-icon.is-animating path {
  animation: drawIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animated-svg-icon.is-animating path.path-0 {
  animation-delay: 0s;
}

.animated-svg-icon.is-animating path.path-1 {
  animation-delay: 0.15s;
}

.animated-svg-icon.is-animating path.path-2 {
  animation-delay: 0.3s;
}

@keyframes drawIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulse animation variant for hover */
.animated-svg-icon:hover {
  animation: pulse 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .animated-svg-icon,
  .animated-svg-icon path {
    animation: none !important;
    transition: none !important;
  }
  
  .animated-svg-icon.is-animating path {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
