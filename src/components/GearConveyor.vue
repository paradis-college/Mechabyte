<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useParallaxLayers } from '../hooks/useParallaxLayers';
import { computed, onMounted, onUnmounted, ref } from 'vue';

interface Props {
  className?: string;
  ariaHidden?: boolean;
  enableParallax?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  className: '',
  ariaHidden: true,
  enableParallax: false
});

const { containerRef, registerLayer } = useParallaxLayers(props.enableParallax);

const foregroundGearRef = ref<HTMLElement | null>(null);
const midgroundGearRef = ref<HTMLElement | null>(null);
const backgroundGearRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (props.enableParallax && foregroundGearRef.value && midgroundGearRef.value && backgroundGearRef.value) {
    // Register layers with different speeds for parallax effect
    registerLayer(foregroundGearRef.value, 0.3);
    registerLayer(midgroundGearRef.value, 0.15);
    registerLayer(backgroundGearRef.value, 0.05);
  }
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
  <div 
    ref="containerRef"
    :class="['gear-conveyor', className]"
    :aria-hidden="ariaHidden"
    :data-parallax="enableParallax ? 'true' : undefined"
  >
    <!-- Conveyor belt background -->
    <div class="conveyor-belt"></div>
    
    <!-- Tech circuit lines connecting gears -->
    <svg class="circuit-lines" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Lines connecting gears with Manhattan routing -->
      <!-- Top left to top right -->
      <path d="M 20 15 L 20 12 L 70 12 L 70 10" class="circuit-line circuit-line--1" />
      <!-- Top right to middle left -->
      <path d="M 70 10 L 75 10 L 75 48 L 15 48 L 15 55" class="circuit-line circuit-line--2" />
      <!-- Middle to bottom left -->
      <path d="M 10 50 L 8 50 L 8 82 L 25 82 L 25 85" class="circuit-line circuit-line--3" />
      <!-- Middle right to bottom right -->
      <path d="M 80 55 L 82 55 L 82 88 L 65 88 L 65 90" class="circuit-line circuit-line--4" />
      <!-- Top section cross connection -->
      <path d="M 20 15 L 18 15 L 18 22 L 60 22 L 60 20" class="circuit-line circuit-line--5" />
      <!-- Middle section horizontal -->
      <path d="M 40 60 L 40 65 L 75 65 L 75 80" class="circuit-line circuit-line--6" />
      <!-- Bottom section connection -->
      <path d="M 25 85 L 30 85 L 30 88 L 55 88 L 55 92" class="circuit-line circuit-line--7" />
      <!-- Vertical connector on right -->
      <path d="M 80 55 L 85 55 L 85 35 L 85 35" class="circuit-line circuit-line--8" />
      <!-- Cross connection middle to top -->
      <path d="M 50 48 L 50 35 L 25 35 L 25 25" class="circuit-line circuit-line--9" />
      <!-- Diagonal-style Manhattan route -->
      <path d="M 15 18 L 10 18 L 10 45 L 40 45 L 40 60" class="circuit-line circuit-line--10" />
    </svg>
    
    <!-- Background layer - large faint gears distributed throughout the page -->
    <div ref="backgroundGearRef" class="gear-layer gear-layer--background">
      <!-- Top section -->
      <svg class="gear gear--large gear--slow" style="left: 20%; top: 15%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.3"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.4"/>
      </svg>
      <svg class="gear gear--large gear--reverse" style="left: 70%; top: 10%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.3"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.4"/>
      </svg>
      <!-- Middle section -->
      <svg class="gear gear--large gear--slow" style="left: 10%; top: 50%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.25"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.35"/>
      </svg>
      <svg class="gear gear--large gear--reverse" style="left: 80%; top: 55%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.25"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.35"/>
      </svg>
      <!-- Bottom section -->
      <svg class="gear gear--large gear--slow" style="left: 25%; top: 85%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.3"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.4"/>
      </svg>
      <svg class="gear gear--large gear--reverse" style="left: 65%; top: 90%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.3"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.4"/>
      </svg>
    </div>
    
    <!-- Midground layer - medium gears -->
    <div ref="midgroundGearRef" class="gear-layer gear-layer--midground">
      <!-- Top and middle -->
      <svg class="gear gear--medium" style="left: 25%; top: 25%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.5"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.6"/>
      </svg>
      <svg class="gear gear--medium gear--reverse" style="left: 60%; top: 20%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.5"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.6"/>
      </svg>
      <svg class="gear gear--medium" style="left: 40%; top: 60%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.45"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.55"/>
      </svg>
      <!-- Bottom section -->
      <svg class="gear gear--medium gear--reverse" style="left: 15%; top: 75%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.5"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.6"/>
      </svg>
      <svg class="gear gear--medium" style="left: 75%; top: 80%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.5"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.6"/>
      </svg>
    </div>
    
    <!-- Foreground layer - small gears -->
    <div ref="foregroundGearRef" class="gear-layer gear-layer--foreground">
      <!-- Top -->
      <svg class="gear gear--small gear--fast" style="left: 15%; top: 18%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.7"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.8"/>
      </svg>
      <svg class="gear gear--small" style="left: 85%; top: 35%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.7"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.8"/>
      </svg>
      <!-- Middle -->
      <svg class="gear gear--small gear--fast" style="left: 50%; top: 48%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.65"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.75"/>
      </svg>
      <svg class="gear gear--small" style="left: 8%; top: 55%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.7"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.8"/>
      </svg>
      <!-- Bottom -->
      <svg class="gear gear--small gear--fast" style="left: 30%; top: 72%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.7"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.8"/>
      </svg>
      <svg class="gear gear--small" style="left: 82%; top: 68%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.7"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.8"/>
      </svg>
      <svg class="gear gear--small gear--fast" style="left: 55%; top: 92%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.7"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.8"/>
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
.gear-conveyor {
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

.conveyor-belt {
/* Circuit connection traces */
.circuit-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    var(--conveyor-bg) 0px,
    var(--conveyor-bg) 20px,
    transparent 20px,
    transparent 40px
  );
  opacity: 0.15;
  animation: conveyor-scroll 30s linear infinite;
  will-change: transform;
}

/* Circuit board connection lines */
.circuit-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.circuit-line {
  fill: none;
  stroke: var(--gear-accent);
  stroke-width: 0.08;
  stroke-linecap: square;
  opacity: 0.3;
  vector-effect: non-scaling-stroke;
}

/* Animated dash effect for circuit lines */
.circuit-line--1 {
  stroke-dasharray: 2, 3;
  animation: dash-flow 8s linear infinite;
  animation-delay: 0s;
}

.circuit-line--2 {
  stroke-dasharray: 3, 2;
  animation: dash-flow 10s linear infinite;
  animation-delay: -2s;
}

.circuit-line--3 {
  stroke-dasharray: 2, 4;
  animation: dash-flow 12s linear infinite;
  animation-delay: -4s;
}

.circuit-line--4 {
  stroke-dasharray: 3, 3;
  animation: dash-flow 9s linear infinite;
  animation-delay: -1s;
}

.circuit-line--5 {
  stroke-dasharray: 2, 2;
  animation: dash-flow 11s linear infinite;
  animation-delay: -3s;
}

.circuit-line--6 {
  stroke-dasharray: 4, 2;
  animation: dash-flow 13s linear infinite;
  animation-delay: -5s;
}

.circuit-line--7 {
  stroke-dasharray: 2, 3;
  animation: dash-flow 10s linear infinite;
  animation-delay: -6s;
}

.circuit-line--8 {
  stroke-dasharray: 3, 4;
  animation: dash-flow 14s linear infinite;
  animation-delay: -2.5s;
}

.circuit-line--9 {
  stroke-dasharray: 2, 2;
  animation: dash-flow 11s linear infinite;
  animation-delay: -4.5s;
}

.circuit-line--10 {
  stroke-dasharray: 3, 2;
  animation: dash-flow 15s linear infinite;
  animation-delay: -7s;
}

.gear-layer {
  position: absolute;
  top: 0;
  left: 0;
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
  transform-origin: center center;
  transform: translateZ(0);
}

/* Gear sizes */
.gear--small {
  width: 60px;
  height: 60px;
}

.gear--medium {
  width: 100px;
  height: 100px;
}

.gear--large {
  width: 150px;
  height: 150px;
}

/* Gear animations - different speeds for depth */
.gear--fast {
  animation: rotate-gear 15s linear infinite;
}

.gear--medium {
  animation: rotate-gear 25s linear infinite;
}

.gear--slow {
  animation: rotate-gear 40s linear infinite;
}

.gear--reverse {
  animation: rotate-gear-reverse 30s linear infinite;
}

/* Layer positioning */
.gear-layer--foreground {
  z-index: 3;
}

.gear-layer--midground {
  z-index: 2;
}

.gear-layer--background {
  z-index: 1;
}

/* Default gear positions */
.gear-layer--background .gear--large:first-child {
  left: 20%;
  top: 15%;
}

/* Keyframe animations */
@keyframes rotate-gear {
  from {
    transform: rotate(0deg) translateZ(0);
  }
  to {
    transform: rotate(360deg) translateZ(0);
  }
}

@keyframes rotate-gear-reverse {
  from {
    transform: rotate(360deg) translateZ(0);
  }
  to {
    transform: rotate(0deg) translateZ(0);
  }
}

@keyframes conveyor-scroll {
  from {
    transform: translateX(0) translateZ(0);
  }
  to {
    transform: translateX(40px) translateZ(0);
  }
}

@keyframes dash-flow {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 50;
  }
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
  .gear,
  .conveyor-belt,
  .circuit-line {
    animation-play-state: paused !important;
    animation: none !important;
  }
  
  .gear-layer {
    will-change: auto;
  .gear {
    animation: none !important;
  }
  
  .circuit-connections {
    display: none;
  }
}

/* Responsive adjustments */
@media only screen and (max-width: 1000px) {
  .gear--small {
    width: 40px;
    height: 40px;
  }

  .gear--medium {
    width: 70px;
    height: 70px;
  }

  .gear--large {
  .gear-layer-1 .gear-1 {
    width: 120px;
    height: 120px;
  }
  
  .gear-layer-1 .gear-2 {
    width: 100px;
    height: 100px;
  }
  
  .circuit-line {
    stroke-width: 0.12;
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
