<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

interface Props {
  className?: string;
  ariaHidden?: boolean;
  enableParallax?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  ariaHidden: true,
  enableParallax: false
});

// Parallax state
const gearLayer1Ref = ref<HTMLDivElement | null>(null);
const gearLayer2Ref = ref<HTMLDivElement | null>(null);
const conveyorRef = ref<HTMLDivElement | null>(null);

let animationFrameId: number | null = null;

// Check for reduced motion preference
const prefersReducedMotion = ref(false);

const updateParallax = () => {
  if (!props.enableParallax || prefersReducedMotion.value) return;
  
  const scrollY = window.scrollY;
  
  if (gearLayer1Ref.value) {
    gearLayer1Ref.value.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
  if (gearLayer2Ref.value) {
    gearLayer2Ref.value.style.transform = `translateY(${scrollY * 0.15}px)`;
  }
  if (conveyorRef.value) {
    conveyorRef.value.style.transform = `translateY(${scrollY * 0.1}px)`;
  }
  
  animationFrameId = requestAnimationFrame(updateParallax);
};

onMounted(() => {
  // Check for prefers-reduced-motion
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mediaQuery.matches;
    
    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    
    // Start parallax if enabled
    if (props.enableParallax && !prefersReducedMotion.value) {
      animationFrameId = requestAnimationFrame(updateParallax);
    }
    
    // Cleanup listener
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handler);
    });
  }
});

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
});

const containerClass = computed(() => {
  const classes = ['gear-conveyor-container'];
  if (props.className) classes.push(props.className);
  return classes.join(' ');
});

const gearClass = computed(() => {
  return prefersReducedMotion.value ? 'gear gear--paused' : 'gear';
});
</script>

<template>
  <div :class="containerClass" :aria-hidden="ariaHidden">
    <!-- Conveyor stripe background layer -->
    <div ref="conveyorRef" class="conveyor-layer"></div>
    
    <!-- Gear layer 1 (background, slower rotation) -->
    <div ref="gearLayer1Ref" class="gear-layer gear-layer-1">
      <svg :class="gearClass" class="gear-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" />
        <g fill="var(--gear-accent)">
          <rect x="47" y="10" width="6" height="15" rx="2" />
          <rect x="47" y="75" width="6" height="15" rx="2" />
          <rect x="10" y="47" width="15" height="6" rx="2" />
          <rect x="75" y="47" width="15" height="6" rx="2" />
          <rect x="20" y="20" width="6" height="15" rx="2" transform="rotate(45 23 27.5)" />
          <rect x="74" y="20" width="6" height="15" rx="2" transform="rotate(-45 77 27.5)" />
          <rect x="20" y="65" width="6" height="15" rx="2" transform="rotate(-45 23 72.5)" />
          <rect x="74" y="65" width="6" height="15" rx="2" transform="rotate(45 77 72.5)" />
        </g>
        <circle cx="50" cy="50" r="15" fill="var(--dark-grey)" />
      </svg>
      
      <svg :class="gearClass" class="gear-2" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" />
        <g fill="var(--gear-accent)">
          <rect x="47" y="15" width="6" height="12" rx="2" />
          <rect x="47" y="73" width="6" height="12" rx="2" />
          <rect x="15" y="47" width="12" height="6" rx="2" />
          <rect x="73" y="47" width="12" height="6" rx="2" />
          <rect x="25" y="25" width="6" height="12" rx="2" transform="rotate(45 28 31)" />
          <rect x="69" y="25" width="6" height="12" rx="2" transform="rotate(-45 72 31)" />
          <rect x="25" y="63" width="6" height="12" rx="2" transform="rotate(-45 28 69)" />
          <rect x="69" y="63" width="6" height="12" rx="2" transform="rotate(45 72 69)" />
        </g>
        <circle cx="50" cy="50" r="12" fill="var(--dark-grey)" />
      </svg>
    </div>
    
    <!-- Gear layer 2 (foreground, faster rotation) -->
    <div ref="gearLayer2Ref" class="gear-layer gear-layer-2">
      <svg :class="gearClass" class="gear-3" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="28" fill="var(--robot-metal)" />
        <g fill="var(--gear-accent)">
          <rect x="47" y="18" width="6" height="10" rx="2" />
          <rect x="47" y="72" width="6" height="10" rx="2" />
          <rect x="18" y="47" width="10" height="6" rx="2" />
          <rect x="72" y="47" width="10" height="6" rx="2" />
          <rect x="28" y="28" width="6" height="10" rx="2" transform="rotate(45 31 33)" />
          <rect x="66" y="28" width="6" height="10" rx="2" transform="rotate(-45 69 33)" />
          <rect x="28" y="62" width="6" height="10" rx="2" transform="rotate(-45 31 67)" />
          <rect x="66" y="62" width="6" height="10" rx="2" transform="rotate(45 69 67)" />
        </g>
        <circle cx="50" cy="50" r="10" fill="var(--dark-grey)" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
/* CSS Variables */
:root {
  --robot-metal: hsl(0deg 0% 25% / 100%);
  --gear-accent: hsl(120deg 100% 50% / 30%);
  --conveyor-bg: hsl(0deg 0% 15% / 100%);
}

.gear-conveyor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

/* Conveyor stripe background */
.conveyor-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    repeating-linear-gradient(
      45deg,
      var(--conveyor-bg),
      var(--conveyor-bg) 20px,
      hsl(0deg 0% 18% / 100%) 20px,
      hsl(0deg 0% 18% / 100%) 40px
    );
  opacity: 0.3;
}

/* Gear layers */
.gear-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
}

.gear {
  position: absolute;
  will-change: transform;
  opacity: 0.15;
}

/* Layer 1 gears (background, slower) */
.gear-layer-1 .gear-1 {
  width: 200px;
  height: 200px;
  top: 15%;
  left: 10%;
  animation: rotate-clockwise 30s linear infinite;
}

.gear-layer-1 .gear-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation: rotate-counter-clockwise 25s linear infinite;
}

/* Layer 2 gears (foreground, faster) */
.gear-layer-2 .gear-3 {
  width: 120px;
  height: 120px;
  top: 40%;
  right: 10%;
  animation: rotate-clockwise 20s linear infinite;
}

/* Rotation animations */
@keyframes rotate-clockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-counter-clockwise {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}

/* Paused state for reduced motion */
.gear--paused {
  animation-play-state: paused !important;
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .gear {
    animation: none !important;
  }
  
  .conveyor-layer {
    background: var(--conveyor-bg);
  }
}

/* Responsive adjustments */
@media only screen and (max-width: 1000px) {
  .gear-layer-1 .gear-1 {
    width: 120px;
    height: 120px;
  }
  
  .gear-layer-1 .gear-2 {
    width: 100px;
    height: 100px;
  }
  
  .gear-layer-2 .gear-3 {
    width: 80px;
    height: 80px;
  }
}
</style>
