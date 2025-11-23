<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
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

const router = useRouter();
const route = useRoute();

const setLanguage = (lang: 'en' | 'ro') => {
  emit('update:language', lang);
};

const navigateTo = (path: string) => {
  router.push(path);
};

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <div class="nav-links">
        <MicroButton 
          :label="translations[language].nav.home"
          :variant="isActive('/') ? 'primary' : 'secondary'"
          @click="navigateTo('/')"
          ariaLabel="Navigate to Home"
        />
        <MicroButton 
          :label="translations[language].nav.portfolio"
          :variant="isActive('/portfolio') ? 'primary' : 'secondary'"
          @click="navigateTo('/portfolio')"
          ariaLabel="Navigate to Portfolio"
        />
        <MicroButton 
          :label="translations[language].nav.values"
          :variant="isActive('/values') ? 'primary' : 'secondary'"
          @click="navigateTo('/values')"
          ariaLabel="Navigate to Values"
        />
        <MicroButton 
          :label="translations[language].nav.achievements"
          :variant="isActive('/achievements') ? 'primary' : 'secondary'"
          @click="navigateTo('/achievements')"
          ariaLabel="Navigate to Achievements"
        />
        <MicroButton 
          :label="translations[language].nav.team"
          :variant="isActive('/team') ? 'primary' : 'secondary'"
          @click="navigateTo('/team')"
          ariaLabel="Navigate to Team"
        />
        <MicroButton 
          :label="translations[language].nav.sponsors"
          :variant="isActive('/sponsors') ? 'primary' : 'secondary'"
          @click="navigateTo('/sponsors')"
          ariaLabel="Navigate to Sponsors"
        />
        <MicroButton 
          :label="translations[language].nav.support"
          :variant="isActive('/support') ? 'primary' : 'secondary'"
          @click="navigateTo('/support')"
          ariaLabel="Navigate to Support"
        />
        <MicroButton 
          :label="translations[language].nav.contact"
          :variant="isActive('/contact') ? 'primary' : 'secondary'"
          @click="navigateTo('/contact')"
          ariaLabel="Navigate to Contact"
        />
      </div>
      <div class="language-toggle">
        <MicroButton 
          label="EN"
          :variant="language === 'en' ? 'primary' : 'secondary'"
          @click="setLanguage('en')"
          ariaLabel="Switch to English"
        />
        <MicroButton 
          label="RO"
          :variant="language === 'ro' ? 'primary' : 'secondary'"
          @click="setLanguage('ro')"
          ariaLabel="Switch to Romanian"
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
  gap: 1vw;
  flex-wrap: wrap;
  align-items: center;
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
    gap: 10px;
    justify-content: center;
    width: 100%;
  }
}
</style>
