<script setup lang="ts">
import { computed, ref } from 'vue';
import { translations } from '../i18n/translations';
import TeamMemberCard from '../components/TeamMemberCard.vue';
import MicroButton from '../components/MicroButton.vue';
import SectionHeader from '../components/SectionHeader.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

// State for toggling bonus content visibility
const showTeamStructure = ref(false);
const showCollaborationStyle = ref(false);
const showRecruitment = ref(false);
const showTraining = ref(false);
const showDailyLife = ref(false);

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
  { name: "Bobu Dragos", department: "Collaborator", role: "Collaborator", season: "2025-2026" },
  { name: "Andreea Ioniță", department: "Mentor", role: "Team Mentor", season: "2025-2026" },
  { name: "Tudor Tocila", department: "Mentor", role: "Mentor", season: "2025-2026" },
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
    <section class="content-section">
      <SectionHeader 
        :title="t.teamTitle"
        :subtitle="t.teamIntro"
      />
      
      <div class="role-progression-note" style="background: var(--dark-grey); padding: 1rem; border-left: 3px solid var(--mechabyte-green); margin-bottom: 2rem;">
        <p v-if="language === 'en'" style="font-size: 0.9rem; font-style: italic;">
          <strong>Role Progression:</strong> Team members advance through Junior (1st year) → Senior (2nd year) → Team Leader (3rd year) as they gain experience.
        </p>
        <p v-else style="font-size: 0.9rem; font-style: italic;">
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
      </div>

      <!-- Bonus Content Sections -->
      <transition name="fade">
        <div v-if="showTeamStructure" class="bonus-content">
          <h3>{{ language === 'en' ? '🏗️ Our Team Structure' : '🏗️ Structura Echipei Noastre' }}</h3>
          <p v-if="language === 'en'">
            Mechabyte operates with two parallel teams working in synergy. Our Technical Team focuses on programming, hardware development, and CAD design, 
            with 9 dedicated members who bring the robot to life. The Non-Technical Team, with 6 members, handles marketing, design, and community outreach. 
            This dual structure ensures that while our engineers perfect the robot's performance, our outreach team shares our story with the community 
            and builds partnerships that sustain our program. Our mentor Andreea Ioniță provides guidance and ensures both teams work cohesively toward our common goals.
          </p>
          <p v-else>
            Mechabyte operează cu două echipe paralele care lucrează în sinergie. Echipa Tehnică se concentrează pe programare, dezvoltare hardware și design CAD,
            cu 9 membri dedicați care dau viață robotului. Echipa Non-Tehnică, cu 6 membri, se ocupă de marketing, design și outreach comunitar.
            Această structură duală asigură că în timp ce inginerii noștri perfecționează performanța robotului, echipa de outreach împărtășește povestea noastră cu comunitatea
            și construiește parteneriate care susțin programul nostru. Mentorul nostru Andreea Ioniță oferă îndrumare și asigură că ambele echipe lucrează coeziv către obiectivele noastre comune.
          </p>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showCollaborationStyle" class="bonus-content">
          <h3>{{ language === 'en' ? '🤝 How We Work Together' : '🤝 Cum Lucrăm Împreună' }}</h3>
          <p v-if="language === 'en'">
            {{ t.teamCollaboration }} Beyond formal meetings, we maintain active group chats where ideas flow 24/7. 
            Technical and non-technical members regularly cross-pollinate ideas - a designer might suggest a robot feature, 
            or a programmer might contribute to marketing materials. This fluid collaboration has led to some of our best innovations.
          </p>
          <p v-else>
            {{ t.teamCollaboration }} Dincolo de întâlnirile formale, menținem chat-uri de grup active unde ideile circulă 24/7.
            Membrii tehnici și non-tehnici își schimbă regulat idei - un designer poate sugera o funcționalitate a robotului,
            sau un programator poate contribui la materialele de marketing. Această colaborare fluidă a dus la unele dintre cele mai bune inovații ale noastre.
          </p>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showRecruitment" class="bonus-content">
          <h3>{{ language === 'en' ? '🎯 Joining Mechabyte' : '🎯 Alăturarea la Mechabyte' }}</h3>
          <p v-if="language === 'en'">
            We recruit new members at the start of each academic year through open information sessions at Paradise International College. 
            No prior robotics experience is required - we look for passion, dedication, and willingness to learn. New members start with a 
            2-week orientation where they rotate through all departments to find their best fit. We value diverse perspectives and believe 
            that every student, regardless of their background, can contribute meaningfully to our team's success.
          </p>
          <p v-else>
            Recrutăm membri noi la începutul fiecărui an academic prin sesiuni de informare deschise la Paradise International College.
            Nu este necesară experiență anterioară în robotică - căutăm pasiune, dedicare și dorința de a învăța. Membrii noi încep cu o
            orientare de 2 săptămâni în care rotesc prin toate departamentele pentru a-și găsi cea mai bună potrivire. Prețuim perspectivele diverse și credem
            că fiecare student, indiferent de experiența sa, poate contribui semnificativ la succesul echipei noastre.
          </p>
        </div>
      </transition>
      
      <!-- 2025-2026 Season - Current Team -->
      <h2 class="season-header" style="color: var(--mechabyte-green); margin-top: 3rem;">
        {{ language === 'en' ? '2025-2026 Season' : 'Sezonul 2025-2026' }}
      </h2>
      
      <div class="team-section">
        <h2>{{ t.technicalTeamTitle }}</h2>
        <div class="members-grid">
          <TeamMemberCard 
            v-for="(member, index) in currentTechnicalMembers" 
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
            v-for="(member, index) in currentNonTechnicalMembers" 
            :key="index"
            :member-name="member.name"
            :department="member.department"
            :role="member.role"
          />
        </div>
      </div>
      
      <div class="team-section" v-if="currentCollaborators.length > 0">
        <h2>{{ language === 'en' ? 'Collaborators' : 'Colaboratori' }}</h2>
        <div class="members-grid">
          <TeamMemberCard 
            v-for="(member, index) in currentCollaborators" 
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
            v-for="(member, index) in currentMentors" 
            :key="index"
            :member-name="member.name"
            :department="member.department"
            :role="member.role"
          />
        </div>
      </div>

      <!-- 2024-2025 Season (Previous) -->
      <h2 class="season-header" style="margin-top: 3rem;">{{ t.intoTheDeepSeason }}</h2>
      
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
          <p v-if="language === 'en'">
            {{ t.teamTraining }} We've developed a comprehensive curriculum including Java programming workshops, CAD software training sessions,
            and hands-on hardware assembly tutorials. Senior members mentor newer teammates through pair programming and design reviews. 
            We also organize field trips to tech companies and universities to expose our members to career possibilities in STEM fields.
          </p>
          <p v-else>
            {{ t.teamTraining }} Am dezvoltat un curriculum cuprinzător incluzând workshop-uri de programare Java, sesiuni de instruire pentru software CAD,
            și tutoriale practice de asamblare hardware. Membrii seniori îndrumă colegii mai noi prin programare în perechi și revizuiri de design.
            De asemenea, organizăm excursii la companii tech și universități pentru a expune membrii noștri la posibilități de carieră în domeniile STEM.
          </p>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showDailyLife" class="bonus-content">
          <h3>{{ language === 'en' ? '⚡ A Day in the Life' : '⚡ O Zi din Viață' }}</h3>
          <p v-if="language === 'en'">
            {{ t.teamEnvironment }} A typical practice session starts with a team standup where everyone shares their progress and challenges. 
            Then teams split into their focus areas - programmers debugging code, CAD designers iterating on mechanisms, and marketing creating content. 
            The energy is electric during testing sessions when we see code come to life on the robot. We celebrate every small victory, from a successful 
            autonomous run to completing a sponsorship presentation. It's intense, challenging, and incredibly rewarding.
          </p>
          <p v-else>
            {{ t.teamEnvironment }} O sesiune tipică de antrenament începe cu un standup de echipă unde toată lumea își împărtășește progresul și provocările.
            Apoi echipele se împart pe domeniile lor de focus - programatori care corectează cod, designeri CAD care iterează pe mecanisme și marketing care creează conținut.
            Energia este electrică în timpul sesiunilor de testare când vedem codul luând viață pe robot. Celebrăm fiecare mică victorie, de la o
            rulare autonomă reușită până la finalizarea unei prezentări de sponsorizare. Este intens, provocator și incredibil de satisfăcător.
          </p>
        </div>
      </transition>
      
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

.cta-buttons {
  display: flex;
  gap: 1vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
  flex-wrap: wrap;
}

.bonus-content {
  background: var(--dark-grey);
  border: 0.15vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  padding: 1.5vw;
  margin: 1vw 0;
  width: 100%;
}

.bonus-content h3 {
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
  font-size: clamp(16px, 1.5vw, 22px);
}

.bonus-content p {
  line-height: 1.6;
  margin-bottom: 0.5vw;
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

  .cta-buttons {
    gap: 15px;
  }

  .bonus-content {
    padding: 15px;
  }
}
</style>
