<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useParallaxLayers } from '../hooks/useParallaxLayers';

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
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.08"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.1"/>
      </svg>
      <svg class="gear gear--large gear--reverse" style="left: 70%; top: 10%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.08"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.1"/>
      </svg>
      <!-- Middle section -->
      <svg class="gear gear--large gear--slow" style="left: 10%; top: 50%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.06"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.08"/>
      </svg>
      <svg class="gear gear--large gear--reverse" style="left: 80%; top: 55%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.06"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.08"/>
      </svg>
      <!-- Bottom section -->
      <svg class="gear gear--large gear--slow" style="left: 25%; top: 85%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.08"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.1"/>
      </svg>
      <svg class="gear gear--large gear--reverse" style="left: 65%; top: 90%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="var(--robot-metal)" opacity="0.08"/>
        <path d="M50 10 L55 20 L50 30 L45 20 Z M90 50 L80 55 L70 50 L80 45 Z M50 90 L45 80 L50 70 L55 80 Z M10 50 L20 45 L30 50 L20 55 Z M73 27 L68 35 L60 32 L65 24 Z M73 73 L65 76 L60 68 L68 65 Z M27 73 L32 68 L40 73 L35 76 Z M27 27 L35 24 L40 32 L32 35 Z" fill="var(--gear-accent)" opacity="0.1"/>
      </svg>
    </div>
    
    <!-- Midground layer - medium gears -->
    <div ref="midgroundGearRef" class="gear-layer gear-layer--midground">
      <!-- Top and middle -->
      <svg class="gear gear--medium" style="left: 25%; top: 25%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.12"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.14"/>
      </svg>
      <svg class="gear gear--medium gear--reverse" style="left: 60%; top: 20%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.12"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.14"/>
      </svg>
      <svg class="gear gear--medium" style="left: 40%; top: 60%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.1"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.12"/>
      </svg>
      <!-- Bottom section -->
      <svg class="gear gear--medium gear--reverse" style="left: 15%; top: 75%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.12"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.14"/>
      </svg>
      <svg class="gear gear--medium" style="left: 75%; top: 80%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" fill="var(--robot-metal)" opacity="0.12"/>
        <path d="M50 15 L54 23 L50 31 L46 23 Z M85 50 L77 54 L69 50 L77 46 Z M50 85 L46 77 L50 69 L54 77 Z M15 50 L23 46 L31 50 L23 54 Z M70 30 L66 37 L59 34 L63 27 Z M70 70 L63 73 L59 66 L66 63 Z M30 70 L34 66 L41 70 L37 73 Z M30 30 L37 27 L41 34 L34 37 Z" fill="var(--gear-accent)" opacity="0.14"/>
      </svg>
    </div>
    
    <!-- Foreground layer - small gears -->
    <div ref="foregroundGearRef" class="gear-layer gear-layer--foreground">
      <!-- Top -->
      <svg class="gear gear--small gear--fast" style="left: 15%; top: 18%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.15"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.18"/>
      </svg>
      <svg class="gear gear--small" style="left: 85%; top: 35%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.15"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.18"/>
      </svg>
      <!-- Middle -->
      <svg class="gear gear--small gear--fast" style="left: 50%; top: 48%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.14"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.16"/>
      </svg>
      <svg class="gear gear--small" style="left: 8%; top: 55%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.15"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.18"/>
      </svg>
      <!-- Bottom -->
      <svg class="gear gear--small gear--fast" style="left: 30%; top: 72%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.15"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.18"/>
      </svg>
      <svg class="gear gear--small" style="left: 82%; top: 68%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.15"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.18"/>
      </svg>
      <svg class="gear gear--small gear--fast" style="left: 55%; top: 92%;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="25" fill="var(--robot-metal)" opacity="0.15"/>
        <path d="M50 20 L53 27 L50 34 L47 27 Z M80 50 L73 53 L66 50 L73 47 Z M50 80 L47 73 L50 66 L53 73 Z M20 50 L27 47 L34 50 L27 53 Z M67 33 L64 39 L58 36 L61 30 Z M67 67 L61 70 L58 64 L64 61 Z M33 67 L36 64 L42 67 L39 70 Z M33 33 L39 30 L42 36 L36 39 Z" fill="var(--gear-accent)" opacity="0.18"/>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.gear-conveyor {
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    var(--conveyor-bg) 0px,
    var(--conveyor-bg) 40px,
    rgba(255, 255, 255, 0.01) 40px,
    rgba(255, 255, 255, 0.01) 45px
  );
  opacity: 0.05;
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
  opacity: 0.08;
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
    width: 100px;
    height: 100px;
  }
  
  .circuit-line {
    stroke-width: 0.12;
  }
}
</style>
