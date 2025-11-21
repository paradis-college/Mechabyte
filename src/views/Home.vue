<script setup lang="ts">
import { computed } from 'vue';
import { translations } from '../i18n/translations';
import FeatureCardsWithScanner from '../components/FeatureCardsWithScanner.vue';
import HeroRobotArm from '../components/HeroRobotArm.vue';
import MicroButton from '../components/MicroButton.vue';
import FeatureCards from '../components/FeatureCards.vue';
import { useRevealOnScroll } from '../composables/useRevealOnScroll';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

// Setup reveal animation for welcome text
const { elementRef: welcomeRef, isVisible: welcomeVisible } = useRevealOnScroll();
</script>

<template>
  <div class="home-page">
    <!-- Hero section with robot arm -->
    <div class="hero-section">
      <img class="banner" alt="Mechabyte banner" src="/banner.png" />
    </div>
    
    <!-- Image with overlaid robot arm -->
    <div class="robot-showcase">
      <img class="snapshot" src="../assets/images/RobotsSnapshot.jpg" alt="Mechabyte robot" />
      <HeroRobotArm :size="300" class="hero-robot-overlay" />
    </div>
    
    <!-- Feature Cards Section -->
    <FeatureCards :language="language" />
    
    <!-- Feature Cards with Scanner Effect -->
    <FeatureCardsWithScanner />
    
    <section class="content-section">
      <h1>{{ t.homeTitle }}</h1>
      
      <!-- Revealed welcome text -->
      <p 
        ref="welcomeRef"
        :class="['welcome-text', 'reveal', { 'is-visible': welcomeVisible }]"
      >
        {{ t.homeWelcome }}
      </p>
      
      <h2>{{ t.aboutTitle }}</h2>
      <p class="about-text">{{ t.aboutText }}</p>
      
      <h2>{{ t.missionTitle }}</h2>
      <ul class="mission-list">
        <li v-for="(item, index) in t.missionItems" :key="index">{{ item }}</li>
      </ul>
      
      <h2>{{ t.ftcTitle }}</h2>
      <p class="ftc-description">{{ t.ftcDescription }}</p>
      
      <h2>{{ t.activitiesTitle }}</h2>
      <ul class="activities-list">
        <li v-for="(activity, index) in t.activities" :key="index">
          <strong>{{ activity.name }}:</strong> {{ activity.description }}
        </li>
      </ul>
      
      <!-- CTA Button with micro-interactions -->
      <div class="cta-section">
        <MicroButton 
          variant="robotic"
          href="/contact"
        >
          {{ t.contactCta }}
        </MicroButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5vw;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
}

.banner {
  width: 15vw;
  height: 10vw;
}

.robot-showcase {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2vw;
}

.snapshot {
  height: 37.5vw;
  width: auto;
  max-width: 100%;
  display: block;
}

.hero-robot-overlay {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: auto;
  z-index: 10;
}

.content-section {
  display: flex;
  width: clamp(68.75vw, 1200px, 90vw);
  padding: 2vw;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  margin-bottom: 2vw;
}

h1 {
  color: var(--mechabyte-green);
  width: 100%;
}

h2 {
  color: var(--mechabyte-green);
  margin-top: 1.5vw;
  margin-bottom: 0.5vw;
}

.welcome-text {
  font-size: clamp(14px, 1.8vw, 24px);
  font-weight: 600;
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.about-text,
.ftc-description {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.mission-list,
.activities-list {
  margin-left: 2vw;
  line-height: 1.8;
  list-style-type: disc;
}

.mission-list li,
.activities-list li {
  margin-bottom: 0.5vw;
}

.cta-section {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2vw;
}

@media only screen and (max-width: 1000px) {
  .banner {
    width: 40vw;
    height: 26vw;
  }

  .snapshot {
    height: auto;
    width: 90vw;
  }

  .hero-robot-overlay {
    top: 5%;
  }

  .content-section {
    width: 90vw;
    padding: 20px;
  }
}
</style>
