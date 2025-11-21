<script setup lang="ts">
import '../styles/components/ScannerBeam.css';

defineProps({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isPrimary: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="sponsor-card scanner" :class="{ primary: isPrimary }">
    <div class="sponsor-logo-container">
      <img :src="logo" :alt="`${name} logo`" class="sponsor-logo" />
    </div>
    <h3 class="sponsor-name">{{ name }}</h3>
    <p class="sponsor-description">{{ description }}</p>
  </div>
</template>

<style scoped>
.sponsor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vw;
  background: var(--dark-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  gap: 1vw;
}

.sponsor-card.primary {
  border: 0.2vw solid var(--mechabyte-green);
  background: linear-gradient(135deg, var(--dark-grey) 0%, var(--mechabyte-grey) 100%);
  box-shadow: 0 0 1vw 0.2vw rgba(0, 255, 0, 0.2);
}

.sponsor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.sponsor-logo-container {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 0.5vw;
  padding: 1vw;
}

.sponsor-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.sponsor-name {
  color: var(--mechabyte-green);
  font-size: clamp(16px, 1.5vw, 24px);
  font-weight: bold;
  text-align: center;
  margin: 0;
}

.sponsor-description {
  color: var(--text-white);
  font-size: clamp(12px, 1vw, 16px);
  line-height: 1.6;
  text-align: center;
  margin: 0;
}

@media only screen and (max-width: 1000px) {
  .sponsor-card {
    padding: 20px;
    gap: 15px;
  }

  .sponsor-logo-container {
    height: 120px;
    padding: 15px;
  }

  .sponsor-name {
    font-size: 18px;
  }

  .sponsor-description {
    font-size: 14px;
  }
}
</style>
