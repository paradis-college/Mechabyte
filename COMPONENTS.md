# Hero Robot Arm and Micro-interactions Components

This document describes the new visual enhancements added to the Mechabyte website.

## Components

### HeroRobotArm.vue

An interactive SVG robot arm component with mouse-following behavior and idle animations.

**Location:** `src/components/HeroRobotArm.vue`

**Props:**
- `size` (number, default: 200): Size of the component in pixels
- `className` (string, default: ''): Additional CSS classes

**Features:**
- Idle animation: Subtle reach/return movement using sine wave
- Mouse following: Arm tilts toward cursor (bounded to ±15 degrees)
- Accessibility: Proper ARIA labels, title, and description
- Reduced motion: Completely disables animations when `prefers-reduced-motion: reduce` is detected

**Usage:**
```vue
<HeroRobotArm :size="250" class="my-robot" />
```

### MicroButton.vue

A button component with robotic-themed micro-interactions.

**Location:** `src/components/MicroButton.vue`

**Props:**
- `variant` ('primary' | 'secondary' | 'robotic', default: 'robotic'): Button style variant
- `disabled` (boolean, default: false): Disabled state
- `type` ('button' | 'submit' | 'reset', default: 'button'): Button type
- `href` (string, optional): If provided, renders as a link instead of button

**Features:**
- Metallic sheen hover effect (gradient animation)
- Rotating cog icon on hover (180° rotation)
- Press animation (scale down to 0.98)
- Focus-visible styles for keyboard navigation
- Reduced motion support

**Usage:**
```vue
<!-- As a button -->
<MicroButton variant="robotic" @click="handleClick">
  Click Me
</MicroButton>

<!-- As a link -->
<MicroButton href="#contact">
  Get in Touch
</MicroButton>
```

## Composables

### useRevealOnScroll

A composable that reveals elements when they enter the viewport using IntersectionObserver.

**Location:** `src/composables/useRevealOnScroll.ts`

**Parameters:**
- `threshold` (number, default: 0.1): Percentage of element visible before triggering (0-1)
- `rootMargin` (string, default: '0px 0px -50px 0px'): Margin around viewport

**Returns:**
- `elementRef`: Template ref to attach to the element
- `isVisible`: Reactive boolean indicating visibility state

**Features:**
- SSR-safe (guards for window/document)
- Respects `prefers-reduced-motion`
- Automatically stops observing after element becomes visible

**Usage:**
```vue
<script setup>
import { useRevealOnScroll } from '@/composables/useRevealOnScroll';

const { elementRef, isVisible } = useRevealOnScroll();
</script>

<template>
  <div 
    ref="elementRef"
    :class="['reveal', { 'is-visible': isVisible }]"
  >
    Content to reveal
  </div>
</template>
```

## Styles

### reveal.css

Provides utility classes for scroll-triggered reveal animations.

**Location:** `src/assets/styles/reveal.css`

**Classes:**
- `.reveal`: Base reveal with translateY(20px) and fade
- `.reveal-left`: Reveal from left with translateX(-30px)
- `.reveal-right`: Reveal from right with translateX(30px)
- `.is-visible`: Applied when element enters viewport

**Usage:**
Elements automatically transition to visible state when `.is-visible` class is added (typically via `useRevealOnScroll` composable).

### hero-robot-arm.css

Styles for the robot arm component with metallic theme.

**Location:** `src/assets/styles/hero-robot-arm.css`

**CSS Variables:**
- `--robot-metal`: Metallic gradient for robot parts
- `--robot-accent`: Accent color (defaults to Mechabyte green)
- `--robot-highlight`: Highlight color for lights
- `--robot-shadow`: Shadow color

## Accessibility

All components respect accessibility best practices:

1. **Reduced Motion**: All animations are disabled when `prefers-reduced-motion: reduce` is detected
2. **Keyboard Navigation**: Buttons have proper focus-visible styles
3. **Screen Readers**: SVG elements have appropriate ARIA labels, titles, and descriptions
4. **Semantic HTML**: Components use proper HTML elements

## Performance

- Animations use CSS transforms only (no layout-triggering properties)
- Mouse tracking uses `requestAnimationFrame` for smooth 60fps performance
- IntersectionObserver efficiently handles scroll-triggered animations
- Bundle size increase: ~11KB total (5KB CSS, 6KB JS)

## Testing Checklist

- [ ] Hero loads and shows static SVG when prefers-reduced-motion is enabled
- [ ] Hovering and moving the pointer tilts the arm (desktop only)
- [ ] Keyboard focus reaches CTA button and micro-interactions are visible
- [ ] Reveal elements animate on scroll
- [ ] Reveal elements are immediately visible when reduced motion is enabled
- [ ] Button hover effects work (sheen, cog rotation, glow)
- [ ] Button press animation works (scale down)
- [ ] No console errors
- [ ] Performance: No significant CLS, LCP regression
