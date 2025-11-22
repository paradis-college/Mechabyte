<script setup lang="ts">
const props = defineProps<{
  title: string;
  caption?: string;
  count?: number;
}>();
</script>

<template>
  <div class="photo-gallery-placeholder">
    <div class="placeholder-header">
      <h4>📸 {{ title }}</h4>
      <p v-if="caption" class="caption">{{ caption }}</p>
    </div>
    <div class="placeholder-grid">
      <div v-for="i in (count || 3)" :key="i" class="photo-slot">
        <div class="photo-icon">🖼️</div>
        <span class="photo-label">Photo {{ i }}</span>
      </div>
    </div>
    <p class="placeholder-note">Team photos to be added</p>
  </div>
</template>

<style scoped>
.photo-gallery-placeholder {
  width: 100%;
  background: rgba(0, 255, 0, 0.03);
  border: 0.15vw dashed rgba(0, 255, 0, 0.3);
  border-radius: 0.5vw;
  padding: 2vw;
  margin: 2vw 0;
}

.placeholder-header h4 {
  color: var(--mechabyte-green);
  font-size: 1.4vw;
  margin-bottom: 0.5vw;
}

.caption {
  color: #ccc;
  font-size: 0.9vw;
  font-style: italic;
  margin-bottom: 1.5vw;
}

.placeholder-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5vw;
  margin: 1.5vw 0;
}

.photo-slot {
  aspect-ratio: 4/3;
  background: rgba(0, 0, 0, 0.3);
  border: 0.1vw solid rgba(0, 255, 0, 0.2);
  border-radius: 0.3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5vw;
}

.photo-icon {
  font-size: 3vw;
  opacity: 0.5;
}

.photo-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8vw;
}

.placeholder-note {
  color: rgba(0, 255, 0, 0.6);
  font-size: 0.85vw;
  font-style: italic;
  text-align: center;
  margin-top: 1vw;
}

@media only screen and (max-width: 1000px) {
  .photo-gallery-placeholder {
    padding: 20px;
    border: 2px dashed rgba(0, 255, 0, 0.3);
  }
  
  .placeholder-header h4 {
    font-size: 18px;
  }
  
  .caption {
    font-size: 13px;
  }
  
  .placeholder-grid {
    gap: 15px;
  }
  
  .photo-icon {
    font-size: 40px;
  }
  
  .photo-label {
    font-size: 11px;
  }
  
  .placeholder-note {
    font-size: 12px;
  }
}
</style>
