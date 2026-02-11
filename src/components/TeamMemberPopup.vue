<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

export interface TeamMemberProfile {
  name: string;
  role: string;
  department: string;
  bio: string;
  skills: string[];
  beliefs: string[];
  contributions: string[];
  philosophy: string;
}

const props = defineProps<{
  show: boolean;
  member: TeamMemberProfile | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.show) {
    emit("close");
  }
};

const handleBackdropClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains("team-member-popup")) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="popup">
      <div
        v-if="show && member"
        class="team-member-popup"
        role="dialog"
        aria-modal="true"
        :aria-label="`${member.name} Profile`"
        @click="handleBackdropClick"
      >
        <div class="popup-content">
          <button class="popup-close" @click="emit('close')" aria-label="Close">
            ×
          </button>

          <div class="popup-header">
            <h2 class="member-name">{{ member.name }}</h2>
            <p class="member-role">{{ member.role }}</p>
            <p class="member-department">{{ member.department }}</p>
          </div>

          <div class="popup-body">
            <section v-if="member.bio" class="profile-section">
              <h3>About</h3>
              <p>{{ member.bio }}</p>
            </section>

            <section v-if="member.philosophy" class="profile-section">
              <h3>Philosophy</h3>
              <p class="philosophy">{{ member.philosophy }}</p>
            </section>

            <section v-if="member.skills.length > 0" class="profile-section">
              <h3>Skills & Abilities</h3>
              <ul class="skills-list">
                <li v-for="(skill, index) in member.skills" :key="index">
                  <span class="bullet">→</span> {{ skill }}
                </li>
              </ul>
            </section>

            <section v-if="member.beliefs.length > 0" class="profile-section">
              <h3>Core Beliefs</h3>
              <ul class="beliefs-list">
                <li v-for="(belief, index) in member.beliefs" :key="index">
                  <span class="bullet">✦</span> {{ belief }}
                </li>
              </ul>
            </section>

            <section
              v-if="member.contributions.length > 0"
              class="profile-section"
            >
              <h3>Key Contributions</h3>
              <ul class="contributions-list">
                <li
                  v-for="(contribution, index) in member.contributions"
                  :key="index"
                >
                  <span class="bullet">★</span> {{ contribution }}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.team-member-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.popup-content {
  background: linear-gradient(
    135deg,
    rgba(20, 25, 35, 0.95) 0%,
    rgba(15, 20, 30, 0.98) 100%
  );
  border: 2px solid var(--mechabyte-green);
  border-radius: 15px;
  padding: 2.5rem;
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
}

.popup-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: 2px solid var(--mechabyte-green);
  color: var(--mechabyte-green);
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: all 0.3s ease;
}

.popup-close:hover {
  background: var(--mechabyte-green);
  color: black;
  transform: rotate(90deg);
}

.popup-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(0, 255, 0, 0.3);
}

.member-name {
  font-size: 2rem;
  color: var(--mechabyte-green);
  margin-bottom: 0.5rem;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.member-role {
  font-size: 1.2rem;
  color: var(--mechabyte-green);
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.member-department {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.popup-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.profile-section h3 {
  color: var(--mechabyte-green);
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.profile-section p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 1rem;
}

.philosophy {
  font-style: italic;
  background: rgba(0, 255, 0, 0.05);
  padding: 1rem;
  border-left: 3px solid var(--mechabyte-green);
  border-radius: 5px;
}

.skills-list,
.beliefs-list,
.contributions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills-list li,
.beliefs-list li,
.contributions-list li {
  color: rgba(255, 255, 255, 0.9);
  padding: 0.6rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
}

.bullet {
  position: absolute;
  left: 0;
  color: var(--mechabyte-green);
  font-weight: bold;
}

/* Scrollbar styling */
.popup-content::-webkit-scrollbar {
  width: 8px;
}

.popup-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.popup-content::-webkit-scrollbar-thumb {
  background: var(--mechabyte-green);
  border-radius: 10px;
}

.popup-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 0, 0.8);
}

/* Animations */
.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.3s ease;
}

.popup-enter-active .popup-content,
.popup-leave-active .popup-content {
  transition: transform 0.3s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-from .popup-content {
  transform: scale(0.9) translateY(-20px);
}

.popup-leave-to .popup-content {
  transform: scale(0.9) translateY(20px);
}

/* Responsive */
@media only screen and (max-width: 1000px) {
  .team-member-popup {
    padding: 1rem;
  }

  .popup-content {
    padding: 2rem 1.5rem;
    max-height: 90vh;
  }

  .member-name {
    font-size: 1.5rem;
  }

  .member-role {
    font-size: 1rem;
  }

  .profile-section h3 {
    font-size: 1.1rem;
  }

  .profile-section p,
  .skills-list li,
  .beliefs-list li,
  .contributions-list li {
    font-size: 0.9rem;
  }
}
</style>
