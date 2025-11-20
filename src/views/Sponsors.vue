<script setup lang="ts">
import { computed } from 'vue';
import { translations } from '../i18n/translations';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
</script>

<template>
  <div class="sponsors-page">
    <section class="content-section">
      <h1>{{ t.sponsorsTitle }}</h1>
      <p class="intro-text">{{ t.sponsorsIntro }}</p>
      
      <div class="sponsors-notice">
        <h2>{{ t.currentSponsorsTitle }}</h2>
        <p>{{ language === 'en' 
          ? 'We are actively seeking sponsors to support our mission. Your organization could be featured here!' 
          : 'Căutăm în mod activ sponsori pentru a sprijini misiunea noastră. Organizația dumneavoastră ar putea fi prezentată aici!' }}</p>
      </div>
      
      <div class="impact-section">
        <h2>{{ t.sponsorshipImpactTitle }}</h2>
        <ul class="impact-list">
          <li v-for="(impact, index) in t.sponsorshipImpact" :key="index">
            {{ impact }}
          </li>
        </ul>
      </div>
      
      <div class="why-sponsor-section">
        <h2>{{ t.whySponsorTitle }}</h2>
        <div class="points-grid">
          <div v-for="(point, index) in t.whySponsorPoints" :key="index" class="point-card">
            <div class="point-number">{{ index + 1 }}</div>
            <p>{{ point }}</p>
          </div>
        </div>
      </div>
      
      <div class="cta-section">
        <h2>{{ t.becomeSponsorTitle }}</h2>
        <p>{{ t.becomeSponsorText }}</p>
        <RouterLink to="/contact" class="cta-button">
          {{ language === 'en' ? 'Contact Us' : 'Contactați-ne' }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sponsors-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2vw 0;
}

.content-section {
  display: flex;
  width: clamp(68.75vw, 1200px, 90vw);
  padding: 2vw;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
  border: 0.1vw solid var(--mechabyte-green);
  margin-bottom: 2vw;
}

h1 {
  color: var(--mechabyte-green);
  width: 100%;
}

h2 {
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.sponsors-notice {
  width: 100%;
  padding: 1.5vw;
  background: var(--mechabyte-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  text-align: center;
}

.sponsors-notice p {
  line-height: 1.6;
  font-size: clamp(14px, 1.2vw, 20px);
}

.impact-section {
  width: 100%;
}

.impact-list {
  list-style: none;
  padding: 0;
  margin-top: 1vw;
}

.impact-list li {
  padding: 1vw;
  margin-bottom: 0.5vw;
  border-left: 0.3vw solid var(--mechabyte-green);
  background: var(--dark-grey);
  line-height: 1.6;
}

.why-sponsor-section {
  width: 100%;
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5vw;
  margin-top: 1vw;
}

.point-card {
  display: flex;
  gap: 1vw;
  padding: 1.5vw;
  background: var(--dark-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.point-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.point-number {
  flex-shrink: 0;
  width: 2.5vw;
  height: 2.5vw;
  background: var(--mechabyte-green);
  color: var(--background-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: clamp(14px, 1.2vw, 20px);
}

.point-card p {
  line-height: 1.6;
}

.cta-section {
  width: 100%;
  padding: 2vw;
  background: var(--mechabyte-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  text-align: center;
}

.cta-section p {
  line-height: 1.6;
  margin-bottom: 1.5vw;
}

.cta-button {
  display: inline-block;
  padding: 1vw 2vw;
  background: var(--mechabyte-green);
  color: var(--background-grey);
  text-decoration: none;
  font-weight: bold;
  font-size: clamp(14px, 1.2vw, 20px);
  border-radius: 0.5vw;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: var(--light-grey);
  transform: scale(1.05);
}

@media only screen and (max-width: 1000px) {
  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .points-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .point-number {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .point-card {
    padding: 15px;
  }

  .sponsors-notice,
  .cta-section {
    padding: 15px;
  }

  .cta-button {
    padding: 12px 24px;
    font-size: 16px;
  }
}
</style>
