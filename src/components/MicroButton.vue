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

interface Props {
  variant?: 'primary' | 'secondary' | 'robotic';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'robotic',
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => [
  'micro-button',
  `micro-button--${props.variant}`,
  { 'micro-button--disabled': props.disabled },
]);

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
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :type="!href ? type : undefined"
    :class="buttonClasses"
    :disabled="!href ? disabled : undefined"
    :aria-disabled="href && disabled ? true : undefined"
    @click="handleClick"
  >
    <span class="button-content">
      <slot />
      <svg 
        class="button-cog" 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
        <circle cx="8" cy="2" r="1" fill="currentColor" />
        <circle cx="8" cy="14" r="1" fill="currentColor" />
        <circle cx="2" cy="8" r="1" fill="currentColor" />
        <circle cx="14" cy="8" r="1" fill="currentColor" />
        <circle cx="4" cy="4" r="0.8" fill="currentColor" />
        <circle cx="12" cy="4" r="0.8" fill="currentColor" />
        <circle cx="4" cy="12" r="0.8" fill="currentColor" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      </svg>
    </span>
  </component>
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
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-family: 'Orbitron', 'Ubuntu', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid var(--mechabyte-green);
  background: linear-gradient(135deg, transparent 0%, rgba(0, 255, 0, 0.1) 50%, transparent 100%);
  color: var(--mechabyte-green);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

/* Metallic sheen effect */
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
  background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.3), transparent);
  transition: left 0.5s ease;
}

.micro-button:hover::before {
  left: 100%;
}

/* Hover state */
.micro-button:hover {
  background: linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 0, 0.2) 50%, rgba(0, 255, 0, 0.1) 100%);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
  transform: translateY(-2px);
}

/* Cog rotation on hover */
.button-cog {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.micro-button:hover .button-cog {
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
.micro-button:active {
  transform: scale(0.98) translateY(-2px);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

/* Focus-visible for keyboard navigation */
.micro-button:focus-visible {
  outline: 3px solid var(--mechabyte-green);
  outline-offset: 4px;
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
  pointer-events: none;
}

/* Variant: Primary */
.micro-button--primary {
  background: var(--mechabyte-green);
  color: var(--background-grey);
  border-color: var(--mechabyte-green);
}

.micro-button--primary:hover {
  background: var(--mechabyte-green);
  filter: brightness(1.2);
}

/* Variant: Secondary */
.micro-button--secondary {
  background: transparent;
  color: var(--light-grey);
  border-color: var(--light-grey);
}

.micro-button--secondary:hover {
  color: var(--mechabyte-green);
  border-color: var(--mechabyte-green);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .micro-button,
  .button-cog,
  .micro-button::before {
    transition: none !important;
    animation: none !important;
  }
  
  .micro-button:hover {
    transform: none;
  }
  
  .micro-button:active {
    transform: none;
  }
  
  .micro-button:hover .button-cog {
    transform: none;
  }
}
</style>
