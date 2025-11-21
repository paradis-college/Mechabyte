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
  z-index: 0;
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
    var(--conveyor-bg) 20px,
    transparent 20px,
    transparent 40px
  );
  opacity: 0.15;
  animation: conveyor-scroll 30s linear infinite;
  will-change: transform;
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

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .gear,
  .conveyor-belt {
    animation-play-state: paused !important;
    animation: none !important;
  }
  
  .gear-layer {
    will-change: auto;
  }
}

/* Responsive adjustments */
@media only screen and (max-width: 1000px) {
  .gear-conveyor {
    height: 60vh;
  }
  
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
}
</style>
