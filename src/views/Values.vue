<script setup lang="ts">
import { computed } from 'vue';
import { translations } from '../i18n/translations';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
</script>

<template>
  <div class="values-page">
    <section class="content-section">
      <h1>{{ t.valuesTitle }}</h1>
      <p class="intro-text">{{ t.valuesIntro }}</p>
      
      <div class="values-grid">
        <div v-for="(value, index) in t.valuesList" :key="index" class="value-card">
          <h2>{{ value.title }}</h2>
          <p>{{ value.description }}</p>
        </div>
      </div>
      
      <div class="ambassador-section">
        <h2>{{ language === 'en' ? 'Ambassador Role' : 'Rol de Ambasador' }}</h2>
        <p class="ambassador-text">{{ t.ambassadorStatement }}</p>
      </div>
      
      <p class="closing-text">{{ t.valuesClosing }}</p>
    </section>
  </div>
</template>

<style scoped>
.values-page {
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
}

.intro-text,
.closing-text {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2vw;
  width: 100%;
}

.value-card {
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  background: var(--dark-grey);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.value-card p {
  line-height: 1.6;
}

.ambassador-section {
  width: 100%;
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  background: var(--mechabyte-grey);
  border-radius: 0.5vw;
  margin-top: 1vw;
}

.ambassador-text {
  line-height: 1.6;
  font-style: italic;
}

@media only screen and (max-width: 1000px) {
  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .value-card {
    padding: 15px;
  }
}
</style>
