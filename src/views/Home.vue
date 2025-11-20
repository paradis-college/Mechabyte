<script setup lang="ts">
import { computed } from 'vue';
import { translations } from '../i18n/translations';
import GearConveyor from '../components/GearConveyor.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
</script>

<template>
  <div class="home-page">
    <!-- Decorative gear background - positioned absolutely behind content -->
    <!-- To enable parallax, uncomment and change to: <GearConveyor :enable-parallax="true" /> -->
    <GearConveyor />
    
    <img class="banner" alt="Mechabyte banner" src="/banner.png" />
    <img class="snapshot" src="../assets/images/RobotsSnapshot.jpg" alt="Mechabyte robot" />
    
    <section class="content-section">
      <h1>{{ t.homeTitle }}</h1>
      <p class="welcome-text">{{ t.homeWelcome }}</p>
      
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
    </section>
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5vw;
}

.banner,
.snapshot,
.content-section {
  position: relative;
  z-index: 1;
}

.banner {
  width: 15vw;
  height: 10vw;
  margin-top: 1vw;
}

.snapshot {
  height: 37.5vw;
  width: auto;
  max-width: 100%;
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

@media only screen and (max-width: 1000px) {
  .banner {
    width: 40vw;
    height: 26vw;
  }

  .snapshot {
    height: auto;
    width: 90vw;
  }

  .content-section {
    width: 90vw;
    padding: 20px;
  }
}
</style>
