<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  activeSeason: '2023-2024' | '2024-2025' | '2025-2026';
}>();

const emit = defineEmits<{
  (e: 'update:activeSeason', value: '2023-2024' | '2024-2025' | '2025-2026'): void;
}>();

const seasons = [
  { id: '2023-2024' as const, label: '2023-2024', subtitle: 'CenterStage' },
  { id: '2024-2025' as const, label: '2024-2025', subtitle: 'Into the Deep' },
  { id: '2025-2026' as const, label: '2025-2026', subtitle: 'Upcoming' }
];

const selectSeason = (seasonId: typeof props.activeSeason) => {
  emit('update:activeSeason', seasonId);
};
</script>

<template>
  <div class="season-tabs">
    <div class="tabs-container">
      <button
        v-for="season in seasons"
        :key="season.id"
        :class="['tab-button', { active: activeSeason === season.id }]"
        @click="selectSeason(season.id)"
      >
        <span class="tab-label">{{ season.label }}</span>
        <span class="tab-subtitle">{{ season.subtitle }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.season-tabs {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 0.2vw solid var(--mechabyte-green);
  padding: 1vw 0;
  margin-bottom: 3vw;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.tabs-container {
  display: flex;
  justify-content: center;
  gap: 2vw;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2vw;
}

.tab-button {
  flex: 1;
  max-width: 300px;
  background: rgba(0, 0, 0, 0.3);
  border: 0.15vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 1.2vw 2vw;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3vw;
}

.tab-button:hover {
  background: rgba(0, 255, 0, 0.1);
  border-color: var(--mechabyte-green);
  transform: translateY(-0.2vw);
}

.tab-button.active {
  background: rgba(0, 255, 0, 0.15);
  border-color: var(--mechabyte-green);
  border-width: 0.2vw;
  box-shadow: 0 0 1vw rgba(0, 255, 0, 0.3);
}

.tab-label {
  font-size: 1.4vw;
  font-weight: 700;
  color: #fff;
}

.tab-button.active .tab-label {
  color: var(--mechabyte-green);
}

.tab-subtitle {
  font-size: 0.9vw;
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
}

.tab-button.active .tab-subtitle {
  color: var(--mechabyte-green);
}

@media only screen and (max-width: 1000px) {
  .season-tabs {
    border-bottom: 2px solid var(--mechabyte-green);
    padding: 10px 0;
    margin-bottom: 20px;
    position: relative; /* Fix for small displays - non-sticky */
  }
  
  .tabs-container {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    padding: 0 15px;
  }
  
  .tab-button {
    max-width: 100%;
    border: 2px solid rgba(0, 255, 0, 0.3);
    border-radius: 8px;
    padding: 15px 20px;
  }
  
  .tab-button:hover {
    transform: translateY(-2px);
  }
  
  .tab-button.active {
    border-width: 3px;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.3);
  }
  
  .tab-label {
    font-size: 18px;
  }
  
  .tab-subtitle {
    font-size: 13px;
  }
}
</style>
