<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { translations } from '../i18n/translations';
import MicroButton from './MicroButton.vue';

// Props for language state
const props = defineProps<{
  language: 'en' | 'ro';
}>();

// Emit event to change language
const emit = defineEmits<{
  (e: 'update:language', value: 'en' | 'ro'): void;
}>();

const setLanguage = (lang: 'en' | 'ro') => {
  emit('update:language', lang);
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">{{ translations[language].nav.home }}</RouterLink>
        <RouterLink to="/values" class="nav-link">{{ translations[language].nav.values }}</RouterLink>
        <RouterLink to="/achievements" class="nav-link">{{ translations[language].nav.achievements }}</RouterLink>
        <RouterLink to="/team" class="nav-link">{{ translations[language].nav.team }}</RouterLink>
        <RouterLink to="/sponsors" class="nav-link">{{ translations[language].nav.sponsors }}</RouterLink>
        <RouterLink to="/support" class="nav-link">{{ translations[language].nav.support }}</RouterLink>
        <RouterLink to="/contact" class="nav-link">{{ translations[language].nav.contact }}</RouterLink>
      </div>
      <div class="language-toggle">
        <MicroButton 
          label="EN"
          :variant="language === 'en' ? 'primary' : 'secondary'"
          @click="setLanguage('en')"
          aria-label="Switch to English"
        />
        <MicroButton 
          label="RO"
          :variant="language === 'ro' ? 'primary' : 'secondary'"
          @click="setLanguage('ro')"
          aria-label="Switch to Romanian"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--background-grey);
  border-bottom: 0.2vw solid var(--mechabyte-green);
  z-index: 1300;
  padding: 1vw 2vw;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1vw;
}

.nav-links {
  display: flex;
  gap: 2vw;
  flex-wrap: wrap;
  align-items: center;
}

.nav-link {
  color: var(--light-grey);
  text-decoration: none;
  font-weight: 600;
  font-size: clamp(12px, 1.2vw, 18px);
  padding: 0.5vw 1vw;
  border-radius: 0.3vw;
  transition: all 0.3s ease;
  border: 0.15vw solid transparent;
}

.nav-link:hover {
  color: var(--mechabyte-green);
  border-color: var(--mechabyte-green);
}

.nav-link.router-link-active {
  color: var(--mechabyte-green);
  border-color: var(--mechabyte-green);
}

.language-toggle {
  display: flex;
  gap: 0.5vw;
}

/* Responsive design for mobile */
@media only screen and (max-width: 1000px) {
  .navbar {
    padding: 10px 15px;
  }

  .nav-content {
    flex-direction: column;
    gap: 15px;
  }

  .nav-links {
    gap: 15px;
    justify-content: center;
    width: 100%;
  }

  .nav-link {
    padding: 8px 12px;
    font-size: 14px;
  }
}
</style>
