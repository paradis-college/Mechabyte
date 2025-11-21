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
  // Technical Team - Into the Deep (2024-2025)
  { name: "Alexia Vancea", department: "Technical", role: "Technical" },
  { name: "Ianis Cotoc", department: "Technical", role: "Technical" },
  { name: "Teodor Matricală", department: "Technical", role: "Technical" },
  { name: "Catrinel Bănuță", department: "Technical", role: "Technical" },
  { name: "Rareș Berheci", department: "Technical", role: "Technical" },
  // Non-Technical Team - Into the Deep (2024-2025)
  { name: "Alexandra Maftei", department: "Non-Technical", role: "Marketing" },
  { name: "Veronika Glazkova", department: "Non-Technical", role: "Marketing" },
  { name: "Cristiana Balan", department: "Non-Technical", role: "Design" },
  { name: "Alexandra Sîmbotin Gășpărel", department: "Non-Technical", role: "Outreach" },
  // Mentors - Into the Deep (2024-2025)
  { name: "Andreea Ioniță", department: "Mentor", role: "Team Mentor" },
  { name: "Bogdan Andone", department: "Mentor", role: "Team Mentor" }
]);

// Previous season (Centerstage 2023-2024) members
const previousSeasonMembers = ref<Member[]>([
  // Technical Team - Centerstage
  { name: "Maia Sava", department: "Technical", role: "Building & Programming" },
  { name: "Șerban Untu", department: "Technical", role: "Building & Programming" },
  { name: "Rareș Cozma", department: "Technical", role: "Building" },
  { name: "Cristian Ghidireac", department: "Technical", role: "Building & Design" },
  { name: "David Grigore", department: "Technical", role: "Design & Building" },
  { name: "Ștefan Albu", department: "Technical", role: "Design" },
  // Non-Technical Team - Centerstage
  { name: "Aayush Khadka", department: "Non-Technical", role: "Marketing" },
  { name: "Alexia Vancea", department: "Non-Technical", role: "Marketing" },
  { name: "Alexandra Maftei", department: "Non-Technical", role: "Marketing" },
  // Mentor - Centerstage
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

const previousTechnicalMembers = computed(() => 
  previousSeasonMembers.value.filter(m => m.department === "Technical")
);

const previousNonTechnicalMembers = computed(() => 
  previousSeasonMembers.value.filter(m => m.department === "Non-Technical")
);

const previousMentors = computed(() => 
  previousSeasonMembers.value.filter(m => m.department === "Mentor")
);
</script>

<template>
  <div class="team-page">
    <section class="content-section">
      <h1>{{ t.teamTitle }}</h1>
      <p class="intro-text">{{ t.teamIntro }}</p>
      
      <!-- Our Goals Section -->
      <div class="text-section goals-section">
        <h2>{{ language === 'en' ? 'Our Goals' : 'Obiectivele Noastre' }}</h2>
        <p>{{ language === 'en' 
          ? 'We implement STEM core values—responsibility, compassion, and perseverance—as we constantly improve our capabilities. Our mission is to inspire future generations to follow their dreams in science, technology, engineering, and mathematics while building a strong, collaborative team that exemplifies gracious professionalism.' 
          : 'Implementăm valorile fundamentale STEM—responsabilitate, compasiune și perseverență—pe măsură ce ne îmbunătățim constant capacitățile. Misiunea noastră este să inspirăm generațiile viitoare să-și urmeze visele în știință, tehnologie, inginerie și matematică, construind în același timp o echipă puternică și colaborativă care exemplifică profesionalismul grațios.' 
        }}</p>
      </div>
      
      <h2 class="season-header">{{ t.intoTheDeepSeason }}</h2>
      
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
      
      <!-- Previous Season Section -->
      <h2 class="season-header previous-season">{{ t.previousSeasonTitle }} - {{ t.centerstageSeason }}</h2>
      
      <div class="team-section">
        <h2>{{ t.technicalTeamTitle }}</h2>
        <div class="members-grid">
          <TeamMemberCard 
            v-for="(member, index) in previousTechnicalMembers" 
            :key="`prev-tech-${index}`"
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
            v-for="(member, index) in previousNonTechnicalMembers" 
            :key="`prev-nontech-${index}`"
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
            v-for="(member, index) in previousMentors" 
            :key="`prev-mentor-${index}`"
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

.goals-section {
  width: 100%;
  margin-bottom: 1vw;
}

.season-header {
  color: var(--mechabyte-green);
  font-size: 1.8vw;
  margin: 2vw 0 1vw 0;
  padding-bottom: 0.5vw;
  border-bottom: 0.2vw solid var(--mechabyte-green);
  width: 100%;
}

.season-header.previous-season {
  margin-top: 3vw;
  opacity: 0.85;
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

  .season-header {
    font-size: 22px;
    margin: 25px 0 15px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--mechabyte-green);
  }

  .season-header.previous-season {
    margin-top: 35px;
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
