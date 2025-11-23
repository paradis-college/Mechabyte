<script setup lang="ts">
import { computed, ref } from 'vue';
import { translations } from '../i18n/translations';
import TeamMemberCard from '../components/TeamMemberCard.vue';
import TeamMemberPopup, { type TeamMemberProfile } from '../components/TeamMemberPopup.vue';
import MicroButton from '../components/MicroButton.vue';
import SectionHeader from '../components/SectionHeader.vue';
import FindMorePane from '../components/FindMorePane.vue';
import SeasonTabs from '../components/SeasonTabs.vue';
import { teamProfiles } from '../data/teamProfiles';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);
const activeSeason = ref<'2023-2024' | '2024-2025' | '2025-2026'>('2025-2026');

// Popup state
const showMemberPopup = ref(false);
const selectedMember = ref<TeamMemberProfile | null>(null);

// State for toggling bonus content visibility
const showTeamStructure = ref(false);
const showCollaborationStyle = ref(false);
const showRecruitment = ref(false);
const showTraining = ref(false);
const showDailyLife = ref(false);

// State for the 3 info popups
const showCollaborationInfo = ref(false);
const showTrainingInfo = ref(false);
const showEnvironmentInfo = ref(false);

const toggleSection = (section: string) => {
  switch(section) {
    case 'teamStructure':
      showTeamStructure.value = !showTeamStructure.value;
      break;
    case 'collaborationStyle':
      showCollaborationStyle.value = !showCollaborationStyle.value;
      break;
    case 'recruitment':
      showRecruitment.value = !showRecruitment.value;
      break;
    case 'training':
      showTraining.value = !showTraining.value;
      break;
    case 'dailyLife':
      showDailyLife.value = !showDailyLife.value;
      break;
  }
};

const handleMemberClick = (memberName: string) => {
  const profile = teamProfiles[memberName];
  if (profile) {
    selectedMember.value = profile;
    showMemberPopup.value = true;
  }
};

// Team members data with role progression
// Role progression rules:
// - First year = Junior
// - Second year = Senior
// - Third year = Team Leader
// - Special role mappings applied for specific members as indicated
type Member = {
  name: string;
  department: string;
  role?: string;
  season?: string;
};

// 2025-2026 Season - Current Team
const currentSeasonMembers = ref<Member[]>([
  // Technical Team - 2025-2026
  { name: "Ianis Cotoc", department: "Technical", role: "Team Leader", season: "2025-2026" },
  { name: "David Grigore", department: "Technical", role: "Senior Design", season: "2025-2026" },
  { name: "Ștefan Albu", department: "Technical", role: "Senior Design", season: "2025-2026" },
  { name: "Alexia Vancea", department: "Technical", role: "Senior", season: "2025-2026" },
  { name: "Teodor Matricală", department: "Technical", role: "Senior", season: "2025-2026" },
  { name: "Catrinel Bănuță", department: "Technical", role: "Junior", season: "2025-2026" },
  { name: "Rareș Berheci", department: "Technical", role: "Junior", season: "2025-2026" },
  // Non-Technical Team - 2025-2026
  { name: "Alexandra Maftei", department: "Non-Technical", role: "Team Leader", season: "2025-2026" },
  { name: "Veronika Glazkova", department: "Non-Technical", role: "Senior", season: "2025-2026" },
  { name: "Cristiana Balan", department: "Non-Technical", role: "Senior", season: "2025-2026" },
  { name: "Alexandra Sîmbotin Gășpărel", department: "Non-Technical", role: "Junior", season: "2025-2026" },
  // Collaborators & Mentors - 2025-2026
  { name: "Bobu Dragos", department: "Collaborator", role: "Web Developer", season: "2025-2026" },
  { name: "Andreea Ioniță", department: "Mentor", role: "Team Mentor", season: "2025-2026" },
  { name: "Tudor Tocila", department: "Mentor", role: "Business Teacher", season: "2025-2026" },
  { name: "Sebastian Rosca", department: "Mentor", role: "Mentor", season: "2025-2026" },
]);

// 2024-2025 Season (Into the Deep) - Previous Season
const members = ref<Member[]>([
  // Technical Team - Into the Deep (2024-2025)
  { name: "Alexia Vancea", department: "Technical", role: "Technical", season: "2024-2025" },
  { name: "Ianis Cotoc", department: "Technical", role: "Technical", season: "2024-2025" },
  { name: "Teodor Matricală", department: "Technical", role: "Technical", season: "2024-2025" },
  { name: "Catrinel Bănuță", department: "Technical", role: "Technical", season: "2024-2025" },
  { name: "Rareș Berheci", department: "Technical", role: "Technical", season: "2024-2025" },
  // Non-Technical Team - Into the Deep (2024-2025)
  { name: "Alexandra Maftei", department: "Non-Technical", role: "Marketing", season: "2024-2025" },
  { name: "Veronika Glazkova", department: "Non-Technical", role: "Marketing", season: "2024-2025" },
  { name: "Cristiana Balan", department: "Non-Technical", role: "Design", season: "2024-2025" },
  { name: "Alexandra Sîmbotin Gășpărel", department: "Non-Technical", role: "Outreach", season: "2024-2025" },
  // Mentors - Into the Deep (2024-2025)
  { name: "Andreea Ioniță", department: "Mentor", role: "Team Mentor", season: "2024-2025" },
  { name: "Bogdan Andone", department: "Mentor", role: "Team Mentor", season: "2024-2025" }
]);

// Previous season (Centerstage 2023-2024) members
const previousSeasonMembers = ref<Member[]>([
  // Technical Team - Centerstage
  { name: "Maia Sava", department: "Technical", role: "Building & Programming", season: "2023-2024" },
  { name: "Șerban Untu", department: "Technical", role: "Building & Programming", season: "2023-2024" },
  { name: "Rareș Cozma", department: "Technical", role: "Building", season: "2023-2024" },
  { name: "Cristian Ghidireac", department: "Technical", role: "Building & Design", season: "2023-2024" },
  { name: "David Grigore", department: "Technical", role: "Design & Building", season: "2023-2024" },
  { name: "Ștefan Albu", department: "Technical", role: "Design", season: "2023-2024" },
  // Non-Technical Team - Centerstage
  { name: "Aayush Khadka", department: "Non-Technical", role: "Marketing", season: "2023-2024" },
  { name: "Alexia Vancea", department: "Non-Technical", role: "Marketing", season: "2023-2024" },
  { name: "Alexandra Maftei", department: "Non-Technical", role: "Marketing", season: "2023-2024" },
  // Mentor - Centerstage
  { name: "Andreea Ioniță", department: "Mentor", role: "Team Mentor", season: "2023-2024" }
]);

// Alumni - members who are no longer active
const alumniMembers = ref<Member[]>([
  { name: "Aayush Khadka", department: "Alumni", role: "Marketing (2023-2024)", season: "Alumni" },
  { name: "Maia Sava", department: "Alumni", role: "Building & Programming (2023-2024)", season: "Alumni" },
  { name: "Șerban Untu", department: "Alumni", role: "Building & Programming (2023-2024)", season: "Alumni" },
  { name: "Rareș Cozma", department: "Alumni", role: "Building (2023-2024)", season: "Alumni" },
  { name: "Cristian Ghidireac", department: "Alumni", role: "Building & Design (2023-2024)", season: "Alumni" },
]);

const currentTechnicalMembers = computed(() => 
  currentSeasonMembers.value.filter(m => m.department === "Technical")
);

const currentNonTechnicalMembers = computed(() => 
  currentSeasonMembers.value.filter(m => m.department === "Non-Technical")
);

const currentCollaborators = computed(() => 
  currentSeasonMembers.value.filter(m => m.department === "Collaborator")
);

const currentMentors = computed(() => 
  currentSeasonMembers.value.filter(m => m.department === "Mentor")
);

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
    <!-- Header Section -->
    <section class="content-section header-section">
      <SectionHeader 
        :title="t.teamTitle"
        :subtitle="t.teamIntro"
      />
      
      <div class="role-progression-note">
        <p v-if="language === 'en'">
          <strong>Role Progression:</strong> Team members advance through Junior (1st year) → Senior (2nd year) → Team Leader (3rd year) as they gain experience.
        </p>
        <p v-else>
          <strong>Progresie Roluri:</strong> Membrii echipei avansează prin Junior (an 1) → Senior (an 2) → Lider de Echipă (an 3) pe măsură ce câștigă experiență.
        </p>
      </div>
      
      <div class="cta-buttons">
        <MicroButton 
          :label="language === 'en' ? 'Team Structure' : 'Structura Echipei'" 
          @click="toggleSection('teamStructure')"
        />
        <MicroButton 
          :label="language === 'en' ? 'Collaboration Style' : 'Stil de Colaborare'" 
          variant="secondary"
          @click="toggleSection('collaborationStyle')"
        />
        <MicroButton 
          :label="language === 'en' ? 'How We Recruit' : 'Cum Recrutăm'" 
          @click="toggleSection('recruitment')"
        />
        <MicroButton 
          :label="t.collaborationTitle"
          @click="showCollaborationInfo = true"
        />
        <MicroButton 
          :label="t.trainingTitle"
          variant="secondary"
          @click="showTrainingInfo = true"
        />
        <MicroButton 
          :label="t.teamEnvironmentTitle"
          @click="showEnvironmentInfo = true"
        />
      </div>

      <!-- FindMorePane popups for team info -->
      <FindMorePane 
        :show="showCollaborationInfo"
        :title="t.collaborationTitle"
        @close="showCollaborationInfo = false"
      >
        <p>{{ t.teamCollaboration }}</p>
      </FindMorePane>

      <FindMorePane 
        :show="showTrainingInfo"
        :title="t.trainingTitle"
        @close="showTrainingInfo = false"
      >
        <p>{{ t.teamTraining }}</p>
      </FindMorePane>

      <FindMorePane 
        :show="showEnvironmentInfo"
        :title="t.teamEnvironmentTitle"
        @close="showEnvironmentInfo = false"
      >
        <p>{{ t.teamEnvironment }}</p>
      </FindMorePane>

      <!-- Bonus Content Sections -->
      <transition name="fade">
        <div v-if="showTeamStructure" class="bonus-content">
          <h3>{{ language === 'en' ? '🏗️ Our Team Structure' : '🏗️ Structura Echipei Noastre' }}</h3>
          <template v-if="language === 'en'">
            <p>Two teams, one mission. Technical builds robots. Marketing builds community.</p>
            <p>Engineers perfect performance. Outreach shares our story. Both essential for success.</p>
          </template>
          <template v-else>
            <p>Două echipe, o misiune. Echipa tehnică construiește roboți. Marketing construiește comunitate.</p>
            <p>Inginerii perfecționează performanța. Outreach-ul împărtășește povestea. Ambele esențiale.</p>
          </template>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showCollaborationStyle" class="bonus-content">
          <h3>{{ language === 'en' ? '🤝 How We Work Together' : '🤝 Cum Lucrăm Împreună' }}</h3>
          <template v-if="language === 'en'">
            <p>Active group chats 24/7. Ideas flow freely between technical and creative minds.</p>
            <p>Designers suggest robot features. Programmers help with marketing. Fluid collaboration = best innovations.</p>
          </template>
          <template v-else>
            <p>Chat-uri active 24/7. Ideile circulă liber între mințile tehnice și creative.</p>
            <p>Designerii sugerează funcții pentru robot. Programatorii ajută la marketing. Colaborare fluidă = cele mai bune inovații.</p>
          </template>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showRecruitment" class="bonus-content">
          <h3>{{ language === 'en' ? '🎯 Joining Mechabyte' : '🎯 Alăturarea la Mechabyte' }}</h3>
          <template v-if="language === 'en'">
            <p>📅 Recruitment: Start of academic year at Paradise College</p>
            <p>✨ Requirements: Passion + dedication + willingness to learn (no prior experience needed!)</p>
            <p>🔄 Process: 2-week orientation rotating through all departments</p>
            <p>💡 We believe: Every student can contribute meaningfully, regardless of background</p>
          </template>
          <template v-else>
            <p>📅 Recrutare: Începutul anului academic la Paradise College</p>
            <p>✨ Cerințe: Pasiune + dedicare + dorința de a învăța (fără experiență necesară!)</p>
            <p>🔄 Proces: Orientare 2 săptămâni prin toate departamentele</p>
            <p>💡 Credem: Fiecare student poate contribui, indiferent de experiență</p>
          </template>
        </div>
      </transition>
    </section>

    <!-- Season Navigation -->
    <SeasonTabs v-model:activeSeason="activeSeason" />

    <!-- 2025-2026 Season - Current Team -->
    <div v-if="activeSeason === '2025-2026'" class="season-content">
      <section class="content-section">
        <!-- Mentors & Collaborators - Moved to top -->
        <div class="team-section">
          <h2>{{ language === 'en' ? 'Mentors & Collaborators' : 'Mentori & Colaboratori' }}</h2>
          <p class="team-description">{{ t.mentorsDesc2025 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in currentMentors" 
              :key="`mentor-${index}`"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
            <TeamMemberCard 
              v-for="(member, index) in currentCollaborators" 
              :key="`collab-${index}`"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>

        <div class="team-section">
          <h2>{{ t.technicalTeamTitle }}</h2>
          <p class="team-description">{{ t.technicalTeamDesc2025 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in currentTechnicalMembers" 
              :key="index"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>
        
        <div class="team-section">
          <h2>{{ t.nonTechnicalTeamTitle }}</h2>
          <p class="team-description">{{ t.nonTechnicalTeamDesc2025 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in currentNonTechnicalMembers" 
              :key="index"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>

        <div class="cta-buttons">
          <MicroButton 
            :label="language === 'en' ? 'Training Program' : 'Program de Instruire'" 
            variant="secondary"
            @click="toggleSection('training')"
          />
          <MicroButton 
            :label="language === 'en' ? 'Daily Team Life' : 'Viața Zilnică a Echipei'" 
            @click="toggleSection('dailyLife')"
          />
        </div>

        <transition name="fade">
          <div v-if="showTraining" class="bonus-content">
            <h3>{{ language === 'en' ? '📚 Learning & Development' : '📚 Învățare și Dezvoltare' }}</h3>
            <template v-if="language === 'en'">
              <p>💻 Java programming + CAD software + Hardware assembly</p>
              <p>👥 Senior members mentor through pair programming & design reviews</p>
              <p>🏢 Field trips to tech companies = career inspiration</p>
            </template>
            <template v-else>
              <p>💻 Programare Java + Software CAD + Asamblare hardware</p>
              <p>👥 Membrii seniori îndrumă prin programare în perechi & revizuiri de design</p>
              <p>🏢 Excursii la companii tech = inspirație pentru carieră</p>
            </template>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="showDailyLife" class="bonus-content">
            <h3>{{ language === 'en' ? '⚡ A Day in the Life' : '⚡ O Zi din Viață' }}</h3>
            <template v-if="language === 'en'">
              <p>🕐 Team standup → Share progress & challenges</p>
              <p>💻 Split by focus: Programmers debug, CAD iterates, Marketing creates</p>
              <p>⚡ Testing = Electric energy. Code comes alive on robot!</p>
              <p>🎉 Celebrate EVERYTHING: Successful autonomous run → Sponsorship pitch done</p>
              <p>Intense. Challenging. Incredibly rewarding. Welcome to tech life. 🚀</p>
            </template>
            <template v-else>
              <p>🕐 Standup echipă → Împărtășim progres & provocări</p>
              <p>💻 Împărțire pe focus: Programatori corectează, CAD iterează, Marketing creează</p>
              <p>⚡ Testare = Energie electrică. Codul prinde viață pe robot!</p>
              <p>🎉 Sărbătorim TOT: Rulare autonomă reușită → Prezentare sponsorizare gata</p>
              <p>Intens. Provocator. Incredibil de satisfăcător. Bine ai venit în viața tech. 🚀</p>
            </template>
          </div>
        </transition>
      </section>
    </div>

    <!-- 2024-2025 Season (Into the Deep) -->
    <div v-if="activeSeason === '2024-2025'" class="season-content">
      <section class="content-section">
        <!-- Mentors - Moved to top -->
        <div class="team-section">
          <h2>{{ t.mentorsTitle }}</h2>
          <p class="team-description">{{ t.mentorsDesc2024 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in mentors" 
              :key="index"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>

        <div class="team-section">
          <h2>{{ t.technicalTeamTitle }}</h2>
          <p class="team-description">{{ t.technicalTeamDesc2024 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in technicalMembers" 
              :key="index"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>
        
        <div class="team-section">
          <h2>{{ t.nonTechnicalTeamTitle }}</h2>
          <p class="team-description">{{ t.nonTechnicalTeamDesc2024 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in nonTechnicalMembers" 
              :key="index"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>

        <div class="cta-buttons">
          <MicroButton 
            :label="language === 'en' ? 'Training Program' : 'Program de Instruire'" 
            variant="secondary"
            @click="toggleSection('training')"
          />
          <MicroButton 
            :label="language === 'en' ? 'Daily Team Life' : 'Viața Zilnică a Echipei'" 
            @click="toggleSection('dailyLife')"
          />
        </div>

        <transition name="fade">
          <div v-if="showTraining" class="bonus-content">
            <h3>{{ language === 'en' ? '📚 Learning & Development' : '📚 Învățare și Dezvoltare' }}</h3>
            <template v-if="language === 'en'">
              <p>💻 Java programming + CAD software + Hardware assembly</p>
              <p>👥 Senior members mentor through pair programming & design reviews</p>
              <p>🏢 Field trips to tech companies = career inspiration</p>
            </template>
            <template v-else>
              <p>💻 Programare Java + Software CAD + Asamblare hardware</p>
              <p>👥 Membrii seniori îndrumă prin programare în perechi & revizuiri de design</p>
              <p>🏢 Excursii la companii tech = inspirație pentru carieră</p>
            </template>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="showDailyLife" class="bonus-content">
            <h3>{{ language === 'en' ? '⚡ A Day in the Life' : '⚡ O Zi din Viață' }}</h3>
            <template v-if="language === 'en'">
              <p>🕐 Team standup → Share progress & challenges</p>
              <p>💻 Split by focus: Programmers debug, CAD iterates, Marketing creates</p>
              <p>⚡ Testing = Electric energy. Code comes alive on robot!</p>
              <p>🎉 Celebrate EVERYTHING: Successful autonomous run → Sponsorship pitch done</p>
              <p>Intense. Challenging. Incredibly rewarding. Welcome to tech life. 🚀</p>
            </template>
            <template v-else>
              <p>🕐 Standup echipă → Împărtășim progres & provocări</p>
              <p>💻 Împărțire pe focus: Programatori corectează, CAD iterează, Marketing creează</p>
              <p>⚡ Testare = Energie electrică. Codul prinde viață pe robot!</p>
              <p>🎉 Sărbătorim TOT: Rulare autonomă reușită → Prezentare sponsorizare gata</p>
              <p>Intens. Provocator. Incredibil de satisfăcător. Bine ai venit în viața tech. 🚀</p>
            </template>
          </div>
        </transition>
      </section>
    </div>

    <!-- 2023-2024 Season (CenterStage) -->
    <div v-if="activeSeason === '2023-2024'" class="season-content">
      <section class="content-section">
        <!-- Mentors - Moved to top -->
        <div class="team-section">
          <h2>{{ t.mentorsTitle }}</h2>
          <p class="team-description">{{ t.mentorsDesc2023 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in previousMentors" 
              :key="`prev-mentor-${index}`"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>

        <div class="team-section">
          <h2>{{ t.technicalTeamTitle }}</h2>
          <p class="team-description">{{ t.technicalTeamDesc2023 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in previousTechnicalMembers" 
              :key="`prev-tech-${index}`"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>
        
        <div class="team-section">
          <h2>{{ t.nonTechnicalTeamTitle }}</h2>
          <p class="team-description">{{ t.nonTechnicalTeamDesc2023 }}</p>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in previousNonTechnicalMembers" 
              :key="`prev-nontech-${index}`"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>
        
        <!-- Alumni Section -->
        <div class="team-section">
          <h2>{{ t.alumniTitle }}</h2>
          <div class="members-grid">
            <TeamMemberCard 
              v-for="(member, index) in alumniMembers" 
              :key="`alumni-${index}`"
              :member-name="member.name"
              :department="member.department"
              :role="member.role"
              @click="handleMemberClick(member.name)"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- Team Member Popup -->
    <TeamMemberPopup
      :show="showMemberPopup"
      :member="selectedMember"
      @close="showMemberPopup = false"
    />
  </div>
</template>

<style scoped>
.team-page {
  width: 100%;
  min-height: 100vh;
  background: var(--background-grey);
  color: white;
}

.header-section {
  text-align: center;
  padding: 4vw 2vw 2vw;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto 4vw;
  padding: 0 2vw;
}

h1 {
  color: var(--mechabyte-green);
  width: 100%;
}

h2 {
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
  font-size: 2.2vw;
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.season-content {
  width: 100%;
}

.role-progression-note {
  background: var(--dark-grey);
  padding: 1rem;
  border-left: 3px solid var(--mechabyte-green);
  margin-bottom: 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.role-progression-note p {
  font-size: 0.9rem;
  font-style: italic;
}

.team-section {
  width: 100%;
  margin-bottom: 3vw;
}

.team-description {
  color: #ccc;
  font-size: 1vw;
  line-height: 1.6;
  margin-bottom: 1.5vw;
  font-style: italic;
}

.members-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2vw;
  width: 100%;
  margin-top: 1vw;
}

.cta-buttons {
  display: flex;
  gap: 1vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
  flex-wrap: wrap;
}

.bonus-content {
  background: rgba(0, 0, 0, 0.3);
  border: 0.15vw solid rgba(0, 255, 0, 0.2);
  border-radius: 0.5vw;
  padding: 2vw;
  margin: 1vw 0 2vw;
  width: 100%;
}

.bonus-content h3 {
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
  font-size: clamp(16px, 1.6vw, 22px);
}

.bonus-content p {
  line-height: 1.6;
  margin-bottom: 0.5vw;
  font-size: 1vw;
  color: #ddd;
}

/* Fade transition for bonus content */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media only screen and (max-width: 1000px) {
  .header-section {
    padding: 30px 20px 20px;
  }

  .content-section {
    width: 90vw;
    padding: 0 20px;
  }

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .team-section {
    margin-bottom: 30px;
  }

  .team-description {
    font-size: 14px;
    margin-bottom: 15px;
  }

  .members-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }

  .cta-buttons {
    gap: 15px;
  }

  .bonus-content {
    padding: 20px;
    border: 2px solid rgba(0, 255, 0, 0.2);
    border-radius: 8px;
    margin: 15px 0 20px;
  }

  .bonus-content h3 {
    font-size: 18px;
  }

  .bonus-content p {
    font-size: 15px;
  }
}
</style>
