import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Options for customizing the reveal behavior
 */
export interface RevealOptions {
  /** Threshold for intersection (0-1). Default: 0.15 */
  threshold?: number;
  /** Root margin for intersection observer. Default: '0px 0px -10% 0px' */
  rootMargin?: string;
  /** Callback when element becomes visible */
  onVisible?: () => void;
}

/**
 * Composable that adds reveal-on-scroll functionality to an element.
 * Uses IntersectionObserver to add 'is-visible' class when element enters viewport.
 * 
 * Features:
 * - SSR-safe (guards against window/document access during server render)
 * - Respects prefers-reduced-motion (marks visible immediately if reduced motion is enabled)
 * - Customizable threshold and root margin
 * - Optional callback when visible
 * 
 * @param options - Configuration options for the reveal behavior
 * @returns A ref to attach to the target element
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useRevealOnScroll } from '@/composables/useRevealOnScroll';
 * 
 * const elementRef = useRevealOnScroll({
 *   threshold: 0.2,
 *   onVisible: () => console.log('Element is visible!')
 * });
 * </script>
 * 
 * <template>
 *   <div ref="elementRef" class="reveal">Content</div>
 * </template>
 * ```
 */
export function useRevealOnScroll(options: RevealOptions = {}): Ref<HTMLElement | null> {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -10% 0px',
    onVisible
  } = options;

  const elementRef = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    // SSR guard: ensure window and IntersectionObserver are available
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const element = elementRef.value;
    if (!element) {
      return;
    }

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // If user prefers reduced motion, mark as visible immediately
      element.classList.add('is-visible');
      onVisible?.();
      return;
    }

    // Create IntersectionObserver
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is now visible
            entry.target.classList.add('is-visible');
            onVisible?.();
            
            // Unobserve after becoming visible (one-time reveal)
            observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    // Start observing
    observer.observe(element);
  });

  onUnmounted(() => {
    // Cleanup observer
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  return elementRef;
}
