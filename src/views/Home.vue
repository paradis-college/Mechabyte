<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { translations } from '../i18n/translations';
import GearConveyor from '../components/GearConveyor.vue';
import HeroRobotArm from '../components/HeroRobotArm.vue';
import MicroButton from '../components/MicroButton.vue';
import FeatureCards from '../components/FeatureCards.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const router = useRouter();
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
    <!-- Decorative gear background with circuit board traces - positioned behind content -->
    <!-- To enable parallax, change to: <GearConveyor :enable-parallax="true" /> -->
    <GearConveyor />
    
    <!-- Hero section with robot arm -->
    <div class="hero-section">
      <img class="banner" alt="Mechabyte banner" src="/banner.png" />
    </div>
    
    <!-- Image with overlaid robot arm -->
    <div class="robot-showcase">
      <img class="snapshot" src="../assets/images/RobotsSnapshot.jpg" alt="Mechabyte robot" />
      <HeroRobotArm :size="300" class="hero-robot-overlay" />
    </div>
    
    <!-- Feature Cards Section -->
    <FeatureCards :language="language" />
    
    <section class="content-section">
      <h1>{{ t.homeTitle }}</h1>
      
      <!-- Revealed welcome text -->
      <p 
        class="welcome-text reveal"
      >
        {{ t.homeWelcome }}
      </p>
      
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
          <template v-if="language === 'en'">
            <p>Mechabyte was founded in 2024 by passionate students with a shared dream: world-class robotics education in Iași.</p>
            <p>From weekly classroom meetings to a full competitive team with state-of-the-art equipment. We're proving that robotics transforms education.</p>
          </template>
          <template v-else>
            <p>Mechabyte a fost fondat în 2024 de studenți pasionați cu un vis comun: educație robotică de clasă mondială la Iași.</p>
            <p>De la întâlniri săptămânale în clasă la o echipă competitivă completă cu echipamente de ultimă generație. Dovedim că robotica transformă educația.</p>
          </template>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showRobotFacts" class="bonus-content">
          <h3>{{ language === 'en' ? '⚙️ Cool Robot Facts' : '⚙️ Fapte Interesante despre Robot' }}</h3>
          <ul>
            <li v-if="language === 'en'">Lifts 5kg objects with precision</li>
            <li v-else>Ridică obiecte de 5kg cu precizie</li>
            
            <li v-if="language === 'en'">Custom-coded by our team</li>
            <li v-else>Programat custom de echipa noastră</li>
            
            <li v-if="language === 'en'">Computer vision tracking</li>
            <li v-else>Urmărire prin viziune computerizată</li>
            
            <li v-if="language === 'en'">50+ design iterations</li>
            <li v-else>50+ iterații de design</li>
          </ul>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="showBehindScenes" class="bonus-content">
          <h3>{{ language === 'en' ? '🎬 Behind the Scenes' : '🎬 În Culise' }}</h3>
          <template v-if="language === 'en'">
            <p>Our team meets 4 times weekly for 3-hour build sessions.</p>
            <p>There's always music playing, Friday pizza, and 3D printers humming non-stop.</p>
            <p>Best ideas come at 9 PM. Duct tape fixes everything (temporarily!). ✨</p>
          </template>
          <template v-else>
            <p>Echipa se întâlnește de 4 ori pe săptămână pentru sesiuni de 3 ore.</p>
            <p>Mereu este muzică, pizza vinerea, și imprimante 3D în acțiune non-stop.</p>
            <p>Cele mai bune idei vin la 21:00. Banda adezivă repară totul (temporar!). ✨</p>
          </template>
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
      
      <!-- CTA Button with micro-interactions -->
      <div class="cta-section">
        <MicroButton 
          :label="t.contactCta"
          @click="router.push('/contact')"
        >
        </MicroButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5vw;
}

.banner,
.snapshot,
.content-section {
  position: relative;
  z-index: 1;
}

.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
}

.banner {
  width: 15vw;
  height: 10vw;
}

.robot-showcase {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2vw;
}

.snapshot {
  height: 37.5vw;
  width: auto;
  max-width: 100%;
  display: block;
}

.hero-robot-overlay {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: auto;
  z-index: 10;
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

.cta-section {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2vw;
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

  .hero-robot-overlay {
    top: 5%;
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
