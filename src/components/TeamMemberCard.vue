<script setup lang="ts">
import { computed } from 'vue';

import Silhouette from './icons/Silhouette.vue';

const props = defineProps({
  memberName: {
    default: "John D.",
    type: String
  },
  department: {
    default: "Department",
    type: String
  },
  role: {
    default: "",
    type: String
  }
});

// Map of team member names to their image paths
const imageMap: Record<string, string> = {
  'Șerban': new URL('../assets/images/Serban.jpeg', import.meta.url).href,
  'David': new URL('../assets/images/David.jpeg', import.meta.url).href,
  'David Grigore': new URL('../assets/images/David.jpeg', import.meta.url).href,
  'Ștefan Albu': new URL('../assets/images/Stefan.jpeg', import.meta.url).href,
  'Stefan Albu': new URL('../assets/images/Stefan.jpeg', import.meta.url).href,
  'Alexia Vancea': new URL('../assets/images/Alexia.jpeg', import.meta.url).href,
  'Andreea Ioniță': new URL('../assets/images/Andreea.jpeg', import.meta.url).href,
  'Andreea Ionita': new URL('../assets/images/Andreea.jpeg', import.meta.url).href,
  'Cristiana Balan': new URL('../assets/images/Cristian.jpeg', import.meta.url).href,
  'Maia': new URL('../assets/images/Maia.jpeg', import.meta.url).href,
  'Rareș': new URL('../assets/images/Rares.jpeg', import.meta.url).href,
  'Rares': new URL('../assets/images/Rares.jpeg', import.meta.url).href,
  'Aayush': new URL('../assets/images/Aayush.jpeg', import.meta.url).href,
};

const memberImage = computed(() => {
  return imageMap[props.memberName] || null;
});
</script>

<template>
  <div :id="`team-member-card-${props.memberName.toLowerCase()}`" class="team-member-card">
    <div class="card-photo-container">
      <img v-if="memberImage" :src="memberImage" :alt="`${props.memberName} photo`" />
      <Silhouette v-else class="silhouette" />
    </div>
    <em class="team-member-name">{{ props.memberName }}</em>
    <p class="team-member-department">{{ props.department }}</p>
    <p v-if="props.role" class="team-member-role">{{ props.role }}</p>
  </div>
</template>

<style scoped>
.team-member-card {
  display: inline-flex;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.card-photo-container {
  display: flex;
  width: 200px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0.05vw solid var(--mechabyte-green);
  background: var(--mechabyte-grey);
  cursor: pointer;
}

.card-photo-container:hover {
  box-shadow: 0 0 0.5vw 0.1vw var(--mechabyte-green);
}

img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}

.silhouette {
  width: 100px;
  height: 114px;
}

.team-member-name {
  color: var(--mechabyte-green);
}

.team-member-role {
  color: var(--mechabyte-green);
  font-size: 0.9em;
  margin-top: -5px;
}
</style>