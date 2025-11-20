<script setup lang="ts">
import { computed } from 'vue';
import { translations } from '../i18n/translations';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
</script>

<template>
  <div class="achievements-page">
    <section class="content-section">
      <h1>{{ t.achievementsTitle }}</h1>
      <p class="intro-text">{{ t.achievementsIntro }}</p>
      
      <div class="timeline">
        <div v-for="(achievement, index) in t.achievementsList" :key="index" class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="year-badge">{{ achievement.year }}</div>
            <h2>{{ achievement.title }}</h2>
            <p>{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.achievements-page {
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
  margin-bottom: 0.5vw;
  font-size: clamp(18px, 1.5vw, 28px);
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.timeline {
  width: 100%;
  position: relative;
  padding-left: 3vw;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.8vw;
  top: 0;
  bottom: 0;
  width: 0.2vw;
  background: var(--mechabyte-green);
}

.timeline-item {
  position: relative;
  margin-bottom: 2vw;
  padding-left: 2vw;
}

.timeline-marker {
  position: absolute;
  left: -2.5vw;
  top: 0.5vw;
  width: 1vw;
  height: 1vw;
  background: var(--mechabyte-green);
  border-radius: 50%;
  border: 0.2vw solid var(--background-grey);
  box-shadow: 0 0 10px var(--mechabyte-green);
}

.timeline-content {
  background: var(--dark-grey);
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.year-badge {
  display: inline-block;
  background: var(--mechabyte-green);
  color: var(--background-grey);
  padding: 0.3vw 0.8vw;
  border-radius: 0.3vw;
  font-weight: bold;
  font-size: clamp(12px, 1vw, 16px);
  margin-bottom: 0.5vw;
}

.timeline-content p {
  line-height: 1.6;
  margin-top: 0.5vw;
}

@media only screen and (max-width: 1000px) {
  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .timeline {
    padding-left: 40px;
  }

  .timeline::before {
    left: 10px;
  }

  .timeline-marker {
    left: -30px;
    top: 5px;
    width: 15px;
    height: 15px;
  }

  .timeline-item {
    padding-left: 20px;
    margin-bottom: 25px;
  }

  .timeline-content {
    padding: 15px;
  }

  .year-badge {
    padding: 5px 10px;
    font-size: 14px;
  }
}
</style>
