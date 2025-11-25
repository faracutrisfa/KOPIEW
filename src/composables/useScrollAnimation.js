import { onMounted, onUnmounted, ref } from "vue";

/**
 * Composable for scroll-triggered animations
 * Adds fade-in and slide-up effects when elements enter viewport
 */
export function useScrollAnimation(options = {}) {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;

  const elementRef = ref(null);
  const isVisible = ref(false);

  let observer = null;

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        if (once && observer) {
          observer.unobserve(entry.target);
        }
      } else if (!once) {
        isVisible.value = false;
      }
    });
  };

  onMounted(() => {
    if (!elementRef.value) return;

    observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(elementRef.value);
  });

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value);
      observer.disconnect();
    }
  });

  return {
    elementRef,
    isVisible,
  };
}
