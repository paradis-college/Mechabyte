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
const forearmRef = ref<SVGGElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const shoulderRotation = ref(0);
const elbowRotation = ref(0);
const prefersReducedMotion = ref(false);
let animationFrameId: number | null = null;
let targetX = 0;
let targetY = 0;
let currentShoulderRotation = 0;
let currentElbowRotation = 0;

// Check for reduced motion preference
const checkReducedMotion = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Improved mouse move handler with better responsiveness
const handleMouseMove = (event: MouseEvent) => {
  if (prefersReducedMotion.value) return;
  
  const container = containerRef.value;
  if (!container) return;
  
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Calculate target position relative to shoulder
  targetX = (event.clientX - centerX) / 2;
  targetY = (event.clientY - centerY) / 2;
};

// Simple inverse kinematics for two-joint arm
const calculateIK = (targetX: number, targetY: number) => {
  const upperArmLength = 60;
  const forearmLength = 40;
  
  // Clamp target to reachable area
  const distance = Math.sqrt(targetX * targetX + targetY * targetY);
  const maxReach = upperArmLength + forearmLength - 10;
  
  if (distance > maxReach) {
    const scale = maxReach / distance;
    targetX *= scale;
    targetY *= scale;
  }
  
  // Calculate angles using law of cosines
  const distSq = targetX * targetX + targetY * targetY;
  const dist = Math.sqrt(distSq);
  
  // Elbow angle
  const cosElbow = (upperArmLength * upperArmLength + forearmLength * forearmLength - distSq) / 
                   (2 * upperArmLength * forearmLength);
  const elbowAngle = Math.acos(Math.max(-1, Math.min(1, cosElbow)));
  
  // Shoulder angle
  const phi = Math.atan2(targetY, targetX);
  const cosTheta = (upperArmLength * upperArmLength + distSq - forearmLength * forearmLength) / 
                   (2 * upperArmLength * dist);
  const theta = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
  const shoulderAngle = phi - theta;
  
  // Convert to degrees and apply bounds
  let shoulderDeg = (shoulderAngle * 180 / Math.PI) - 90;
  let elbowDeg = 180 - (elbowAngle * 180 / Math.PI);
  
  // Bound rotations for natural movement
  shoulderDeg = Math.max(-45, Math.min(45, shoulderDeg));
  elbowDeg = Math.max(-90, Math.min(90, elbowDeg));
  
  return { shoulderDeg, elbowDeg };
};

// Animation loop with smooth interpolation
let idleTime = 0;
const updateAnimation = () => {
  if (prefersReducedMotion.value) return;
  
  idleTime += 0.01;
  
  // Calculate target angles with IK
  const { shoulderDeg, elbowDeg } = calculateIK(targetX, targetY);
  
  // Add subtle idle oscillation
  const idleOffset = Math.sin(idleTime) * 2;
  
  // Smooth interpolation for natural movement
  const smoothing = 0.15;
  currentShoulderRotation += (shoulderDeg + idleOffset - currentShoulderRotation) * smoothing;
  currentElbowRotation += (elbowDeg - currentElbowRotation) * smoothing;
  
  // Apply rotations
  const arm = armRef.value;
  const forearm = forearmRef.value;
  
  if (arm) {
    arm.style.transform = `rotate(${currentShoulderRotation}deg)`;
  }
  
  if (forearm) {
    forearm.style.transform = `rotate(${currentElbowRotation}deg)`;
  }
  
  animationFrameId = requestAnimationFrame(updateAnimation);
};

let mediaQuery: MediaQueryList | null = null;
let handleChange: ((e: MediaQueryListEvent) => void) | null = null;

onMounted(() => {
  prefersReducedMotion.value = checkReducedMotion();
  
  if (!prefersReducedMotion.value) {
    // Start animation
    updateAnimation();
    
    // Add mouse move listener
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
  }
  
  // Listen for reduced motion preference changes
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  handleChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches;
    if (e.matches && animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    } else if (!e.matches) {
      updateAnimation();
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
});

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener('mousemove', handleMouseMove);
  if (mediaQuery && handleChange) {
    mediaQuery.removeEventListener('change', handleChange);
  }
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
      <defs>
        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3a3a3a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#4a4a4a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
      </defs>
      
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
        
        <!-- Forearm group (rotates from elbow) -->
        <g
          ref="forearmRef"
          class="robot-forearm-group"
          style="transform-origin: 100px 90px;"
        >
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
