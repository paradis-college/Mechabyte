import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * A composable that toggles a CSS class ('is-visible') on an element
 * when it enters the viewport using IntersectionObserver.
 * 
 * Respects prefers-reduced-motion by immediately marking elements visible
 * if reduced motion is enabled.
 * 
 * @param threshold - Percentage of element that must be visible (0-1)
 * @param rootMargin - Margin around the viewport for triggering visibility
 * @returns A ref that should be attached to the element and a reactive isVisible state
 */
export function useRevealOnScroll(
  threshold: number = 0.1,
  rootMargin: string = '0px 0px -50px 0px'
) {
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
      return;
    }

    // If reduced motion is preferred, immediately show the element
    if (checkReducedMotion()) {
      isVisible.value = true;
      return;
    }

    const element = elementRef.value;
    if (!element) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true;
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
