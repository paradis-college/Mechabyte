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
        <p v-if="language === 'en'">
          Our core values weren't decided in a single meeting - they evolved organically from our team's experiences. Innovation emerged as a value when 
          we realized our best solutions came from questioning assumptions. Teamwork became central after seeing how collaboration multiplied our 
          capabilities. Integrity was solidified when we chose to restart a competition match rather than accept a win from an opponent's technical failure. 
          Each value represents lessons learned and principles tested in real situations.
        </p>
        <p v-else>
          Valorile noastre fundamentale nu au fost decise într-o singură întâlnire - au evoluat organic din experiențele echipei. Inovația a apărut ca valoare când
          am realizat că cele mai bune soluții ale noastre veneau din punerea la îndoială a presupunerilor. Munca în echipă a devenit centrală după ce am văzut cum colaborarea ne-a multiplicat
          capacitățile. Integritatea a fost consolidată când am ales să reluăm un meci de competiție în loc să acceptăm o victorie din cauza unei defecțiuni tehnice a adversarului.
          Fiecare valoare reprezintă lecții învățate și principii testate în situații reale.
        </p>
      </FindMorePane>

      <FindMorePane 
        :show="showRealExamples"
        :title="language === 'en' ? '💡 Values in Action' : '💡 Valori în Acțiune'"
        @close="showRealExamples = false"
      >
        <p v-if="language === 'en'">
          When faced with a critical design flaw two days before competition, our value of Excellence pushed us to rebuild rather than compromise. 
          Community manifested when we spent a Saturday teaching robotics to elementary students instead of practicing. Learning was demonstrated when 
          our entire programming team switched to a new framework mid-season because it was the right technical decision. These aren't abstract principles - 
          they're daily choices that shape who we are as a team.
        </p>
        <p v-else>
          Când ne-am confruntat cu o defecțiune critică de design cu două zile înainte de competiție, valoarea Excelenței ne-a împins să reconstruim în loc să compromitem.
          Comunitatea s-a manifestat când am petrecut o sâmbătă predând robotică la elevi de școală primară în loc să ne antrenăm. Învățarea a fost demonstrată când
          întreaga noastră echipă de programare a trecut la un nou framework la mijlocul sezonului pentru că a fost decizia tehnică corectă. Acestea nu sunt principii abstracte -
          sunt alegeri zilnice care modelează cine suntem ca echipă.
        </p>
      </FindMorePane>

      <FindMorePane 
        :show="showImpact"
        :title="language === 'en' ? '🎯 Making a Difference' : '🎯 Făcând o Diferență'"
        @close="showImpact = false"
      >
        <p v-if="language === 'en'">
          Living our values has created ripple effects beyond competition results. Our commitment to Community led to establishing a robotics club 
          at a local middle school, now serving 30+ students. Innovation drove us to open-source our robot code, which has been downloaded by teams 
          from 15 countries. Integrity earned us the FIRST Gracious Professionalism award, but more importantly, it built trust with sponsors and 
          partners who continue supporting our program year after year.
        </p>
        <p v-else>
          Trăirea valorilor noastre a creat efecte în lanț dincolo de rezultatele competiției. Angajamentul nostru față de Comunitate a dus la înființarea unui club de robotică
          la o școală generală locală, care deservește acum peste 30 de elevi. Inovația ne-a determinat să facem open-source codul robotului nostru, care a fost descărcat de echipe
          din 15 țări. Integritatea ne-a adus premiul FIRST Gracious Professionalism, dar mai important, a construit încredere cu sponsorii și
          partenerii care continuă să ne sprijine programul an de an.
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
      
      <div class="ambassador-section">
        <h3>{{ t.ambassadorRoleTitle }}</h3>
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
  padding: 1.5vw;
  border: 0.1vw solid var(--mechabyte-green);
  background: var(--mechabyte-grey);
  border-radius: 0.5vw;
  margin-top: 1vw;
}

.ambassador-text {
  line-height: 1.6;
  font-style: italic;
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
