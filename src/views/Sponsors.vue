<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue';
import { useRouter } from 'vue-router';
import { translations } from '../i18n/translations';
import SponsorCard from '../components/SponsorCard.vue';
import MicroButton from '../components/MicroButton.vue';
import FindMorePane from '../components/FindMorePane.vue';
import '../styles/components/ScannerBeam.css';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const router = useRouter();
const t = computed(() => translations[props.language]);

// State for sustainability popup
const showSustainability = ref(false);

// Sponsor data with images and descriptions
type Sponsor = {
  name: string;
  logo: string;
  descriptionEn: string;
  descriptionRo: string;
  isPrimary?: boolean;
};

const sponsors = ref<Sponsor[]>([
  {
    name: 'Paradis International College',
    logo: new URL('../assets/images/sponsors/paradis college.jpg', import.meta.url).href,
    descriptionEn: 'Institutional excellence starts with solid foundations.',
    descriptionRo: 'Excelența instituțională începe cu fundații solide.',
    isPrimary: true
  },
  {
    name: 'BRD',
    logo: new URL('../assets/images/sponsors/brd.png', import.meta.url).href,
    descriptionEn: 'Financial responsibility powers sustainable innovation.',
    descriptionRo: 'Responsabilitatea financiară alimentează inovația durabilă.'
  },
  {
    name: 'First Tech Challenge',
    logo: new URL('../assets/images/sponsors/ftc.jpg', import.meta.url).href,
    descriptionEn: 'Gracious professionalism in competition and life.',
    descriptionRo: 'Profesionalism grațios în competiție și viață.'
  },
  {
    name: 'Nație prin Educație',
    logo: new URL('../assets/images/sponsors/natie prin educatie.png', import.meta.url).href,
    descriptionEn: 'Education transforms nations, one student at a time.',
    descriptionRo: 'Educația transformă națiuni, câte un student.'
  },
  {
    name: 'Professional Dentist',
    logo: new URL('../assets/images/sponsors/professionalDentist.jpg', import.meta.url).href,
    descriptionEn: 'Precision and attention to detail matter everywhere.',
    descriptionRo: 'Precizia și atenția la detalii contează peste tot.'
  },
  {
    name: 'SAM Ideas',
    logo: new URL('../assets/images/sponsors/SAM ideas.jpg', import.meta.url).href,
    descriptionEn: 'Think outside the box, build beyond boundaries.',
    descriptionRo: 'Gândește în afara cutiei, construiește dincolo de limite.'
  },
  {
    name: 'Pulse',
    logo: new URL('../assets/images/sponsors/pulse.jpeg', import.meta.url).href,
    descriptionEn: 'Industry connections accelerate tech growth.',
    descriptionRo: 'Conexiunile din industrie accelerează creșterea tehnologică.'
  },
  {
    name: 'TrustTeam',
    logo: new URL('../assets/images/sponsors/trustteam.jpeg', import.meta.url).href,
    descriptionEn: 'Teamwork + technology = unstoppable force.',
    descriptionRo: 'Muncă în echipă + tehnologie = forță de neoprit.'
  }
]);

// Scanner beam effect for point cards
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
  // Initialize visibility for point cards
  const whySponsorPoints = t.value.whySponsorPoints || [];
  whySponsorPoints.forEach((_: any, index: number) => {
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
  <div class="sponsors-page">
    <section class="content-section">
      <h1>{{ t.sponsorsTitle }}</h1>
      <p class="intro-text">{{ t.sponsorsIntro }}</p>
      
      <div class="sponsors-section">
        <h2>{{ t.currentSponsorsTitle }}</h2>
        <div class="sponsors-grid">
          <SponsorCard 
            v-for="(sponsor, index) in sponsors" 
            :key="index"
            :name="sponsor.name"
            :logo="sponsor.logo"
            :description="props.language === 'en' ? sponsor.descriptionEn : sponsor.descriptionRo"
            :is-primary="sponsor.isPrimary || false"
          />
        </div>
      </div>
      
      <div class="impact-section">
        <h2>{{ t.sponsorshipImpactTitle }}</h2>
        <ul class="impact-list">
          <li v-for="(impact, index) in t.sponsorshipImpact" :key="index">
            {{ impact }}
          </li>
        </ul>
      </div>
      
      <div class="why-sponsor-section">
        <h2>{{ t.whySponsorTitle }}</h2>
        <div class="points-grid">
          <div 
            v-for="(point, index) in t.whySponsorPoints" 
            :key="index" 
            :ref="(el) => setCardRef(el, index)"
            :data-card-id="index"
            :class="['point-card', 'scanner', { 'scanner--sweep': cardSweep[index] }]"
          >
            <div class="point-number">{{ index + 1 }}</div>
            <p>{{ point }}</p>
          </div>
        </div>
      </div>
      <!-- Sustainability Button -->
      <div class="sustainability-section">
        <MicroButton 
          :label="t.sustainabilityGrowthLabel"
          variant="secondary"
          @click="showSustainability = true"
        />
      </div>

      <!-- Sustainability Popup -->
      <FindMorePane 
        :show="showSustainability"
        :title="t.sustainabilityGrowthLabel"
        @close="showSustainability = false"
      >
        <p style="white-space: pre-line;">{{ t.sustainabilityGrowthText }}</p>
      </FindMorePane>
      
      <div class="cta-section">
        <h2>{{ t.becomeSponsorTitle }}</h2>
        <p>{{ t.becomeSponsorText }}</p>
        <MicroButton 
          :label="t.contactUsLabel"
          @click="router.push('/contact')"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.sponsors-page {
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

.sponsors-section {
  width: 100%;
  margin-bottom: 2vw;
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2vw;
  width: 100%;
  margin-top: 1vw;
}

.impact-section {
  width: 100%;
}

.impact-list {
  list-style: none;
  padding: 0;
  margin-top: 1vw;
}

.impact-list li {
  padding: 1vw;
  margin-bottom: 0.5vw;
  border-left: 0.3vw solid var(--mechabyte-green);
  background: var(--dark-grey);
  line-height: 1.6;
}

.why-sponsor-section {
  width: 100%;
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5vw;
  margin-top: 1vw;
}

.point-card {
  display: flex;
  gap: 1vw;
  padding: 1.5vw;
  background: var(--dark-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.point-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
}

.point-number {
  flex-shrink: 0;
  width: 2.5vw;
  height: 2.5vw;
  background: var(--mechabyte-green);
  color: var(--background-grey);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: clamp(14px, 1.2vw, 20px);
}

.point-card p {
  line-height: 1.6;
}

.sustainability-section {
  width: 100%;
  padding: 1.5vw;
  background: var(--dark-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  margin-bottom: 2vw;
}

.sustainability-section p {
  line-height: 1.7;
  margin-top: 0.5vw;
}

.cta-section {
  width: 100%;
  padding: 2vw;
  background: var(--mechabyte-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  text-align: center;
}

.cta-section p {
  line-height: 1.6;
  margin-bottom: 1.5vw;
}

.cta-button {
  display: inline-block;
  padding: 1vw 2vw;
  background: var(--mechabyte-green);
  color: var(--background-grey);
  text-decoration: none;
  font-weight: bold;
  font-size: clamp(14px, 1.2vw, 20px);
  border-radius: 0.5vw;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: var(--light-grey);
  transform: scale(1.05);
}

@media only screen and (max-width: 1000px) {
  .content-section {
    width: 90vw;
    padding: 20px;
  }

  .sponsors-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .points-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .point-number {
    width: 35px;
    height: 35px;
    font-size: 16px;
  }

  .point-card {
    padding: 15px;
  }

  .sustainability-section {
    padding: 15px;
    margin-bottom: 20px;
  }

  .sponsors-notice,
  .cta-section {
    padding: 15px;
  }

  .cta-button {
    padding: 12px 24px;
    font-size: 16px;
  }
}
</style>
