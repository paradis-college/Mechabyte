import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Options for customizing the reveal behavior
 */
export interface RevealOptions {
  /** Threshold for intersection (0-1). Default: 0.1 */
  threshold?: number;
  /** Root margin for intersection observer. Default: '0px 0px -50px 0px' */
  rootMargin?: string;
  /** Callback when element becomes visible */
  onVisible?: () => void;
}

/**
 * A composable that toggles a CSS class ('is-visible') on an element
 * when it enters the viewport using IntersectionObserver.
 * 
 * Features:
 * - SSR-safe (guards against window/document access during server render)
 * - Respects prefers-reduced-motion (marks visible immediately if reduced motion is enabled)
 * - Customizable threshold and root margin
 * - Optional callback when visible
 * - Returns both elementRef and isVisible reactive state
 * 
 * @param options - Configuration options for the reveal behavior
 * @returns An object with elementRef (to attach to element) and isVisible (reactive state)
 * 
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useRevealOnScroll } from '@/composables/useRevealOnScroll';
 * 
 * const { elementRef, isVisible } = useRevealOnScroll({
 *   threshold: 0.2,
 *   onVisible: () => console.log('Element is visible!')
 * });
 * </script>
 * 
 * <template>
 *   <div ref="elementRef" :class="['reveal', { 'is-visible': isVisible }]">
 *     Content
 *   </div>
 * </template>
 * ```
 */
export function useRevealOnScroll(options: RevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    onVisible
  } = options;

  const elementRef: Ref<HTMLElement | null> = ref(null);
  const isVisible = ref(false);
  let observer: IntersectionObserver | null = null;

  const checkReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  onMounted(() => {
    // Guard for SSR
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      isVisible.value = true;
      onVisible?.();
      return;
    }

    // If reduced motion is preferred, immediately show the element
    if (checkReducedMotion()) {
      isVisible.value = true;
      onVisible?.();
      return;
    }

    const element = elementRef.value;
    if (!element) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
            onVisible?.();
            // Once visible, stop observing
            if (observer) {
              observer.disconnect();
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    elementRef,
    isVisible,
  };
}
