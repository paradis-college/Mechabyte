<script setup lang="ts">
import { computed } from 'vue';

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
