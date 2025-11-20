import { ref, onMounted, onUnmounted } from 'vue';

/**
 * A minimal composable for parallax layer effects on scroll.
 * Uses requestAnimationFrame for smooth animations and respects prefers-reduced-motion.
 * 
 * @returns Object with refs for layer elements and a computed prefersReducedMotion flag
 */
export function useParallaxLayers() {
  const prefersReducedMotion = ref(false);
  const layers = ref<Array<{ element: HTMLElement | null; speed: number }>>([]);
  let animationFrameId: number | null = null;
  let ticking = false;
  let mediaQuery: MediaQueryList | null = null;
  let mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null;

  const updateParallax = () => {
    if (prefersReducedMotion.value) {
      ticking = false;
      return;
    }

    const scrollY = window.scrollY;

    layers.value.forEach(({ element, speed }) => {
      if (element) {
        element.style.transform = `translateY(${scrollY * speed}px)`;
      }
    });

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      animationFrameId = requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  const onScroll = () => {
    requestTick();
  };

  onMounted(() => {
    // SSR guard - only run in browser
    if (typeof window === 'undefined') return;

    // Check for prefers-reduced-motion
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mediaQuery.matches;

    // Listen for changes to motion preference
    mediaQueryHandler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches;
      
      if (e.matches) {
        // Motion reduced: remove scroll listener and reset transforms
        window.removeEventListener('scroll', onScroll);
        layers.value.forEach(({ element }) => {
          if (element) {
            element.style.transform = '';
          }
        });
      } else {
        // Motion allowed: add scroll listener
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    };

    mediaQuery.addEventListener('change', mediaQueryHandler);

    // Add passive scroll listener for performance
    if (!prefersReducedMotion.value) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  });

  onUnmounted(() => {
    if (mediaQuery && mediaQueryHandler) {
      mediaQuery.removeEventListener('change', mediaQueryHandler);
    }
    
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', onScroll);
    }
    
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  });

  /**
   * Register a layer element with a parallax speed factor
   * @param element - The HTML element to apply parallax to
   * @param speed - The parallax speed multiplier (e.g., 0.3 for 30% of scroll speed)
   */
  const registerLayer = (element: HTMLElement | null, speed: number) => {
    if (element && !layers.value.find(l => l.element === element)) {
      layers.value.push({ element, speed });
    }
  };

  /**
   * Unregister a layer element
   * @param element - The HTML element to remove from parallax
   */
  const unregisterLayer = (element: HTMLElement | null) => {
    layers.value = layers.value.filter(l => l.element !== element);
  };

  return {
    prefersReducedMotion,
    registerLayer,
    unregisterLayer
  };
}
