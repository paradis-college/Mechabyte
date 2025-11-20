<script setup lang="ts">
import { useRevealOnScroll } from '@/composables/useRevealOnScroll';
import { computed } from 'vue';
import { translations } from '@/i18n/translations';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

// Create refs for each card to enable reveal animations
const card1Ref = useRevealOnScroll({ threshold: 0.15 });
const card2Ref = useRevealOnScroll({ threshold: 0.15 });
const card3Ref = useRevealOnScroll({ threshold: 0.15 });
const card4Ref = useRevealOnScroll({ threshold: 0.15 });

// Feature cards data - using semantic content relevant to robotics
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
  },
  {
    icon: '🏆',
    title: t.value.featureCompetitionTitle || 'Competition Ready',
    description: t.value.featureCompetitionDesc || 'Preparing for FTC competitions with rigorous testing, iteration, and strategic planning.'
  }
]);
</script>

<template>
  <section class="feature-cards-section" aria-labelledby="features-heading">
    <h2 id="features-heading" class="feature-cards-title">
      {{ t.featuresHeading || 'What We Do' }}
    </h2>
    
    <div class="feature-cards-container">
      <article 
        ref="card1Ref" 
        class="feature-card reveal"
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
        class="feature-card reveal"
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
        class="feature-card reveal"
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

      <article 
        ref="card4Ref" 
        class="feature-card reveal"
        tabindex="0"
        role="article"
      >
        <div class="feature-card-icon" aria-hidden="true">
          {{ features[3].icon }}
        </div>
        <h3 class="feature-card-title">
          {{ features[3].title }}
        </h3>
        <p class="feature-card-description">
          {{ features[3].description }}
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
@import '@/assets/feature-cards.css';
@import '@/assets/reveal.css';
</style>
