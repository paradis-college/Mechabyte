<script setup lang="ts">
import { computed, ref } from 'vue';
import { translations } from '../i18n/translations';
import MicroButton from '../components/MicroButton.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

// State for toggling bonus content visibility
const showTeamHistory = ref(false);
const showRobotFacts = ref(false);
const showFtcDetails = ref(false);
const showCompetitionTips = ref(false);
const showBehindScenes = ref(false);

const toggleSection = (section: string) => {
  switch(section) {
    case 'teamHistory':
      showTeamHistory.value = !showTeamHistory.value;
      break;
    case 'robotFacts':
      showRobotFacts.value = !showRobotFacts.value;
      break;
    case 'ftcDetails':
      showFtcDetails.value = !showFtcDetails.value;
      break;
    case 'competitionTips':
      showCompetitionTips.value = !showCompetitionTips.value;
      break;
    case 'behindScenes':
      showBehindScenes.value = !showBehindScenes.value;
      break;
  }
};
</script>

<template>
  <div class="home-page">
    <img class="banner" alt="Mechabyte banner" src="/banner.png" />
    <img class="snapshot" src="../assets/images/RobotsSnapshot.jpg" alt="Mechabyte robot" />
    
    <section class="content-section">
      <h1>{{ t.homeTitle }}</h1>
      <p class="welcome-text">{{ t.homeWelcome }}</p>
      
      <div class="cta-buttons">
        <MicroButton 
          :label="language === 'en' ? 'Team History' : 'Istoria Echipei'" 
          @click="toggleSection('teamHistory')"
        />
        <MicroButton 
          :label="language === 'en' ? 'Robot Facts' : 'Fapte despre Robot'" 
          variant="secondary"
          @click="toggleSection('robotFacts')"
        />
        <MicroButton 
          :label="language === 'en' ? 'Behind the Scenes' : 'În Culise'" 
          @click="toggleSection('behindScenes')"
        />
      </div>

      <!-- Bonus Content Sections -->
      <transition name="fade">
        <div v-if="showTeamHistory" class="bonus-content">
          <h3>{{ language === 'en' ? '🤖 Our Journey Begins' : '🤖 Călătoria Noastră Începe' }}</h3>
          <p v-if="language === 'en'">
            Mechabyte was founded in 2024 by a group of passionate students who shared a dream: to bring world-class robotics education to Iași. 
            What started as weekly meetings in a small classroom has grown into a full-fledged competitive team with state-of-the-art equipment 
            and ambitious goals. Our founders believed that robotics could transform education, and we're proving them right every day!
          </p>
          <p v-else>
            Mechabyte a fost fondat în 2024 de un grup de studenți pasionați care au împărtășit un vis: să aducă educație robotică de clasă mondială la Iași.
            Ceea ce a început ca întâlniri săptămânale într-o sală de clasă mică a crescut într-o echipă competitivă completă, cu echipamente de ultimă generație
            și obiective ambițioase. Fondatorii noștri au crezut că robotica ar putea transforma educația, și noi îi dovedim că au dreptate în fiecare zi!
          </p>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showRobotFacts" class="bonus-content">
          <h3>{{ language === 'en' ? '⚙️ Cool Robot Facts' : '⚙️ Fapte Interesante despre Robot' }}</h3>
          <ul>
            <li v-if="language === 'en'">Our robot can lift objects up to 5kg with precision accuracy</li>
            <li v-else>Robotul nostru poate ridica obiecte până la 5kg cu precizie exactă</li>
            
            <li v-if="language === 'en'">It's controlled by custom code written entirely by our programming team</li>
            <li v-else>Este controlat de cod personalizat scris în întregime de echipa noastră de programare</li>
            
            <li v-if="language === 'en'">The robot uses computer vision to identify and track game elements</li>
            <li v-else>Robotul folosește viziune computerizată pentru a identifica și urmări elementele jocului</li>
            
            <li v-if="language === 'en'">We've gone through 50+ design iterations to perfect our mechanism</li>
            <li v-else>Am trecut prin peste 50 de iterații de design pentru a perfecționa mecanismul nostru</li>
          </ul>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showBehindScenes" class="bonus-content">
          <h3>{{ language === 'en' ? '🎬 Behind the Scenes' : '🎬 În Culise' }}</h3>
          <p v-if="language === 'en'">
            Ever wondered what happens during our build sessions? Our team meets 4 times a week for intense 3-hour sessions. 
            There's always music playing, pizza on Fridays, and the constant hum of 3D printers working overtime. 
            We've learned that the best ideas come at 9 PM, and duct tape really does fix everything (temporarily)!
          </p>
          <p v-else>
            V-ați întrebat vreodată ce se întâmplă în timpul sesiunilor noastre de construcție? Echipa noastră se întâlnește de 4 ori pe săptămână pentru sesiuni intense de 3 ore.
            Întotdeauna este muzică, pizza vinerea, și zumzetul constant al imprimantelor 3D care lucrează peste program.
            Am învățat că cele mai bune idei vin la ora 21:00, și că banda adezivă chiar repară totul (temporar)!
          </p>
        </div>
      </transition>
      
      <h2 id="about-section">{{ t.aboutTitle }}</h2>
      <p class="about-text">{{ t.aboutText }}</p>
      
      <h2 id="mission-section">{{ t.missionTitle }}</h2>
      <ul class="mission-list">
        <li v-for="(item, index) in t.missionItems" :key="index">{{ item }}</li>
      </ul>
      
      <h2>{{ t.ftcTitle }}</h2>
      <p class="ftc-description">{{ t.ftcDescription }}</p>

      <div class="cta-buttons">
        <MicroButton 
          :label="language === 'en' ? 'Competition Tips' : 'Sfaturi pentru Competiție'" 
          variant="secondary"
          @click="toggleSection('competitionTips')"
        />
        <MicroButton 
          :label="language === 'en' ? 'FTC Details' : 'Detalii FTC'" 
          @click="toggleSection('ftcDetails')"
        />
      </div>

      <transition name="fade">
        <div v-if="showFtcDetails" class="bonus-content">
          <h3>{{ language === 'en' ? '🏆 FTC Competition Format' : '🏆 Formatul Competiției FTC' }}</h3>
          <p v-if="language === 'en'">
            Each FTC match lasts 2 minutes and 30 seconds, divided into an Autonomous period (30 seconds) 
            where the robot operates independently, and a Driver-Controlled period (2 minutes) where our drivers take the wheel.
            Teams compete in alliances of two, requiring not just technical skill but also strategic partnerships and communication.
            Scoring is complex, with bonus points for speed, accuracy, and endgame challenges!
          </p>
          <p v-else>
            Fiecare meci FTC durează 2 minute și 30 de secunde, împărțit într-o perioadă Autonomă (30 de secunde)
            în care robotul operează independent, și o perioadă Controlată de Șoferi (2 minute) când șoferii noștri preiau controlul.
            Echipele concurează în alianțe de doi, necesitând nu doar abilități tehnice, ci și parteneriate strategice și comunicare.
            Punctajul este complex, cu puncte bonus pentru viteză, acuratețe și provocări de final de joc!
          </p>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showCompetitionTips" class="bonus-content">
          <h3>{{ language === 'en' ? '💡 Insider Competition Tips' : '💡 Sfaturi Interne pentru Competiție' }}</h3>
          <ul>
            <li v-if="language === 'en'">Always bring backup parts - Murphy's Law loves robotics competitions!</li>
            <li v-else>Aduceți întotdeauna piese de rezervă - Legea lui Murphy adoră competițiile de robotică!</li>
            
            <li v-if="language === 'en'">Practice your autonomous routine until you can run it blindfolded</li>
            <li v-else>Exersați rutina autonomă până când o puteți rula cu ochii închiși</li>
            
            <li v-if="language === 'en'">Good driver communication is worth more than a perfect robot</li>
            <li v-else>Comunicarea bună a șoferului valorează mai mult decât un robot perfect</li>
            
            <li v-if="language === 'en'">Document everything in your engineering notebook - judges love details!</li>
            <li v-else>Documentați totul în caietul vostru de inginerie - jurații iubesc detaliile!</li>
          </ul>
        </div>
      </transition>
      
      <h2>{{ t.activitiesTitle }}</h2>
      <ul class="activities-list">
        <li v-for="(activity, index) in t.activities" :key="index">
          <strong>{{ activity.name }}:</strong> {{ activity.description }}
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5vw;
}

.banner {
  width: 15vw;
  height: 10vw;
  margin-top: 1vw;
}

.snapshot {
  height: 37.5vw;
  width: auto;
  max-width: 100%;
}

.content-section {
  display: flex;
  width: clamp(68.75vw, 1200px, 90vw);
  padding: 2vw;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  margin-bottom: 2vw;
}

h1 {
  color: var(--mechabyte-green);
  width: 100%;
}

h2 {
  color: var(--mechabyte-green);
  margin-top: 1.5vw;
  margin-bottom: 0.5vw;
}

.welcome-text {
  font-size: clamp(14px, 1.8vw, 24px);
  font-weight: 600;
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.about-text,
.ftc-description {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.mission-list,
.activities-list {
  margin-left: 2vw;
  line-height: 1.8;
  list-style-type: disc;
}

.mission-list li,
.activities-list li {
  margin-bottom: 0.5vw;
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

.bonus-content ul {
  margin-left: 2vw;
  line-height: 1.8;
  list-style-type: disc;
}

.bonus-content li {
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
  .banner {
    width: 40vw;
    height: 26vw;
  }

  .snapshot {
    height: auto;
    width: 90vw;
  }

  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .cta-buttons {
    gap: 15px;
  }

  .bonus-content {
    padding: 15px;
  }
}
</style>
