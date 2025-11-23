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

const emit = defineEmits<{
  (e: 'click'): void;
}>();

// Map of team member names to their image paths
const imageMap: Record<string, string> = {
  'Șerban': new URL('../assets/images/Serban.jpeg', import.meta.url).href,
  'David Grigore': new URL('../assets/images/David.jpeg', import.meta.url).href,
  'Ștefan Albu': new URL('../assets/images/Stefan.jpeg', import.meta.url).href,
  'Alexia Vancea': new URL('../assets/images/Alexia.jpeg', import.meta.url).href,
  'Andreea Ioniță': new URL('../assets/images/Andreea.jpeg', import.meta.url).href,
  'Andreea Ionita': new URL('../assets/images/Andreea.jpeg', import.meta.url).href,
  'Cristiana Balan': new URL('../assets/images/Cristian.jpeg', import.meta.url).href,
  'Maia': new URL('../assets/images/Maia.jpeg', import.meta.url).href,
  'Rareș': new URL('../assets/images/Rares.jpeg', import.meta.url).href,
  'Aayush': new URL('../assets/images/Aayush.jpeg', import.meta.url).href,
};

const memberImage = computed(() => {
  return imageMap[props.memberName] || null;
});

// Determine if member is a Team Leader or Senior for special effects
const isTeamLeader = computed(() => {
  return props.role.toLowerCase().includes('team leader') || props.role.toLowerCase().includes('leader');
});

const isSenior = computed(() => {
  return props.role.toLowerCase().includes('senior') && !isTeamLeader.value;
});

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <div 
    :id="`team-member-card-${props.memberName.toLowerCase()}`" 
    class="team-member-card"
    :class="{ 'team-leader': isTeamLeader, 'senior': isSenior }"
    @click="handleClick"
  >
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
  cursor: pointer;
  transition: transform 0.3s ease;
}

.team-member-card:hover {
  transform: translateY(-5px);
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
  transition: all 0.3s ease;
}

.card-photo-container:hover {
  box-shadow: 0 0 0.5vw 0.1vw var(--mechabyte-green);
}

/* Team Leader glowing effect */
.team-member-card.team-leader .card-photo-container {
  border: 2px solid var(--mechabyte-green);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.6),
              0 0 40px rgba(0, 255, 0, 0.4),
              inset 0 0 20px rgba(0, 255, 0, 0.1);
  animation: pulse-glow 2s ease-in-out infinite;
}

.team-member-card.team-leader .card-photo-container:hover {
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.8),
              0 0 60px rgba(0, 255, 0, 0.5),
              inset 0 0 30px rgba(0, 255, 0, 0.2);
}

.team-member-card.team-leader .team-member-name {
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
  font-weight: bold;
}

/* Senior subtle effect */
.team-member-card.senior .card-photo-container {
  border: 1.5px solid var(--mechabyte-green);
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3),
              inset 0 0 10px rgba(0, 255, 0, 0.05);
}

.team-member-card.senior .card-photo-container:hover {
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5),
              inset 0 0 15px rgba(0, 255, 0, 0.1);
}

.team-member-card.senior .team-member-name {
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.4);
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.6),
                0 0 40px rgba(0, 255, 0, 0.4),
                inset 0 0 20px rgba(0, 255, 0, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.8),
                0 0 60px rgba(0, 255, 0, 0.6),
                inset 0 0 30px rgba(0, 255, 0, 0.2);
  }
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

@media only screen and (max-width: 1000px) {
  .card-photo-container {
    width: 150px;
    height: 225px;
  }
  
  .team-member-card.team-leader .card-photo-container {
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.6),
                0 0 30px rgba(0, 255, 0, 0.4);
  }
  
  .team-member-card.senior .card-photo-container {
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
  }
}
</style>