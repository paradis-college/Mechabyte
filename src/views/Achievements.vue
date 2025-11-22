<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue';
import { translations } from '../i18n/translations';
import SectionHeader from '../components/SectionHeader.vue';
import FindMorePane from '../components/FindMorePane.vue';
import MicroButton from '../components/MicroButton.vue';
import '../styles/components/ScannerBeam.css';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

// Reverse the achievements list to show most recent first
const achievementsList = computed(() => {
  const list = t.value.achievementsList || [];
  return [...list].reverse();
});

// State for FindMorePane
const showFirstRobotDetails = ref(false);
const showTeamFormationDetails = ref(false);
const showRegionalCompDetails = ref(false);
const showTechDevDetails = ref(false);
const showSTEMWorkshopsDetails = ref(false);
const showCommunityOutreachDetails = ref(false);

// Scanner beam effect
const cardVisibility = ref<Record<number, boolean>>({});
const cardSweep = ref<Record<number, boolean>>({});
const cardRefs = ref<Record<number, HTMLElement>>({});

const SCANNER_SWEEP_DURATION_MS = 1500;
let observer: IntersectionObserver | null = null;

const setCardRef = (el: Element | ComponentPublicInstance | null, id: number) => {
  if (el && 'nodeType' in el) {
    cardRefs.value[id] = el as HTMLElement;
  }
};

onMounted(() => {
  // Initialize visibility for all achievements
  achievementsList.value.forEach((_: any, index: number) => {
    cardVisibility.value[index] = false;
    cardSweep.value[index] = false;
  });

  nextTick(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
          if (entry.isIntersecting && !cardVisibility.value[cardId]) {
            cardVisibility.value[cardId] = true;
            cardSweep.value[cardId] = true;
            
            setTimeout(() => {
              cardSweep.value[cardId] = false;
            }, SCANNER_SWEEP_DURATION_MS);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px',
      }
    );

    Object.values(cardRefs.value).forEach((el) => {
      if (el && observer) {
        observer.observe(el);
      }
    });
  });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div class="achievements-page">
    <section class="content-section">
      <SectionHeader 
        :title="t.achievementsTitle"
        :subtitle="t.achievementsIntro"
      />
      
      <div class="timeline">
        <div v-for="(achievement, index) in achievementsList" :key="index" class="timeline-item">
          <div class="timeline-marker"></div>
          <div 
            :ref="(el) => setCardRef(el, index)"
            :data-card-id="index"
            :class="['timeline-content', 'scanner', { 'scanner--sweep': cardSweep[index] }]"
          >
            <div class="year-badge">{{ achievement.year }}</div>
            <h2>{{ achievement.title }}</h2>
            <p>{{ achievement.description }}</p>
            <MicroButton 
              v-if="achievement.title === 'Team Formation' || achievement.title === 'Formarea Echipei'"
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showTeamFormationDetails = true"
              class="modal-btn"
            />
            <MicroButton 
              v-if="achievement.title === 'First Robot Build' || achievement.title === 'Prima Construcție de Robot'"
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showFirstRobotDetails = true"
              class="modal-btn"
            />
            <MicroButton 
              v-if="achievement.title === 'FTC Regional Competition' || achievement.title === 'Competiția Regională FTC'"
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showRegionalCompDetails = true"
              class="modal-btn"
            />
            <MicroButton 
              v-if="achievement.title === 'Technical Development' || achievement.title === 'Dezvoltare Tehnică'"
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showTechDevDetails = true"
              class="modal-btn"
            />
            <MicroButton 
              v-if="achievement.title === 'STEM Workshops' || achievement.title === 'Workshop-uri STEM'"
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showSTEMWorkshopsDetails = true"
              class="modal-btn"
            />
            <MicroButton 
              v-if="achievement.title === 'Community Outreach Begins' || achievement.title === 'Începutul Outreach-ului Comunitar'"
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showCommunityOutreachDetails = true"
              class="modal-btn"
            />
          </div>
        </div>
      </div>

      <!-- FindMorePane for First Robot Build details -->
      <FindMorePane 
        :show="showFirstRobotDetails"
        :title="language === 'en' ? '🤖 Our First Robot Build' : '🤖 Prima Noastră Construcție de Robot'"
        @close="showFirstRobotDetails = false"
      >
        <div v-if="language === 'en'">
          <p>Building our first competitive robot was an incredible learning experience. We started with basic concepts and iterated through multiple prototypes before finalizing our design.</p>
          <h4 class="modal-heading">Key Features:</h4>
          <ul class="modal-list">
            <li>Custom-designed intake mechanism</li>
            <li>Autonomous navigation system</li>
            <li>Precision control software</li>
            <li>Modular design for easy repairs</li>
          </ul>
          <p class="modal-text">This experience taught us the importance of testing, iteration, and teamwork in robotics engineering.</p>
        </div>
        <div v-else>
          <p>Construirea primului nostru robot competitiv a fost o experiență incredibilă de învățare. Am început cu concepte de bază și am iterat prin multiple prototipuri înainte de a finaliza designul.</p>
          <h4 class="modal-heading">Caracteristici Cheie:</h4>
          <ul class="modal-list">
            <li>Mecanism de intrare proiectat personalizat</li>
            <li>Sistem de navigare autonomă</li>
            <li>Software de control de precizie</li>
            <li>Design modular pentru reparații ușoare</li>
          </ul>
          <p class="modal-text">Această experiență ne-a învățat importanța testării, iterației și muncii în echipă în ingineria roboticii.</p>
        </div>
      </FindMorePane>

      <!-- FindMorePane for Team Formation -->
      <FindMorePane 
        :show="showTeamFormationDetails"
        :title="language === 'en' ? '🎯 Team Formation Story' : '🎯 Povestea Formării Echipei'"
        @close="showTeamFormationDetails = false"
      >
        <template v-if="language === 'en'">
          <p>Mechabyte was born from a shared passion for robotics and innovation at Paradise International College.</p>
          <p>Founded by students who wanted to bring world-class robotics education to Iași, Romania.</p>
          <p>Our founding principle: Make STEM accessible, competitive, and fun for everyone.</p>
        </template>
        <template v-else>
          <p>Mechabyte s-a născut dintr-o pasiune comună pentru robotică și inovație la Paradise International College.</p>
          <p>Fondată de studenți care au dorit să aducă educație robotică de clasă mondială la Iași, România.</p>
          <p>Principiul nostru fondator: Faceți STEM accesibil, competitiv și distractiv pentru toată lumea.</p>
        </template>
      </FindMorePane>

      <!-- FindMorePane for Regional Competition -->
      <FindMorePane 
        :show="showRegionalCompDetails"
        :title="language === 'en' ? '🏆 FTC Regional Competition' : '🏆 Competiția Regională FTC'"
        @close="showRegionalCompDetails = false"
      >
        <template v-if="language === 'en'">
          <p>Our first major competition tested everything we built and learned.</p>
          <p><strong>Challenges faced:</strong> Technical issues, time pressure, fierce competition</p>
          <p><strong>Lessons learned:</strong> Resilience, quick problem-solving, gracious professionalism</p>
          <p>Result: Experience that shaped our team's competitive spirit and technical excellence.</p>
        </template>
        <template v-else>
          <p>Prima noastră competiție majoră a testat tot ce am construit și învățat.</p>
          <p><strong>Provocări întâmpinate:</strong> Probleme tehnice, presiune de timp, competiție acerbă</p>
          <p><strong>Lecții învățate:</strong> Reziliență, rezolvare rapidă a problemelor, profesionalism grațios</p>
          <p>Rezultat: Experiență care a modelat spiritul competitiv și excelența tehnică a echipei.</p>
        </template>
      </FindMorePane>

      <!-- FindMorePane for Technical Development -->
      <FindMorePane 
        :show="showTechDevDetails"
        :title="language === 'en' ? '⚙️ Technical Development Journey' : '⚙️ Călătoria Dezvoltării Tehnice'"
        @close="showTechDevDetails = false"
      >
        <template v-if="language === 'en'">
          <p>Continuous improvement through coding, CAD design, and hardware engineering.</p>
          <p>✓ Advanced autonomous programming<br>✓ Precision mechanical systems<br>✓ Sensor integration<br>✓ Control algorithms</p>
          <p>Each iteration made us stronger, smarter, faster.</p>
        </template>
        <template v-else>
          <p>Îmbunătățire continuă prin codare, design CAD și inginerie hardware.</p>
          <p>✓ Programare autonomă avansată<br>✓ Sisteme mecanice de precizie<br>✓ Integrare senzori<br>✓ Algoritmi de control</p>
          <p>Fiecare iterație ne-a făcut mai puternici, mai deștepți, mai rapizi.</p>
        </template>
      </FindMorePane>

      <!-- STEM Workshops Details -->
      <FindMorePane 
        :show="showSTEMWorkshopsDetails"
        :title="language === 'en' ? '🔬 STEM Workshops' : '🔬 Workshop-uri STEM'"
        @close="showSTEMWorkshopsDetails = false"
      >
        <template v-if="language === 'en'">
          <p>Teaching the next generation of engineers through hands-on robotics.</p>
          <p>✓ Weekly sessions with 30+ students<br>✓ Hands-on robot building exercises<br>✓ Programming fundamentals<br>✓ Problem-solving challenges</p>
          <p>Inspiring curiosity and technical skills one workshop at a time.</p>
        </template>
        <template v-else>
          <p>Predând următoarea generație de ingineri prin robotică practică.</p>
          <p>✓ Sesiuni săptămânale cu 30+ elevi<br>✓ Exerciții practice de construcție roboți<br>✓ Fundamente de programare<br>✓ Provocări de rezolvare probleme</p>
          <p>Inspirând curiozitate și abilități tehnice câte un workshop o dată.</p>
        </template>
      </FindMorePane>

      <!-- Community Outreach Details -->
      <FindMorePane 
        :show="showCommunityOutreachDetails"
        :title="language === 'en' ? '🤝 Community Outreach' : '🤝 Outreach Comunitar'"
        @close="showCommunityOutreachDetails = false"
      >
        <template v-if="language === 'en'">
          <p>Bringing STEM education to local schools and communities.</p>
          <p>✓ Interactive robot demonstrations<br>✓ Partnership with 5+ local schools<br>✓ Free educational materials<br>✓ Mentorship for aspiring engineers</p>
          <p>Making robotics accessible to everyone in our community.</p>
        </template>
        <template v-else>
          <p>Aducând educația STEM în școli și comunități locale.</p>
          <p>✓ Demonstrații interactive cu roboți<br>✓ Parteneriat cu 5+ școli locale<br>✓ Materiale educaționale gratuite<br>✓ Mentorat pentru ingineri aspiranți</p>
          <p>Făcând robotica accesibilă pentru toată lumea din comunitatea noastră.</p>
        </template>
      </FindMorePane>
    </section>
  </div>
</template>

<style scoped>
.achievements-page {
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
  margin-bottom: 0.5vw;
  font-size: clamp(18px, 1.5vw, 28px);
}

.intro-text {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.timeline {
  width: 100%;
  position: relative;
  padding-left: 3vw;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.8vw;
  top: 0;
  bottom: 0;
  width: 0.2vw;
  background: var(--mechabyte-green);
}

.timeline-item {
  position: relative;
  margin-bottom: 2vw;
  padding-left: 2vw;
}

.timeline-marker {
  position: absolute;
  left: -2.5vw;
  top: 0.5vw;
  width: 1vw;
  height: 1vw;
  background: var(--mechabyte-green);
  border-radius: 50%;
  border: 0.2vw solid var(--background-grey);
  box-shadow: 0 0 10px var(--mechabyte-green);
}

.timeline-content {
  background: var(--dark-grey);
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

/* Styles for modal content */
.modal-btn {
  margin-top: 1rem;
}

.modal-heading {
  color: var(--mechabyte-green);
  margin-top: 1rem;
}

.modal-list {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

.modal-text {
  margin-top: 1rem;
}

.year-badge {
  display: inline-block;
  background: var(--mechabyte-green);
  color: var(--background-grey);
  padding: 0.3vw 0.8vw;
  border-radius: 0.3vw;
  font-weight: bold;
  font-size: clamp(12px, 1vw, 16px);
  margin-bottom: 0.5vw;
}

.timeline-content p {
  line-height: 1.6;
  margin-top: 0.5vw;
}

@media only screen and (max-width: 1000px) {
  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .timeline {
    padding-left: 40px;
  }

  .timeline::before {
    left: 10px;
  }

  .timeline-marker {
    left: -30px;
    top: 5px;
    width: 15px;
    height: 15px;
  }

  .timeline-item {
    padding-left: 20px;
    margin-bottom: 25px;
  }

  .timeline-content {
    padding: 15px;
  }

  .year-badge {
    padding: 5px 10px;
    font-size: 14px;
  }
}
</style>
