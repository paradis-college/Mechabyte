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

// Circuit connections state
interface Connection {
  id: number;
  path: string;
  dashOffset: number;
  duration: number;
}

const connections = ref<Connection[]>([]);
let connectionId = 0;
let connectionIntervalId: number | null = null;

// Gear center positions (in percentage of viewport)
const gearPositions = [
  { x: 10, y: 15, size: 200 },   // gear-1
  { x: 85, y: 60, size: 150 },   // gear-2
  { x: 5, y: 70, size: 180 },    // gear-4
  { x: 90, y: 40, size: 120 },   // gear-3
  { x: 80, y: 10, size: 140 },   // gear-5
  { x: 15, y: 45, size: 100 },   // gear-6
];

// Generate Manhattan-style path between two points
const generateManhattanPath = (from: typeof gearPositions[0], to: typeof gearPositions[0]): string => {
  const startX = from.x + (from.size / 20); // center of gear in vw
  const startY = from.y + (from.size / 20);
  const endX = to.x + (to.size / 20);
  const endY = to.y + (to.size / 20);
  
  const segments: string[] = [`M ${startX} ${startY}`];
  
  const dx = endX - startX;
  const dy = endY - startY;
  
  // Random choice of path style
  const pathStyle = Math.random();
  
  if (pathStyle < 0.33) {
    // Horizontal first, then vertical
    const midPoint = Math.random() > 0.5 ? 0.5 : (Math.random() * 0.3 + 0.3);
    const midX = startX + dx * midPoint;
    segments.push(`L ${midX} ${startY}`);
    segments.push(`L ${midX} ${endY}`);
    segments.push(`L ${endX} ${endY}`);
  } else if (pathStyle < 0.66) {
    // Vertical first, then horizontal
    const midPoint = Math.random() > 0.5 ? 0.5 : (Math.random() * 0.3 + 0.3);
    const midY = startY + dy * midPoint;
    segments.push(`L ${startX} ${midY}`);
    segments.push(`L ${endX} ${midY}`);
    segments.push(`L ${endX} ${endY}`);
  } else {
    // Stepped path with multiple segments
    const steps = Math.floor(Math.random() * 2) + 2; // 2-3 steps
    for (let i = 1; i <= steps; i++) {
      const t = i / (steps + 1);
      if (i % 2 === 1) {
        const midX = startX + dx * t;
        segments.push(`L ${midX} ${startY + dy * (t - 0.1)}`);
        segments.push(`L ${midX} ${startY + dy * (t + 0.1)}`);
      } else {
        const midY = startY + dy * t;
        segments.push(`L ${startX + dx * (t - 0.1)} ${midY}`);
        segments.push(`L ${startX + dx * (t + 0.1)} ${midY}`);
      }
    }
    segments.push(`L ${endX} ${endY}`);
  }
  
  return segments.join(' ');
};

const createConnection = () => {
  if (prefersReducedMotion.value) return;
  
  // Pick two random different gears
  const fromIndex = Math.floor(Math.random() * gearPositions.length);
  let toIndex = Math.floor(Math.random() * gearPositions.length);
  while (toIndex === fromIndex) {
    toIndex = Math.floor(Math.random() * gearPositions.length);
  }
  
  const path = generateManhattanPath(gearPositions[fromIndex], gearPositions[toIndex]);
  const duration = 2 + Math.random() * 2; // 2-4 seconds
  
  const newConnection: Connection = {
    id: connectionId++,
    path,
    dashOffset: 1000,
    duration
  };
  
  connections.value.push(newConnection);
  
  // Remove connection after animation completes
  setTimeout(() => {
    connections.value = connections.value.filter(c => c.id !== newConnection.id);
  }, duration * 1000 + 500);
};

const startConnectionAnimation = () => {
  if (prefersReducedMotion.value) return;
  
  // Create initial connections
  createConnection();
  
  // Create new connections at random intervals
  const scheduleNext = () => {
    const delay = 1500 + Math.random() * 2500; // 1.5-4 seconds between connections
    connectionIntervalId = window.setTimeout(() => {
      createConnection();
      scheduleNext();
    }, delay);
  };
  
  scheduleNext();
};

const stopConnectionAnimation = () => {
  if (connectionIntervalId !== null) {
    clearTimeout(connectionIntervalId);
    connectionIntervalId = null;
  }
  connections.value = [];
};

let animationFrameId: number | null = null;
let mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null;
let mediaQuery: MediaQueryList | null = null;

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
};

const onScroll = () => {
  if (props.enableParallax && !prefersReducedMotion.value) {
    if (animationFrameId === null) {
      animationFrameId = requestAnimationFrame(() => {
        updateParallax();
        animationFrameId = null;
      });
    }
  }
};

onMounted(() => {
  // Check for prefers-reduced-motion
  if (typeof window !== 'undefined') {
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mediaQuery.matches;
    
    // Listen for changes
    mediaQueryHandler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches;
      
      if (e.matches) {
        stopConnectionAnimation();
      } else {
        startConnectionAnimation();
      }
      
      if (props.enableParallax) {
        if (e.matches) {
          // Motion reduced: remove scroll listener and reset transforms
          window.removeEventListener('scroll', onScroll);
          if (gearLayer1Ref.value) gearLayer1Ref.value.style.transform = '';
          if (gearLayer2Ref.value) gearLayer2Ref.value.style.transform = '';
        } else {
          // Motion allowed: add scroll listener
          window.addEventListener('scroll', onScroll, { passive: true });
        }
      }
    };
    mediaQuery.addEventListener('change', mediaQueryHandler);
    
    // Add scroll listener if parallax is enabled
    if (props.enableParallax && !prefersReducedMotion.value) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    
    // Start connection animation if not reduced motion
    if (!prefersReducedMotion.value) {
      startConnectionAnimation();
    }
  }
});

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  
  if (mediaQuery && mediaQueryHandler) {
    mediaQuery.removeEventListener('change', mediaQueryHandler);
  }
  
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScroll);
  }
  
  stopConnectionAnimation();
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
    <!-- Circuit connection traces -->
    <svg class="circuit-connections" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path 
        v-for="connection in connections" 
        :key="connection.id"
        :d="connection.path"
        stroke="var(--gear-accent)"
        stroke-width="0.15"
        fill="none"
        stroke-dasharray="2 2"
        :stroke-dashoffset="connection.dashOffset"
        class="circuit-trace"
        :style="{
          animation: `trace-draw ${connection.duration}s ease-out forwards`
        }"
      />
    </svg>
    
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
      
      <svg :class="gearClass" class="gear-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="32" fill="var(--robot-metal)" />
        <g fill="var(--gear-accent)">
          <rect x="47" y="12" width="6" height="14" rx="2" />
          <rect x="47" y="74" width="6" height="14" rx="2" />
          <rect x="12" y="47" width="14" height="6" rx="2" />
          <rect x="74" y="47" width="14" height="6" rx="2" />
          <rect x="22" y="22" width="6" height="14" rx="2" transform="rotate(45 25 29)" />
          <rect x="72" y="22" width="6" height="14" rx="2" transform="rotate(-45 75 29)" />
          <rect x="22" y="64" width="6" height="14" rx="2" transform="rotate(-45 25 71)" />
          <rect x="72" y="64" width="6" height="14" rx="2" transform="rotate(45 75 71)" />
        </g>
        <circle cx="50" cy="50" r="13" fill="var(--dark-grey)" />
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
      
      <svg :class="gearClass" class="gear-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="26" fill="var(--robot-metal)" />
        <g fill="var(--gear-accent)">
          <rect x="47" y="20" width="6" height="9" rx="2" />
          <rect x="47" y="71" width="6" height="9" rx="2" />
          <rect x="20" y="47" width="9" height="6" rx="2" />
          <rect x="71" y="47" width="9" height="6" rx="2" />
          <rect x="30" y="30" width="6" height="9" rx="2" transform="rotate(45 33 34.5)" />
          <rect x="64" y="30" width="6" height="9" rx="2" transform="rotate(-45 67 34.5)" />
          <rect x="30" y="61" width="6" height="9" rx="2" transform="rotate(-45 33 65.5)" />
          <rect x="64" y="61" width="6" height="9" rx="2" transform="rotate(45 67 65.5)" />
        </g>
        <circle cx="50" cy="50" r="9" fill="var(--dark-grey)" />
      </svg>
      
      <svg :class="gearClass" class="gear-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="24" fill="var(--robot-metal)" />
        <g fill="var(--gear-accent)">
          <rect x="47" y="22" width="6" height="8" rx="2" />
          <rect x="47" y="70" width="6" height="8" rx="2" />
          <rect x="22" y="47" width="8" height="6" rx="2" />
          <rect x="70" y="47" width="8" height="6" rx="2" />
          <rect x="32" y="32" width="6" height="8" rx="2" transform="rotate(45 35 36)" />
          <rect x="62" y="32" width="6" height="8" rx="2" transform="rotate(-45 65 36)" />
          <rect x="32" y="60" width="6" height="8" rx="2" transform="rotate(-45 35 64)" />
          <rect x="62" y="60" width="6" height="8" rx="2" transform="rotate(45 65 64)" />
        </g>
        <circle cx="50" cy="50" r="8" fill="var(--dark-grey)" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.gear-conveyor-container {
  --robot-metal: hsl(0deg 0% 25% / 100%);
  --gear-accent: hsl(120deg 100% 50% / 30%);
  
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
}

/* Circuit connection traces */
.circuit-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.circuit-trace {
  opacity: 0.6;
}

@keyframes trace-draw {
  from {
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  10% {
    opacity: 0.6;
  }
  90% {
    opacity: 0.6;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 0;
  }
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

.gear-layer-1 .gear-4 {
  width: 180px;
  height: 180px;
  top: 70%;
  left: 5%;
  animation: rotate-clockwise 35s linear infinite;
}

/* Layer 2 gears (foreground, faster) */
.gear-layer-2 .gear-3 {
  width: 120px;
  height: 120px;
  top: 40%;
  right: 10%;
  animation: rotate-clockwise 20s linear infinite;
}

.gear-layer-2 .gear-5 {
  width: 140px;
  height: 140px;
  top: 10%;
  right: 20%;
  animation: rotate-counter-clockwise 22s linear infinite;
}

.gear-layer-2 .gear-6 {
  width: 100px;
  height: 100px;
  top: 45%;
  left: 15%;
  animation: rotate-clockwise 18s linear infinite;
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
  
  .circuit-connections {
    display: none;
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
  
  .gear-layer-1 .gear-4 {
    width: 110px;
    height: 110px;
  }
  
  .gear-layer-2 .gear-3 {
    width: 80px;
    height: 80px;
  }
  
  .gear-layer-2 .gear-5 {
    width: 90px;
    height: 90px;
  }
  
  .gear-layer-2 .gear-6 {
    width: 70px;
    height: 70px;
  }
}
</style>
