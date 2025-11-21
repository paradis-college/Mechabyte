import { ref, onMounted, onUnmounted, type Ref } from 'vue';

interface ParallaxLayer {
  element: HTMLElement;
  speed: number;
}

interface UseParallaxLayersReturn {
  containerRef: Ref<HTMLElement | null>;
  registerLayer: (element: HTMLElement, speed: number) => void;
}

/**
 * Custom hook for parallax scrolling effect on multiple layers
 * Respects prefers-reduced-motion and guards against SSR
 */
export function useParallaxLayers(enabled: boolean = false): UseParallaxLayersReturn {
  const containerRef = ref<HTMLElement | null>(null);
  const layers = ref<ParallaxLayer[]>([]);
  let rafId: number | null = null;
  let prefersReducedMotion = false;

  const registerLayer = (element: HTMLElement, speed: number) => {
    if (!enabled) return;
    layers.value.push({ element, speed });
  };

  const handleScroll = () => {
    if (!enabled || prefersReducedMotion || rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      
      layers.value.forEach(({ element, speed }) => {
        const translateY = scrollY * speed;
        element.style.transform = `translateY(${translateY}px) translateZ(0)`;
      });

      rafId = null;
    });
  };

  onMounted(() => {
    // Guard against SSR
    if (typeof window === 'undefined') return;

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = mediaQuery.matches;

    if (!enabled || prefersReducedMotion) return;

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Listen for changes to motion preference
    mediaQuery.addEventListener('change', (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
  });

  onUnmounted(() => {
    if (typeof window === 'undefined') return;
    
    window.removeEventListener('scroll', handleScroll);
    
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
  });

  return {
    containerRef,
    registerLayer
  };
}
