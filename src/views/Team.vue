<script setup lang="ts">
import { computed, ref } from 'vue';
import { translations } from '../i18n/translations';
import TeamMemberCard from '../components/TeamMemberCard.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

// Team members data from original App.vue
type Member = {
  name: string;
  department: string;
  role?: string;
};

const members = ref<Member[]>([
  // Technical Team
  { name: "Alexandra", department: "Technical", role: "Programming" },
  { name: "Alessia Sabie", department: "Technical", role: "Programming" },
  { name: "Alexandru Săvescu", department: "Technical", role: "Programming" },
  { name: "Ștefan Albu", department: "Technical", role: "Hardware" },
  { name: "Ionas Pilat", department: "Technical", role: "Hardware" },
  { name: "Luca Stăncila", department: "Technical", role: "CAD" },
  { name: "David Grigore", department: "Technical", role: "CAD" },
  { name: "Teodor Matricală", department: "Technical", role: "CAD" },
  { name: "Ianis Cotoc", department: "Technical", role: "Technical" },
  // Non-Technical Team
  { name: "Alexandra Maftei", department: "Non-Technical", role: "Marketing" },
  { name: "Alexia Vancea", department: "Non-Technical", role: "Marketing" },
  { name: "Cristiana Balan", department: "Non-Technical", role: "Design" },
  { name: "Tudor Androne", department: "Non-Technical", role: "Design" },
  { name: "Lia Onișor", department: "Non-Technical", role: "Outreach" },
  { name: "Patric Tamaș", department: "Non-Technical", role: "Outreach" },
  // Mentor
  { name: "Andreea Ioniță", department: "Mentor", role: "Team Mentor" }
]);

const technicalMembers = computed(() => 
  members.value.filter(m => m.department === "Technical")
);

const nonTechnicalMembers = computed(() => 
  members.value.filter(m => m.department === "Non-Technical")
);

const mentors = computed(() => 
  members.value.filter(m => m.department === "Mentor")
);
</script>

<template>
  <div class="team-page">
    <section class="content-section">
      <h1>{{ t.teamTitle }}</h1>
      <p class="intro-text">{{ t.teamIntro }}</p>
      
      <div class="team-section">
        <h2>{{ t.technicalTeamTitle }}</h2>
        <div class="members-grid">
          <TeamMemberCard 
            v-for="(member, index) in technicalMembers" 
            :key="index"
            :member-name="member.name"
            :department="member.department"
            :role="member.role"
          />
        </div>
      </div>
      
      <div class="team-section">
        <h2>{{ t.nonTechnicalTeamTitle }}</h2>
        <div class="members-grid">
          <TeamMemberCard 
            v-for="(member, index) in nonTechnicalMembers" 
            :key="index"
            :member-name="member.name"
            :department="member.department"
            :role="member.role"
          />
        </div>
      </div>
      
      <div class="team-section">
        <h2>{{ t.mentorsTitle }}</h2>
        <div class="members-grid">
          <TeamMemberCard 
            v-for="(member, index) in mentors" 
            :key="index"
            :member-name="member.name"
            :department="member.department"
            :role="member.role"
          />
        </div>
      </div>
      
      <div class="text-sections">
        <div class="text-section">
          <h2>{{ t.collaborationTitle }}</h2>
          <p>{{ t.teamCollaboration }}</p>
        </div>
        
        <div class="text-section">
          <h2>{{ t.trainingTitle }}</h2>
          <p>{{ t.teamTraining }}</p>
        </div>
        
        <div class="text-section">
          <h2>{{ t.teamEnvironmentTitle }}</h2>
          <p>{{ t.teamEnvironment }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.team-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2vw 0;
}

.content-section {
  display: flex;
  width: clamp(68.75vw, 1200px, 90vw);
  padding: 2vw;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
  border: 0.1vw solid var(--mechabyte-green);
  margin-bottom: 2vw;
}

h1 {
  color: var(--mechabyte-green);
  width: 100%;
}

h2 {
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.team-section {
  width: 100%;
  margin-bottom: 2vw;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2vw;
  width: 100%;
  margin-top: 1vw;
}

.text-sections {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2vw;
  margin-top: 1vw;
}

.text-section {
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  background: var(--dark-grey);
  border-radius: 0.5vw;
}

.text-section p {
  line-height: 1.6;
}

@media only screen and (max-width: 1000px) {
  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .members-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .text-section {
    padding: 15px;
  }
}
</style>
