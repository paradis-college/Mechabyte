<script setup lang="ts">
import { computed } from 'vue';
import CogIcon from './icons/CogIcon.vue';

// Props interface
interface MicroButtonProps {
  label?: string;
  disabled?: boolean;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary';
}

// Props with defaults
const props = withDefaults(defineProps<MicroButtonProps>(), {
  label: '',
  disabled: false,
  ariaLabel: '',
  variant: 'primary'
});

// Emits
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// Computed aria-label: use provided ariaLabel or fall back to label
const computedAriaLabel = computed(() => props.ariaLabel || props.label || 'Button');

// Handle click event
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    type="button"
    class="micro-button"
    :class="{ 'micro-button--disabled': disabled, [`micro-button--${variant}`]: true }"
    :disabled="disabled"
    :aria-label="computedAriaLabel"
    @click="handleClick"
  >
    <span class="micro-button__icon">
      <CogIcon />
    </span>
    <span v-if="label" class="micro-button__label">{{ label }}</span>
  </button>
</template>

<style scoped>
.micro-button {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border: 0.15vw solid var(--mechabyte-green);
  border-radius: 0.3vw;
  background: var(--dark-grey);
  color: var(--light-grey);
  font-size: clamp(10px, 0.9rem, 14px);
  font-weight: 600;
  font-family: 'Ubuntu', sans-serif;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  min-height: 2rem;
}

/* Metallic sheen overlay */
.micro-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  transition: left 0.5s ease;
}

/* Hover effects */
.micro-button:hover:not(:disabled) {
  background: var(--mechabyte-grey);
  border-color: var(--mechabyte-green);
  color: var(--mechabyte-green);
  transform: translateY(-1px);
  box-shadow: 0 0.2vw 0.4vw rgba(0, 255, 0, 0.2);
}

.micro-button:hover:not(:disabled)::before {
  left: 100%;
}

/* Icon rotation on hover */
.micro-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  transition: transform 0.6s ease;
}

.micro-button:hover:not(:disabled) .micro-button__icon {
  transform: rotate(180deg);
}

/* Active/pressed state */
.micro-button:active:not(:disabled) {
  background: var(--mechabyte-green);
  color: var(--background-grey);
  transform: translateY(0);
}

/* Focus visible (for keyboard navigation) */
.micro-button:focus-visible {
  outline: 0.2vw solid var(--mechabyte-green);
  outline-offset: 0.2vw;
}

/* Disabled state */
.micro-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Variant styles */
.micro-button--primary {
  border-color: var(--mechabyte-green);
}

.micro-button--secondary {
  border-color: var(--light-grey);
}

.micro-button--secondary:hover:not(:disabled) {
  border-color: var(--mechabyte-green);
}

/* Label */
.micro-button__label {
  line-height: 1;
  white-space: nowrap;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .micro-button,
  .micro-button::before,
  .micro-button__icon {
    transition: none;
  }
  
  .micro-button:hover:not(:disabled) .micro-button__icon {
    transform: none;
  }
  
  .micro-button:hover:not(:disabled) {
    transform: none;
  }
}

/* Responsive adjustments for mobile */
@media only screen and (max-width: 1000px) {
  .micro-button {
    padding: 8px 12px;
    font-size: 12px;
    min-height: 32px;
    border-radius: 4px;
  }
  
  .micro-button:focus-visible {
    outline-width: 2px;
    outline-offset: 2px;
  }
}
</style>
