<script setup lang="ts">
import { useRevealOnScroll } from '@/composables/useRevealOnScroll';
import { computed } from 'vue';
import { translations } from '@/i18n/translations';
import CardGrid from './CardGrid.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

// Create refs for each card to enable reveal animations
const { elementRef: card1Ref, isVisible: card1Visible } = useRevealOnScroll({ threshold: 0.15 });
const { elementRef: card2Ref, isVisible: card2Visible } = useRevealOnScroll({ threshold: 0.15 });
const { elementRef: card3Ref, isVisible: card3Visible } = useRevealOnScroll({ threshold: 0.15 });

// Feature cards data - using semantic content relevant to robotics (reduced to 3)
const features = computed(() => [
  {
    icon: '🤖',
    title: t.value.featureInnovationTitle || 'Innovation',
    description: t.value.featureInnovationDesc || 'Building cutting-edge robotic solutions with modern technology and creative problem-solving.'
  },
  {
    icon: '⚙️',
    title: t.value.featureEngineeringTitle || 'Engineering Excellence',
    description: t.value.featureEngineeringDesc || 'Precision engineering and design thinking applied to every mechanical and software component.'
  },
  {
    icon: '👥',
    title: t.value.featureTeamworkTitle || 'Teamwork',
    description: t.value.featureTeamworkDesc || 'Collaborative environment where diverse skills come together to achieve common goals.'
  }
]);
</script>

<template>
  <section class="feature-cards-section" aria-labelledby="features-heading">
    <h2 id="features-heading" class="feature-cards-title centered-header">
      {{ t.featuresHeading || 'What We Do' }}
    </h2>
    
    <CardGrid :columns="3">
      <article 
        ref="card1Ref" 
        :class="['feature-card', 'card', 'transparent', 'reveal', { 'is-visible': card1Visible }]"
        tabindex="0"
        role="article"
      >
        <div class="feature-card-icon" aria-hidden="true">
          {{ features[0].icon }}
        </div>
        <h3 class="feature-card-title">
          {{ features[0].title }}
        </h3>
        <p class="feature-card-description">
          {{ features[0].description }}
        </p>
      </article>

      <article 
        ref="card2Ref" 
        :class="['feature-card', 'card', 'transparent', 'reveal', { 'is-visible': card2Visible }]"
        tabindex="0"
        role="article"
      >
        <div class="feature-card-icon" aria-hidden="true">
          {{ features[1].icon }}
        </div>
        <h3 class="feature-card-title">
          {{ features[1].title }}
        </h3>
        <p class="feature-card-description">
          {{ features[1].description }}
        </p>
      </article>

      <article 
        ref="card3Ref" 
        :class="['feature-card', 'card', 'transparent', 'reveal', { 'is-visible': card3Visible }]"
        tabindex="0"
        role="article"
      >
        <div class="feature-card-icon" aria-hidden="true">
          {{ features[2].icon }}
        </div>
        <h3 class="feature-card-title">
          {{ features[2].title }}
        </h3>
        <p class="feature-card-description">
          {{ features[2].description }}
        </p>
      </article>
    </CardGrid>
  </section>
</template>

<style scoped>
@import '@/assets/feature-cards.css';
/* reveal.css is imported globally in main.ts */
</style>
