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

// Determine role-based visual effects
const isTeamMentor = computed(() => {
  return props.role.toLowerCase().includes('team mentor');
});

const isTeamLeader = computed(() => {
  return props.role.toLowerCase().includes('team leader') || props.role.toLowerCase().includes('leader');
});

const isSenior = computed(() => {
  return props.role.toLowerCase().includes('senior') && !isTeamLeader.value;
});

const isJunior = computed(() => {
  return props.role.toLowerCase().includes('junior');
});

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <div 
    :id="`team-member-card-${props.memberName.toLowerCase()}`" 
    class="team-member-card"
    :class="{ 
      'team-mentor': isTeamMentor,
      'team-leader': isTeamLeader, 
      'senior': isSenior,
      'junior': isJunior
    }"
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

/* Team Mentor - Strong glowing pulse (slightly diminished from original) */
.team-member-card.team-mentor .card-photo-container {
  border: 2px solid var(--mechabyte-green);
  box-shadow: 0 0 18px rgba(0, 255, 0, 0.7),
              0 0 35px rgba(0, 255, 0, 0.5),
              inset 0 0 15px rgba(0, 255, 0, 0.15);
  animation: pulse-glow-mentor 2.5s ease-in-out infinite;
}

.team-member-card.team-mentor .card-photo-container:hover {
  box-shadow: 0 0 25px rgba(0, 255, 0, 0.85),
              0 0 50px rgba(0, 255, 0, 0.6),
              inset 0 0 25px rgba(0, 255, 0, 0.2);
}

.team-member-card.team-mentor .team-member-name {
  text-shadow: 0 0 12px rgba(0, 255, 0, 0.9);
  font-weight: bold;
}

/* Team Leader - Reduced glowing effect */
.team-member-card.team-leader .card-photo-container {
  border: 1.5px solid var(--mechabyte-green);
  box-shadow: 0 0 12px rgba(0, 255, 0, 0.5),
              0 0 25px rgba(0, 255, 0, 0.3),
              inset 0 0 12px rgba(0, 255, 0, 0.08);
  animation: pulse-glow-leader 2s ease-in-out infinite;
}

.team-member-card.team-leader .card-photo-container:hover {
  box-shadow: 0 0 18px rgba(0, 255, 0, 0.6),
              0 0 35px rgba(0, 255, 0, 0.4),
              inset 0 0 18px rgba(0, 255, 0, 0.12);
}

.team-member-card.team-leader .team-member-name {
  text-shadow: 0 0 8px rgba(0, 255, 0, 0.7);
  font-weight: bold;
}

/* Senior - Enhanced visibility */
.team-member-card.senior .card-photo-container {
  border: 1.5px solid var(--mechabyte-green);
  box-shadow: 0 0 12px rgba(0, 255, 0, 0.4),
              inset 0 0 8px rgba(0, 255, 0, 0.1);
}

.team-member-card.senior .card-photo-container:hover {
  box-shadow: 0 0 18px rgba(0, 255, 0, 0.6),
              inset 0 0 12px rgba(0, 255, 0, 0.15);
}

.team-member-card.senior .team-member-name {
  text-shadow: 0 0 6px rgba(0, 255, 0, 0.5);
}

/* Junior - Joyful shimmer effect */
.team-member-card.junior .card-photo-container {
  border: 1.5px solid var(--mechabyte-green);
  animation: shimmer-joy 3s ease-in-out infinite;
}

.team-member-card.junior .card-photo-container:hover {
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5),
              0 0 25px rgba(100, 255, 150, 0.3);
  animation: shimmer-joy-hover 1.5s ease-in-out infinite;
}

.team-member-card.junior .team-member-name {
  color: var(--mechabyte-green);
}

@keyframes pulse-glow-mentor {
  0%, 100% {
    box-shadow: 0 0 18px rgba(0, 255, 0, 0.7),
                0 0 35px rgba(0, 255, 0, 0.5),
                inset 0 0 15px rgba(0, 255, 0, 0.15);
  }
  50% {
    box-shadow: 0 0 28px rgba(0, 255, 0, 0.9),
                0 0 55px rgba(0, 255, 0, 0.7),
                inset 0 0 25px rgba(0, 255, 0, 0.25);
  }
}

@keyframes pulse-glow-leader {
  0%, 100% {
    box-shadow: 0 0 12px rgba(0, 255, 0, 0.5),
                0 0 25px rgba(0, 255, 0, 0.3),
                inset 0 0 12px rgba(0, 255, 0, 0.08);
  }
  50% {
    box-shadow: 0 0 18px rgba(0, 255, 0, 0.7),
                0 0 35px rgba(0, 255, 0, 0.5),
                inset 0 0 18px rgba(0, 255, 0, 0.15);
  }
}

@keyframes shimmer-joy {
  0%, 100% {
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3),
                0 0 15px rgba(100, 255, 150, 0.2);
  }
  50% {
    box-shadow: 0 0 12px rgba(0, 255, 0, 0.5),
                0 0 20px rgba(100, 255, 150, 0.3);
  }
}

@keyframes shimmer-joy-hover {
  0%, 100% {
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5),
                0 0 25px rgba(100, 255, 150, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(0, 255, 0, 0.7),
                0 0 35px rgba(100, 255, 150, 0.5);
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
  
  .team-member-card.team-mentor .card-photo-container {
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.7),
                0 0 28px rgba(0, 255, 0, 0.5);
  }
  
  .team-member-card.team-leader .card-photo-container {
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5),
                0 0 20px rgba(0, 255, 0, 0.3);
  }
  
  .team-member-card.senior .card-photo-container {
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
  }
  
  .team-member-card.junior .card-photo-container {
    box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
  }
}
</style>