<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { translations } from '../i18n/translations';
import SectionHeader from '../components/SectionHeader.vue';
import MicroButton from '../components/MicroButton.vue';
import FindMorePane from '../components/FindMorePane.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const router = useRouter();
const t = computed(() => translations[props.language]);

// State for popup panes
const showVolunteerInfo = ref(false);
const showDonateInfo = ref(false);
</script>

<template>
  <div class="support-page">
    <section class="content-section">
      <SectionHeader 
        :title="t.supportTitle"
        :subtitle="t.supportIntro"
      />
      
      <!-- Tax Benefits - First and Prominent -->
      <div class="tax-benefits-highlight value-card">
        <h2>💰 {{ t.taxDeductibleTitle }}</h2>
        <p>{{ t.taxDeductibleText }}</p>
      </div>
      
      <!-- Sponsorship Benefits with Logo Placement -->
      <div class="benefits-section">
        <h2 class="section-title">🏆 {{ t.sponsorBenefitsTitle }}</h2>
        <div class="benefits-grid">
          <div v-for="(benefit, index) in t.sponsorBenefits" :key="index" class="benefit-card value-card">
            <div class="benefit-icon">{{ index + 1 }}</div>
            <p>{{ benefit }}</p>
          </div>
        </div>
      </div>
      
      <!-- Volunteer & Mentorship (For Parents) -->
      <div class="cta-buttons-section">
        <h2 class="section-title">🤝 {{ language === 'en' ? 'Get Involved' : 'Implică-te' }}</h2>
        <div class="cta-buttons">
          <MicroButton 
            :label="language === 'en' ? '👨‍👩‍👧 Volunteer & Mentorship (Parents)' : '👨‍👩‍👧 Voluntariat & Mentorat (Părinți)'"
            @click="showVolunteerInfo = true"
          />
          <MicroButton 
            :label="language === 'en' ? '🏢 Equipment & Material Donations (Businesses)' : '🏢 Donații Echipament (Companii)'"
            variant="secondary"
            @click="showDonateInfo = true"
          />
        </div>
      </div>

      <!-- FindMorePane for Volunteer Info -->
      <FindMorePane 
        :show="showVolunteerInfo"
        :title="language === 'en' ? '👨‍👩‍👧 Volunteer & Mentorship' : '👨‍👩‍👧 Voluntariat & Mentorat'"
        @close="showVolunteerInfo = false"
      >
        <template v-if="language === 'en'">
          <h3>{{ t.volunteerTitle }}</h3>
          <p>{{ t.volunteerText }}</p>
          <h3 style="margin-top: 1.5rem;">{{ t.mentorshipTitle }}</h3>
          <p>{{ t.mentorshipText }}</p>
          <p style="margin-top: 1rem;"><strong>Perfect for parents who want to:</strong></p>
          <ul style="margin-left: 1.5rem;">
            <li>Share professional expertise with students</li>
            <li>Guide the next generation</li>
            <li>Be part of a meaningful community initiative</li>
          </ul>
        </template>
        <template v-else>
          <h3>{{ t.volunteerTitle }}</h3>
          <p>{{ t.volunteerText }}</p>
          <h3 style="margin-top: 1.5rem;">{{ t.mentorshipTitle }}</h3>
          <p>{{ t.mentorshipText }}</p>
          <p style="margin-top: 1rem;"><strong>Perfect pentru părinți care doresc să:</strong></p>
          <ul style="margin-left: 1.5rem;">
            <li>Împărtășească expertiza profesională cu studenții</li>
            <li>Ghideze următoarea generație</li>
            <li>Facă parte dintr-o inițiativă comunitară semnificativă</li>
          </ul>
        </template>
      </FindMorePane>

      <!-- FindMorePane for Donations -->
      <FindMorePane 
        :show="showDonateInfo"
        :title="language === 'en' ? '🏢 Equipment & Material Donations' : '🏢 Donații Echipament'"
        @close="showDonateInfo = false"
      >
        <template v-if="language === 'en'">
          <h3>{{ t.donateTitle }}</h3>
          <p>{{ t.donateText }}</p>
          <p style="margin-top: 1rem;"><strong>What we need:</strong></p>
          <ul style="margin-left: 1.5rem;">
            <li>Electronic components (motors, sensors, controllers)</li>
            <li>Building materials (aluminum, 3D printer filament)</li>
            <li>Tools and workshop equipment</li>
            <li>Laptops or computers for programming</li>
          </ul>
          <p style="margin-top: 1rem;"><em>Turn your unused tech into student success!</em></p>
        </template>
        <template v-else>
          <h3>{{ t.donateTitle }}</h3>
          <p>{{ t.donateText }}</p>
          <p style="margin-top: 1rem;"><strong>Ce avem nevoie:</strong></p>
          <ul style="margin-left: 1.5rem;">
            <li>Componente electronice (motoare, senzori, controlere)</li>
            <li>Materiale de construcție (aluminiu, filament imprimantă 3D)</li>
            <li>Unelte și echipament pentru atelier</li>
            <li>Laptopuri sau computere pentru programare</li>
          </ul>
          <p style="margin-top: 1rem;"><em>Transformă tehnologia neutilizată în succes studențesc!</em></p>
        </template>
      </FindMorePane>
      
      <!-- Contact CTA -->
      <div class="final-cta">
        <h2>{{ language === 'en' ? '🚀 Ready to Make an Impact?' : '🚀 Gata să Faci un Impact?' }}</h2>
        <p>{{ language === 'en' 
          ? 'Join us in building tomorrow\'s tech leaders. Every contribution matters.' 
          : 'Alătură-te nouă în construirea liderilor tech de mâine. Fiecare contribuție contează.' }}</p>
        <MicroButton 
          :label="language === 'en' ? 'Contact Us' : 'Contactați-ne'"
          @click="router.push('/contact')"
        />
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
  border: 0.1vw solid var(--mechabyte-green);
  margin-bottom: 2vw;
}

.section-title {
  color: var(--mechabyte-green);
  margin-bottom: 1.5vw;
  text-align: center;
  width: 100%;
}

.tax-benefits-highlight {
  width: 100%;
  background: linear-gradient(135deg, var(--dark-grey) 0%, var(--mechabyte-grey) 100%);
}

.tax-benefits-highlight h2 {
  color: var(--mechabyte-green);
  font-size: clamp(20px, 2vw, 28px);
  margin-bottom: 1vw;
}

.tax-benefits-highlight p {
  line-height: 1.6;
  color: var(--light-grey);
}

.benefits-section {
  width: 100%;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5vw;
  width: 100%;
}

.benefit-card {
  display: flex;
  gap: 1vw;
  align-items: flex-start;
}

.benefit-icon {
  flex-shrink: 0;
  width: 2.5vw;
  height: 2.5vw;
  min-width: 30px;
  min-height: 30px;
  background: var(--mechabyte-green);
  color: var(--background-grey);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: clamp(14px, 1.2vw, 18px);
}

.benefit-card p {
  line-height: 1.6;
  color: var(--light-grey);
  flex: 1;
}

.cta-buttons-section {
  width: 100%;
  text-align: center;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1vw;
  justify-content: center;
  margin-top: 1vw;
}

.final-cta {
  width: 100%;
  padding: 2vw;
  background: var(--dark-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
}

.final-cta h2 {
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.final-cta p {
  line-height: 1.6;
  margin-bottom: 1.5vw;
  color: var(--light-grey);
}

/* Value card styling (for glow effect) */
.value-card {
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  background: var(--dark-grey);
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 255, 0, 0.3);
  border-color: var(--mechabyte-green);
}

@media only screen and (max-width: 1000px) {
  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .final-cta {
    padding: 20px;
  }
}
</style>
