# Reveal-on-Scroll Utility - Manual QA Guide

## Overview
This guide provides step-by-step instructions for manually testing the reveal-on-scroll utility implemented in this PR.

## Features Implemented
1. **Vue 3 Composable** (`useRevealOnScroll.ts`) - Reusable scroll reveal logic
2. **CSS Animations** (`reveal.css`) - Smooth fade-in and translateY effects
3. **Feature Cards Component** (`FeatureCards.vue`) - Demo implementation with 4 cards
4. **Internationalization** - English and Romanian translations
5. **Accessibility** - Keyboard navigation, ARIA labels, reduced-motion support

## Testing Instructions

### 1. Basic Functionality Test
**Goal**: Verify that cards animate when scrolled into view

**Steps**:
1. Start the dev server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Scroll down past the hero image to the "What We Do" section
4. Observe the feature cards

**Expected Result**:
- Cards should fade in (opacity 0 → 1)
- Cards should slide up (translateY(20px) → 0)
- Animation should be smooth with 600ms duration
- Each card should animate independently

### 2. Reduced Motion Test
**Goal**: Ensure users who prefer reduced motion see content immediately

**Steps (macOS)**:
1. Go to System Preferences → Accessibility → Display
2. Enable "Reduce motion"
3. Refresh the browser
4. Scroll to the "What We Do" section

**Steps (Windows)**:
1. Go to Settings → Ease of Access → Display
2. Enable "Show animations in Windows"
3. Refresh the browser
4. Scroll to the "What We Do" section

**Steps (Browser DevTools)**:
1. Open DevTools (F12)
2. Press Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "Emulate CSS prefers-reduced-motion"
4. Select "reduce" option
5. Refresh the browser

**Expected Result**:
- Cards should appear immediately visible (no animation)
- No fade-in or slide-up effects
- Content is fully accessible without motion

### 3. Internationalization Test
**Goal**: Verify translations work correctly

**Steps**:
1. Load the homepage
2. Note the feature cards are in English with "What We Do" heading
3. Click the "RO" button in the top-right navigation
4. Observe the feature cards section

**Expected Result**:
- Heading changes to "Ce Facem"
- Card 1: "Inovație" 
- Card 2: "Excelență în Inginerie"
- Card 3: "Muncă în Echipă"
- Card 4: "Pregătit pentru Competiție"
- All descriptions are in Romanian

### 4. Keyboard Accessibility Test
**Goal**: Ensure cards are keyboard-navigable

**Steps**:
1. Load the homepage
2. Press Tab repeatedly to navigate through elements
3. Notice when focus reaches the feature cards section
4. Continue tabbing through each card

**Expected Result**:
- Each card should receive focus with visible focus outline
- Tab order should be logical (card 1 → 2 → 3 → 4)
- Focus indicator should be clearly visible (green outline)

### 5. Responsive Design Test
**Goal**: Verify cards work on different screen sizes

**Steps**:
1. Desktop (>768px): Open in full browser window
2. Tablet (768px): Resize browser to ~800px width
3. Mobile (<768px): Resize browser to ~375px width

**Expected Result**:
- Desktop: Cards in multi-column grid layout
- Tablet: Cards adjust to fit available space
- Mobile: Cards stack vertically (1 column)
- Animations work consistently on all sizes

### 6. Cross-Browser Compatibility Test
**Goal**: Ensure functionality across browsers

**Browsers to Test**:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if on macOS)

**Steps**:
1. Open homepage in each browser
2. Scroll to feature cards section
3. Test animations, hover effects, and keyboard navigation

**Expected Result**:
- Consistent animation behavior across all browsers
- No console errors
- IntersectionObserver works (all modern browsers support it)

### 7. Performance Test
**Goal**: Verify no performance issues

**Steps**:
1. Open DevTools → Performance tab
2. Start recording
3. Scroll down to feature cards section
4. Stop recording

**Expected Result**:
- No janky animations (smooth 60fps)
- IntersectionObserver events show in timeline
- No memory leaks
- Minimal JavaScript execution time

### 8. Console Error Check
**Goal**: Ensure no errors in console

**Steps**:
1. Open DevTools → Console tab
2. Navigate through the site
3. Scroll to feature cards
4. Switch languages
5. Resize window

**Expected Result**:
- No JavaScript errors
- No Vue warnings
- No TypeScript errors
- Only expected info/debug messages

## Known Issues / Notes
- Font loading error for Google Fonts is pre-existing (not introduced by this PR)
- Cards are visible on initial page load if already in viewport (expected behavior)
- One-time animation: cards won't re-animate if scrolled past again (by design)

## Accessibility Checklist
- [x] ARIA labels on section (aria-labelledby)
- [x] Semantic HTML (section, article, h2, h3, p)
- [x] Keyboard accessible (tabindex="0" on cards)
- [x] Focus indicators visible
- [x] Respects prefers-reduced-motion
- [x] Sufficient color contrast (green on dark grey)
- [x] Icons marked as aria-hidden="true" (decorative)

## Files Changed
- `src/composables/useRevealOnScroll.ts` (new)
- `src/assets/reveal.css` (new)
- `src/components/FeatureCards.vue` (new)
- `src/assets/feature-cards.css` (new)
- `src/i18n/translations.ts` (modified - added translations)
- `src/views/Home.vue` (modified - integrated component)

## Build Verification
Run the following commands to verify the build:

```bash
# Type checking
npm run type-check

# Production build
npm run build

# Preview production build
npm run preview
```

All commands should complete without errors.
