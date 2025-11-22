<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue';
import { translations } from '../i18n/translations';
import MicroButton from '../components/MicroButton.vue';
import FindMorePane from '../components/FindMorePane.vue';
import SectionHeader from '../components/SectionHeader.vue';
import '../styles/components/ScannerBeam.css';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

// State for FindMorePane
const showValueOrigins = ref(false);
const showRealExamples = ref(false);
const showImpact = ref(false);
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
  // Initialize visibility for all cards
  const valuesList = t.value.valuesList || [];
  valuesList.forEach((_: any, index: number) => {
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
  <div class="values-page">
    <section class="content-section">
      <SectionHeader 
        :title="t.valuesTitle"
        :subtitle="t.valuesIntro"
      />
      
      <div class="cta-buttons">
        <MicroButton 
          :label="language === 'en' ? 'Find out more' : 'Află mai multe'" 
          @click="showValueOrigins = true"
        />
        <MicroButton 
          :label="language === 'en' ? 'Real Examples' : 'Exemple Reale'" 
          variant="secondary"
          @click="showRealExamples = true"
        />
        <MicroButton 
          :label="language === 'en' ? 'Our Impact' : 'Impactul Nostru'" 
          @click="showImpact = true"
        />
      </div>

      <!-- FindMorePane modals -->
      <FindMorePane 
        :show="showValueOrigins"
        :title="language === 'en' ? '🌟 Where Our Values Come From' : '🌟 De Unde Vin Valorile Noastre'"
        @close="showValueOrigins = false"
      >
        <template v-if="language === 'en'">
          <p>Our values evolved from team experiences, not boardroom decisions.</p>
          <p>Innovation: Best solutions came from questioning assumptions.</p>
          <p>Teamwork: Collaboration multiplied our capabilities.</p>
          <p>Integrity: We once restarted a match rather than accept an unfair win.</p>
        </template>
        <template v-else>
          <p>Valorile noastre au evoluat din experiențe, nu din decizii de birou.</p>
          <p>Inovație: Cele mai bune soluții au venit din punerea la îndoială a presupunerilor.</p>
          <p>Muncă în echipă: Colaborarea ne-a multiplicat capacitățile.</p>
          <p>Integritate: Am reluat odată un meci în loc să acceptăm o victorie neloială.</p>
        </template>
      </FindMorePane>

      <FindMorePane 
        :show="showRealExamples"
        :title="language === 'en' ? '💡 Values in Action' : '💡 Valori în Acțiune'"
        @close="showRealExamples = false"
      >
        <template v-if="language === 'en'">
          <p><strong>Excellence:</strong> Rebuilt robot 2 days before competition.</p>
          <p><strong>Community:</strong> Saturday teaching robotics to elementary students.</p>
          <p><strong>Learning:</strong> Switched frameworks mid-season for better tech.</p>
        </template>
        <template v-else>
          <p><strong>Excelență:</strong> Robot reconstruit cu 2 zile înainte de competiție.</p>
          <p><strong>Comunitate:</strong> Sâmbăta predând robotică la elevi.</p>
          <p><strong>Învățare:</strong> Framework schimbat la mijlocul sezonului pentru tehnologie mai bună.</p>
        </template>
      </FindMorePane>

      <FindMorePane 
        :show="showImpact"
        :title="language === 'en' ? '🎯 Making a Difference' : '🎯 Făcând o Diferență'"
        @close="showImpact = false"
      >
        <p v-if="language === 'en'">
          • Established 1 robotics club → 30+ students<br>
          • Open-sourced code → Downloaded in 15 countries<br>
          • Earned Gracious Professionalism award → Built sponsor trust
        </p>
        <p v-else>
          • Înființat 1 club de robotică → 30+ elevi<br>
          • Cod open-source → Descărcat în 15 țări<br>
          • Premiu Gracious Professionalism → Încredere construită cu sponsorii
        </p>
      </FindMorePane>
      
      <div class="values-grid">
        <div 
          v-for="(value, index) in t.valuesList" 
          :key="index" 
          :ref="(el) => setCardRef(el, index)"
          :data-card-id="index"
          :class="['value-card', 'scanner', { 'scanner--sweep': cardSweep[index] }]"
        >
          <h2>{{ value.title }}</h2>
          <p>{{ value.description }}</p>
        </div>
      </div>
      
      <div class="ambassador-section value-card">
        <h3>🎯 {{ t.ambassadorRoleTitle }}</h3>
        <p class="ambassador-text">{{ t.ambassadorStatement }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.values-page {
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
}

.intro-text,
.closing-text {
  line-height: 1.6;
  margin-bottom: 1vw;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2vw;
  width: 100%;
}

.value-card {
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  background: var(--dark-grey);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.value-card p {
  line-height: 1.6;
}

.ambassador-section {
  width: 100%;
  margin-top: 1vw;
}

.ambassador-section h3 {
  color: var(--mechabyte-green);
  font-size: clamp(18px, 1.8vw, 24px);
  margin-bottom: 0.5vw;
}

.ambassador-text {
  line-height: 1.6;
  font-style: italic;
  color: var(--light-grey);
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

  .values-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .value-card {
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
