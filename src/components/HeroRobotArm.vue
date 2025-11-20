<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface Props {
  size?: number;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  className: '',
});

const armRef = ref<SVGGElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const rotation = ref(0);
const prefersReducedMotion = ref(false);
let animationFrameId: number | null = null;
let mouseX = 0;
let mouseY = 0;

// Check for reduced motion preference
const checkReducedMotion = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Throttled mouse move handler
const handleMouseMove = (event: MouseEvent) => {
  if (prefersReducedMotion.value) return;
  
  const container = containerRef.value;
  if (!container) return;
  
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  mouseX = event.clientX;
  mouseY = event.clientY;
  
  // Calculate angle to cursor (bounded to small degrees)
  const deltaX = mouseX - centerX;
  const deltaY = mouseY - centerY;
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  
  // Bound rotation to ±15 degrees for subtle effect
  const boundedRotation = Math.max(-15, Math.min(15, angle * 0.2));
  rotation.value = boundedRotation;
};

// Idle animation (subtle reach/return)
let idleTime = 0;
const updateIdleAnimation = () => {
  if (prefersReducedMotion.value) return;
  
  idleTime += 0.01;
  // Subtle sine wave oscillation for idle movement
  const idleRotation = Math.sin(idleTime) * 3; // ±3 degrees
  
  // Blend idle animation with mouse following
  const arm = armRef.value;
  if (arm) {
    const finalRotation = rotation.value + idleRotation;
    arm.style.transform = `rotate(${finalRotation}deg)`;
  }
  
  animationFrameId = requestAnimationFrame(updateIdleAnimation);
};

onMounted(() => {
  prefersReducedMotion.value = checkReducedMotion();
  
  if (!prefersReducedMotion.value) {
    // Start idle animation
    updateIdleAnimation();
    
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
  }
  
  // Listen for reduced motion preference changes
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handleChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches;
    if (e.matches && animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    } else if (!e.matches) {
      updateIdleAnimation();
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    window.removeEventListener('mousemove', handleMouseMove);
    mediaQuery.removeEventListener('change', handleChange);
  });
});

const svgSize = computed(() => props.size);
</script>

<template>
  <div 
    ref="containerRef" 
    :class="['hero-robot-arm-container', className]"
    :style="{ width: `${svgSize}px`, height: `${svgSize}px` }"
  >
    <svg
      :width="svgSize"
      :height="svgSize"
      viewBox="0 0 200 200"
      role="img"
      aria-label="Interactive robot arm illustration"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Mechabyte Robot Arm</title>
      <desc>A mechanical robot arm that follows your cursor and performs a subtle idle animation</desc>
      
      <!-- Base/shoulder -->
      <circle 
        cx="100" 
        cy="150" 
        r="20" 
        class="robot-base"
      />
      
      <!-- Arm group (rotates from shoulder) -->
      <g 
        ref="armRef"
        class="robot-arm"
        style="transform-origin: 100px 150px;"
      >
        <!-- Upper arm -->
        <rect 
          x="95" 
          y="90" 
          width="10" 
          height="60" 
          rx="2"
          class="robot-segment"
        />
        
        <!-- Elbow joint -->
        <circle 
          cx="100" 
          cy="90" 
          r="8" 
          class="robot-joint"
        />
        
        <!-- Forearm -->
        <rect 
          x="95" 
          y="50" 
          width="10" 
          height="40" 
          rx="2"
          class="robot-segment robot-forearm"
        />
        
        <!-- Hand/gripper -->
        <g class="robot-gripper" style="transform-origin: 100px 50px;">
          <rect x="92" y="45" width="4" height="10" rx="1" class="robot-finger" />
          <rect x="104" y="45" width="4" height="10" rx="1" class="robot-finger" />
          <circle cx="100" cy="50" r="5" class="robot-joint-small" />
        </g>
      </g>
      
      <!-- Accent lights -->
      <circle cx="100" cy="150" r="3" class="robot-light" />
      <circle cx="100" cy="90" r="2" class="robot-light" />
    </svg>
  </div>
</template>

<style scoped>
.hero-robot-arm-container {
  display: inline-block;
  position: relative;
}

/* Metallic color scheme */
.robot-base,
.robot-joint {
  fill: url(#metalGradient);
  stroke: var(--robot-accent, var(--mechabyte-green));
  stroke-width: 2;
}

.robot-segment {
  fill: var(--robot-metal, #444);
  stroke: var(--robot-accent, var(--mechabyte-green));
  stroke-width: 1.5;
}

.robot-forearm {
  fill: var(--robot-metal, #555);
}

.robot-joint-small {
  fill: var(--robot-accent, var(--mechabyte-green));
}

.robot-finger {
  fill: var(--robot-metal, #444);
  stroke: var(--robot-accent, var(--mechabyte-green));
  stroke-width: 1;
}

.robot-light {
  fill: var(--robot-accent, var(--mechabyte-green));
  filter: drop-shadow(0 0 3px var(--robot-accent, var(--mechabyte-green)));
}

/* Smooth transitions for mouse following */
.robot-arm {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Disable animations for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .robot-arm {
    transition: none !important;
    transform: none !important;
  }
  
  .robot-light {
    filter: none;
  }
}

/* Add subtle metallic gradient effect */
svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
</style>

<style>
/* Define gradient for metallic effect (global so SVG can reference it) */
svg defs {
  display: none;
}
</style>
