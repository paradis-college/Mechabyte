<script setup lang="ts">
import { computed } from 'vue';
import { translations } from '../i18n/translations';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
</script>

<template>
  <div class="support-page">
    <section class="content-section">
      <h1>{{ t.supportTitle }}</h1>
      <p class="intro-text">{{ t.supportIntro }}</p>
      
      <div class="benefits-section">
        <h2>{{ t.sponsorBenefitsTitle }}</h2>
        <ul class="benefits-list">
          <li v-for="(benefit, index) in t.sponsorBenefits" :key="index">
            {{ benefit }}
          </li>
        </ul>
      </div>
      
      <div class="support-ways">
        <div class="support-card">
          <h2>{{ t.volunteerTitle }}</h2>
          <p>{{ t.volunteerText }}</p>
        </div>
        
        <div class="support-card">
          <h2>{{ t.donateTitle }}</h2>
          <p>{{ t.donateText }}</p>
        </div>
        
        <div class="support-card">
          <h2>{{ t.mentorshipTitle }}</h2>
          <p>{{ t.mentorshipText }}</p>
        </div>
      </div>
      
      <div class="tax-section">
        <h2>{{ t.taxDeductibleTitle }}</h2>
        <p>{{ t.taxDeductibleText }}</p>
      </div>
      
      <div class="cta-section">
        <h2>{{ language === 'en' ? 'Get Involved' : 'Implică-te' }}</h2>
        <p>{{ language === 'en' 
          ? 'Ready to support Mechabyte? Contact us to learn more about how you can contribute to STEM education and help our team achieve its goals.' 
          : 'Gata să sprijiniți Mechabyte? Contactați-ne pentru a afla mai multe despre cum puteți contribui la educația STEM și ajuta echipa noastră să-și atingă obiectivele.' }}</p>
        <RouterLink to="/contact" class="cta-button">
          {{ language === 'en' ? 'Contact Us' : 'Contactați-ne' }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.support-page {
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
  border: 0.1vw solid white;
  margin-bottom: 2vw;
  background: var(--background-grey);
}

h1 {
  color: white;
  width: 100%;
}

h2 {
  color: white;
  margin-bottom: 1vw;
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 1vw;
  color: white;
}

.benefits-section {
  width: 100%;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin-top: 1vw;
}

.benefits-list li {
  padding: 1vw;
  margin-bottom: 0.5vw;
  border-left: 0.3vw solid white;
  background: var(--dark-grey);
  line-height: 1.6;
  color: white;
}

.support-ways {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2vw;
  width: 100%;
}

.support-card {
  padding: 1.5vw;
  border: 0.1vw solid white;
  border-radius: 0.5vw;
  background: var(--dark-grey);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.support-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.3);
}

.support-card p {
  line-height: 1.6;
  color: white;
}

.tax-section {
  width: 100%;
  padding: 1.5vw;
  background: var(--mechabyte-grey);
  border: 0.1vw solid white;
  border-radius: 0.5vw;
}

.tax-section p {
  line-height: 1.6;
  margin-top: 0.5vw;
  color: white;
}

.cta-section {
  width: 100%;
  padding: 2vw;
  background: var(--mechabyte-grey);
  border: 0.1vw solid white;
  border-radius: 0.5vw;
  text-align: center;
}

.cta-section p {
  line-height: 1.6;
  margin-bottom: 1.5vw;
  color: white;
}

.cta-button {
  display: inline-block;
  padding: 1vw 2vw;
  background: white;
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

  .support-ways {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .support-card,
  .tax-section,
  .cta-section {
    padding: 15px;
  }

  .cta-button {
    padding: 12px 24px;
    font-size: 16px;
  }
}
</style>
