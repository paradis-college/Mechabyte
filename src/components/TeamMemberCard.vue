<script setup lang="ts">
import { computed } from "vue";

import Silhouette from "./icons/Silhouette.vue";

const props = defineProps({
  memberName: {
    default: "John D.",
    type: String,
  },
  department: {
    default: "Department",
    type: String,
  },
  role: {
    default: "",
    type: String,
  },
});

const emit = defineEmits<{
  (e: "click"): void;
}>();

// Map of team member names to their image paths
const imageMap: Record<string, string> = {
  Șerban: new URL("../assets/images/Serban.jpeg", import.meta.url).href,
  "David Grigore": new URL("../assets/images/David.jpeg", import.meta.url).href,
  "Ștefan Albu": new URL("../assets/images/Stefan.jpeg", import.meta.url).href,
  "Alexia Vancea": new URL("../assets/images/Alexia.jpeg", import.meta.url)
    .href,
  "Andreea Ioniță": new URL("../assets/images/Andreea.jpeg", import.meta.url)
    .href,
  "Andreea Ionita": new URL("../assets/images/Andreea.jpeg", import.meta.url)
    .href,
  "Cristiana Balan": new URL("../assets/images/Cristian.jpeg", import.meta.url)
    .href,
  Maia: new URL("../assets/images/Maia.jpeg", import.meta.url).href,
  Rareș: new URL("../assets/images/Rares.jpeg", import.meta.url).href,
  Aayush: new URL("../assets/images/Aayush.jpeg", import.meta.url).href,
};

const memberImage = computed(() => {
  return imageMap[props.memberName] || null;
});

// Determine role-based visual effects
// Note: Bogdan Andone (Team Mentor in 2024-2025) should not get special effects
const isTeamMentor = computed(() => {
  // Only Andreea Ioniță gets Team Mentor effects (founding mentor)
  return (
    props.role.toLowerCase().includes("team mentor") &&
    props.memberName.toLowerCase().includes("andreea")
  );
});

const isTeamLeader = computed(() => {
  return (
    (props.role.toLowerCase().includes("team leader") ||
      props.role.toLowerCase().includes("leader")) &&
    !isTeamMentor.value
  );
});

const isSenior = computed(() => {
  return (
    props.role.toLowerCase().includes("senior") &&
    !isTeamLeader.value &&
    !isTeamMentor.value
  );
});

const isJunior = computed(() => {
  return props.role.toLowerCase().includes("junior");
});

const handleClick = () => {
  emit("click");
};
</script>

<template>
  <div
    :id="`team-member-card-${props.memberName.toLowerCase()}`"
    class="team-member-card"
    :class="{
      'team-mentor': isTeamMentor,
      'team-leader': isTeamLeader,
      senior: isSenior,
      junior: isJunior,
    }"
    @click="handleClick"
  >
    <div class="card-photo-container">
      <img
        v-if="memberImage"
        :src="memberImage"
        :alt="`${props.memberName} photo`"
      />
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
  position: relative;
  display: flex;
  width: 200px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0.05vw solid var(--mechabyte-green);
  background: var(--mechabyte-grey);
  transition: all 0.3s ease;
  overflow: hidden;
  isolation: isolate;
}

.card-photo-container:hover {
  box-shadow: 0 0 0.5vw 0.1vw var(--mechabyte-green);
}

/* Team Mentor (Andreea Ioniță only) - Strong glowing pulse */
.team-member-card.team-mentor .card-photo-container {
  border: 2px solid var(--mechabyte-green);
  box-shadow:
    0 0 18px rgba(0, 255, 0, 0.7),
    0 0 35px rgba(0, 255, 0, 0.5),
    inset 0 0 15px rgba(0, 255, 0, 0.15);
  animation: pulse-glow-mentor 2.5s ease-in-out infinite;
}

.team-member-card.team-mentor .card-photo-container:hover {
  box-shadow:
    0 0 25px rgba(0, 255, 0, 0.85),
    0 0 50px rgba(0, 255, 0, 0.6),
    inset 0 0 25px rgba(0, 255, 0, 0.2);
}

.team-member-card.team-mentor .team-member-name {
  text-shadow: 0 0 12px rgba(0, 255, 0, 0.9);
  font-weight: bold;
}

/* Team Leader - Scanner beam shining effect */
.team-member-card.team-leader .card-photo-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100px;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    hsl(120deg 100% 70% / 40%) 50%,
    transparent 100%
  );
  transform: skewX(-15deg);
  opacity: 0;
  pointer-events: none;
  z-index: 2;
}

.team-member-card.team-leader .card-photo-container {
  border: 1.5px solid var(--mechabyte-green);
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.3);
}

.team-member-card.team-leader .card-photo-container:hover::before {
  animation: scannerSweep 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.team-member-card.team-leader .card-photo-container:hover {
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
  transform: translateY(-2px);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.team-member-card.team-leader .team-member-name {
  color: var(--mechabyte-green);
  font-weight: bold;
}

/* Senior - Subtle overlay effect */
.team-member-card.senior .card-photo-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at center,
    transparent 30%,
    rgba(0, 255, 0, 0.08) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 1;
}

.team-member-card.senior .card-photo-container {
  border: 1.5px solid var(--mechabyte-green);
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.25);
}

.team-member-card.senior .card-photo-container:hover::after {
  opacity: 1;
}

.team-member-card.senior .card-photo-container:hover {
  box-shadow: 0 0 12px rgba(0, 255, 0, 0.4);
}

.team-member-card.senior .team-member-name {
  color: var(--mechabyte-green);
}

/* Junior - Joyful overlay with soft pulse */
.team-member-card.junior .card-photo-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(100, 255, 150, 0.15) 0%,
    rgba(0, 255, 0, 0.05) 50%,
    transparent 100%
  );
  opacity: 0.6;
  animation: joyful-pulse 2s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}

.team-member-card.junior .card-photo-container {
  border: 1.5px solid var(--mechabyte-green);
  box-shadow: 0 0 6px rgba(100, 255, 150, 0.3);
}

.team-member-card.junior .card-photo-container:hover {
  box-shadow: 0 0 12px rgba(100, 255, 150, 0.5);
}

.team-member-card.junior .card-photo-container:hover::after {
  animation: joyful-pulse-hover 1s ease-in-out infinite;
}

.team-member-card.junior .team-member-name {
  color: var(--mechabyte-green);
}

/* Animations */
@keyframes pulse-glow-mentor {
  0%,
  100% {
    box-shadow:
      0 0 18px rgba(0, 255, 0, 0.7),
      0 0 35px rgba(0, 255, 0, 0.5),
      inset 0 0 15px rgba(0, 255, 0, 0.15);
  }
  50% {
    box-shadow:
      0 0 28px rgba(0, 255, 0, 0.9),
      0 0 55px rgba(0, 255, 0, 0.7),
      inset 0 0 25px rgba(0, 255, 0, 0.25);
  }
}

@keyframes scannerSweep {
  0% {
    left: -100%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

@keyframes joyful-pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05);
  }
}

@keyframes joyful-pulse-hover {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  position: relative;
  z-index: 0;
}

.silhouette {
  width: 100px;
  height: 114px;
  position: relative;
  z-index: 0;
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
    box-shadow:
      0 0 15px rgba(0, 255, 0, 0.7),
      0 0 28px rgba(0, 255, 0, 0.5);
  }

  .team-member-card.team-leader .card-photo-container {
    box-shadow: 0 0 6px rgba(0, 255, 0, 0.3);
  }

  .team-member-card.senior .card-photo-container {
    box-shadow: 0 0 6px rgba(0, 255, 0, 0.25);
  }

  .team-member-card.junior .card-photo-container {
    box-shadow: 0 0 5px rgba(100, 255, 150, 0.3);
  }
}

/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .team-member-card.team-leader .card-photo-container::before,
  .team-member-card.junior .card-photo-container::after {
    animation: none !important;
  }

  .team-member-card.team-mentor .card-photo-container {
    animation: none !important;
  }

  .team-member-card:hover {
    transform: none !important;
  }
}
</style>
