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

const segment1Ref = ref<SVGGElement | null>(null);
const segment2Ref = ref<SVGGElement | null>(null);
const segment3Ref = ref<SVGGElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const prefersReducedMotion = ref(false);
let animationFrameId: number | null = null;

// Triple pendulum state variables
// Angles are measured from vertical (downward = 0)
let theta1 = 0; // First segment angle
let theta2 = 0; // Second segment angle
let theta3 = 0; // Third segment angle
let omega1 = 0; // First segment angular velocity
let omega2 = 0; // Second segment angular velocity
let omega3 = 0; // Third segment angular velocity

// Physical constants
const g = 9.81; // Gravity (pixels/s²)
const m1 = 1.0; // Mass of first segment
const m2 = 1.0; // Mass of second segment
const m3 = 1.0; // Mass of third segment
const L1 = 60;  // Length of first segment
const L2 = 50;  // Length of second segment
const L3 = 40;  // Length of third segment

// Check for reduced motion preference
const checkReducedMotion = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Initialize with random angles for chaotic motion
const initializeRandom = () => {
  // Random initial angles between -π and π
  theta1 = (Math.random() - 0.5) * Math.PI;
  theta2 = (Math.random() - 0.5) * Math.PI;
  theta3 = (Math.random() - 0.5) * Math.PI;
  // Small initial angular velocities
  omega1 = (Math.random() - 0.5) * 0.5;
  omega2 = (Math.random() - 0.5) * 0.5;
  omega3 = (Math.random() - 0.5) * 0.5;
};

// Triple pendulum equations of motion (derivatives)
const derivatives = (t1: number, t2: number, t3: number, o1: number, o2: number, o3: number) => {
  // Simplified triple pendulum dynamics
  // These are the derivatives for RK4 integration
  
  const delta12 = t2 - t1;
  const delta23 = t3 - t2;
  const delta13 = t3 - t1;
  
  // Denominators for the equations
  const den1 = (m1 + m2 + m3) * L1 - m2 * L1 * Math.cos(delta12) * Math.cos(delta12) - m3 * L1 * Math.cos(delta13) * Math.cos(delta13);
  const den2 = (m2 + m3) * L2 - m3 * L2 * Math.cos(delta23) * Math.cos(delta23);
  const den3 = m3 * L3;
  
  // Simplified acceleration terms (Lagrangian mechanics)
  const num1 = -g * (2 * m1 + m2 + m3) * Math.sin(t1) 
               - m2 * g * Math.sin(t1 - 2 * t2)
               - m3 * g * Math.sin(t1 - 2 * t3)
               - 2 * Math.sin(delta12) * m2 * (o2 * o2 * L2 + o1 * o1 * L1 * Math.cos(delta12))
               - 2 * Math.sin(delta13) * m3 * (o3 * o3 * L3 + o1 * o1 * L1 * Math.cos(delta13));
  
  const num2 = 2 * Math.sin(delta12) * (o1 * o1 * L1 * (m2 + m3) + g * (m2 + m3) * Math.cos(t1) + o2 * o2 * L2 * m2 * Math.cos(delta12))
               - m3 * g * Math.cos(t2) * Math.sin(delta23)
               - m3 * o3 * o3 * L3 * Math.sin(delta23);
  
  const num3 = 2 * Math.sin(delta13) * (o1 * o1 * L1 * m3 + g * m3 * Math.cos(t1))
               + 2 * Math.sin(delta23) * (o2 * o2 * L2 * m3 + g * m3 * Math.cos(t2));
  
  // Angular accelerations
  const alpha1 = num1 / den1;
  const alpha2 = num2 / den2;
  const alpha3 = num3 / den3;
  
  return {
    dTheta1: o1,
    dTheta2: o2,
    dTheta3: o3,
    dOmega1: alpha1,
    dOmega2: alpha2,
    dOmega3: alpha3
  };
};

// RK4 integration step
const rk4Step = (dt: number) => {
  // k1
  const k1 = derivatives(theta1, theta2, theta3, omega1, omega2, omega3);
  
  // k2
  const k2 = derivatives(
    theta1 + 0.5 * dt * k1.dTheta1,
    theta2 + 0.5 * dt * k1.dTheta2,
    theta3 + 0.5 * dt * k1.dTheta3,
    omega1 + 0.5 * dt * k1.dOmega1,
    omega2 + 0.5 * dt * k1.dOmega2,
    omega3 + 0.5 * dt * k1.dOmega3
  );
  
  // k3
  const k3 = derivatives(
    theta1 + 0.5 * dt * k2.dTheta1,
    theta2 + 0.5 * dt * k2.dTheta2,
    theta3 + 0.5 * dt * k2.dTheta3,
    omega1 + 0.5 * dt * k2.dOmega1,
    omega2 + 0.5 * dt * k2.dOmega2,
    omega3 + 0.5 * dt * k2.dOmega3
  );
  
  // k4
  const k4 = derivatives(
    theta1 + dt * k3.dTheta1,
    theta2 + dt * k3.dTheta2,
    theta3 + dt * k3.dTheta3,
    omega1 + dt * k3.dOmega1,
    omega2 + dt * k3.dOmega2,
    omega3 + dt * k3.dOmega3
  );
  
  // Update state
  theta1 += (dt / 6) * (k1.dTheta1 + 2 * k2.dTheta1 + 2 * k3.dTheta1 + k4.dTheta1);
  theta2 += (dt / 6) * (k1.dTheta2 + 2 * k2.dTheta2 + 2 * k3.dTheta2 + k4.dTheta2);
  theta3 += (dt / 6) * (k1.dTheta3 + 2 * k2.dTheta3 + 2 * k3.dTheta3 + k4.dTheta3);
  omega1 += (dt / 6) * (k1.dOmega1 + 2 * k2.dOmega1 + 2 * k3.dOmega1 + k4.dOmega1);
  omega2 += (dt / 6) * (k1.dOmega2 + 2 * k2.dOmega2 + 2 * k3.dOmega2 + k4.dOmega2);
  omega3 += (dt / 6) * (k1.dOmega3 + 2 * k2.dOmega3 + 2 * k3.dOmega3 + k4.dOmega3);
};

// Animation loop
let lastTime = 0;
const updateAnimation = (timestamp: number) => {
  if (prefersReducedMotion.value) return;
  
  // Calculate delta time in seconds
  if (lastTime === 0) lastTime = timestamp;
  const dt = Math.min((timestamp - lastTime) / 1000, 0.02); // Cap at 50 FPS for stability
  lastTime = timestamp;
  
  // Update physics with RK4
  rk4Step(dt);
  
  // Apply rotations to SVG elements
  // Convert from physics angles (radians, vertical = 0) to SVG rotation (degrees)
  const seg1 = segment1Ref.value;
  const seg2 = segment2Ref.value;
  const seg3 = segment3Ref.value;
  
  if (seg1) {
    const angle1Deg = (theta1 * 180) / Math.PI;
    seg1.style.transform = `rotate(${angle1Deg}deg)`;
  }
  
  if (seg2) {
    const angle2Deg = (theta2 * 180) / Math.PI;
    seg2.style.transform = `rotate(${angle2Deg}deg)`;
  }
  
  if (seg3) {
    const angle3Deg = (theta3 * 180) / Math.PI;
    seg3.style.transform = `rotate(${angle3Deg}deg)`;
  }
  
  animationFrameId = requestAnimationFrame(updateAnimation);
};

let mediaQuery: MediaQueryList | null = null;
let handleChange: ((e: MediaQueryListEvent) => void) | null = null;

onMounted(() => {
  prefersReducedMotion.value = checkReducedMotion();
  
  if (!prefersReducedMotion.value) {
    // Initialize with random angles
    initializeRandom();
    
    // Start animation
    animationFrameId = requestAnimationFrame(updateAnimation);
  }
  
  // Listen for reduced motion preference changes
  mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  handleChange = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches;
    if (e.matches && animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    } else if (!e.matches) {
      initializeRandom();
      lastTime = 0;
      animationFrameId = requestAnimationFrame(updateAnimation);
    }
  };
  
  mediaQuery.addEventListener('change', handleChange);
});

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
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
      
      <!-- First segment (rotates from shoulder) -->
      <g 
        ref="segment1Ref"
        class="robot-segment-1"
        style="transform-origin: 100px 150px;"
      >
        <!-- First arm segment -->
        <rect 
          x="95" 
          y="90" 
          width="10" 
          height="60" 
          rx="2"
          class="robot-segment"
        />
        
        <!-- First joint -->
        <circle 
          cx="100" 
          cy="90" 
          r="8" 
          class="robot-joint"
        />
        
        <!-- Second segment (rotates from first joint) -->
        <g
          ref="segment2Ref"
          class="robot-segment-2"
          style="transform-origin: 100px 90px;"
        >
          <!-- Second arm segment -->
          <rect 
            x="95" 
            y="40" 
            width="10" 
            height="50" 
            rx="2"
            class="robot-segment robot-segment-mid"
          />
          
          <!-- Second joint -->
          <circle 
            cx="100" 
            cy="40" 
            r="7" 
            class="robot-joint"
          />
          
          <!-- Third segment (rotates from second joint) -->
          <g
            ref="segment3Ref"
            class="robot-segment-3"
            style="transform-origin: 100px 40px;"
          >
            <!-- Third arm segment -->
            <rect 
              x="95" 
              y="0" 
              width="10" 
              height="40" 
              rx="2"
              class="robot-segment robot-forearm"
            />
            
            <!-- Hand/gripper -->
            <g class="robot-gripper" style="transform-origin: 100px 0px;">
              <rect x="92" y="-5" width="4" height="10" rx="1" class="robot-finger" />
              <rect x="104" y="-5" width="4" height="10" rx="1" class="robot-finger" />
              <circle cx="100" cy="0" r="5" class="robot-joint-small" />
            </g>
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
