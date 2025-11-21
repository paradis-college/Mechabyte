<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue';
import { translations } from '../i18n/translations';
import SponsorCard from '../components/SponsorCard.vue';
import '../styles/components/ScannerBeam.css';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const t = computed(() => translations[props.language]);

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
    descriptionEn: 'Our home institution and primary sponsor, providing facilities, resources, and the foundation to pursue our robotics goals.',
    descriptionRo: 'Instituția noastră gazdă și sponsor principal, oferind facilități, resurse și fundația pentru a ne urmări obiectivele în robotică.',
    isPrimary: true
  },
  {
    name: 'BRD',
    logo: new URL('../assets/images/sponsors/brd.png', import.meta.url).href,
    descriptionEn: 'BRD supports innovation and education in Romania, aligning with our mission to inspire young innovators.',
    descriptionRo: 'BRD susține inovația și educația în România, aliniate cu misiunea noastră de a inspira tineri inovatori.'
  },
  {
    name: 'First Tech Challenge',
    logo: new URL('../assets/images/sponsors/ftc.jpg', import.meta.url).href,
    descriptionEn: 'The global robotics competition that brings our team together and provides the framework for our growth.',
    descriptionRo: 'Competiția globală de robotică care ne reunește echipa și oferă cadrul pentru creșterea noastră.'
  },
  {
    name: 'Nație prin Educație',
    logo: new URL('../assets/images/sponsors/natie prin educatie.png', import.meta.url).href,
    descriptionEn: 'A movement dedicated to transforming Romania through quality education and youth empowerment.',
    descriptionRo: 'O mișcare dedicată transformării României prin educație de calitate și împuternicirea tinerilor.'
  },
  {
    name: 'Professional Dentist',
    logo: new URL('../assets/images/sponsors/professionalDentist.jpg', import.meta.url).href,
    descriptionEn: 'Supports our team with commitment to excellence and precision in everything we build.',
    descriptionRo: 'Sprijină echipa noastră cu angajament față de excelență și precizie în tot ce construim.'
  },
  {
    name: 'SAM Ideas',
    logo: new URL('../assets/images/sponsors/SAM ideas.jpg', import.meta.url).href,
    descriptionEn: 'SAM Ideas champions innovation and creative problem-solving. Their support helps us push boundaries in robotics design and encourages us to think outside the box.',
    descriptionRo: 'SAM Ideas promovează inovația și rezolvarea creativă a problemelor. Susținerea lor ne ajută să împingem limitele în designul roboticii și ne încurajează să gândim în afara cutiei.'
  },
  {
    name: 'Pulse',
    logo: new URL('../assets/images/sponsors/pulse.jpeg', import.meta.url).href,
    descriptionEn: 'Pulse supports emerging tech talent and innovation initiatives. Their partnership helps us access cutting-edge resources and connect with industry professionals.',
    descriptionRo: 'Pulse susține talentele tehnologice emergente și inițiativele de inovație. Parteneriatul lor ne ajută să accesăm resurse de ultimă generație și să ne conectăm cu profesioniști din industrie.'
  },
  {
    name: 'TrustTeam',
    logo: new URL('../assets/images/sponsors/trustteam.jpeg', import.meta.url).href,
    descriptionEn: 'TrustTeam believes in empowering youth through technology and teamwork. Their support strengthens our collaborative culture and technical capabilities.',
    descriptionRo: 'TrustTeam crede în împuternicirea tinerilor prin tehnologie și lucru în echipă. Susținerea lor întărește cultura noastră de colaborare și capacitățile tehnice.'
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
      
      <!-- Sustainability Section -->
      <div class="sustainability-section">
        <h2>{{ t.sustainabilityGrowthLabel }}</h2>
        <p>{{ t.sustainabilityGrowthText }}</p>
      </div>
      
      <div class="cta-section">
        <h2>{{ t.becomeSponsorTitle }}</h2>
        <p>{{ t.becomeSponsorText }}</p>
        <RouterLink to="/contact" class="cta-button">
          {{ t.contactUsLabel }}
        </RouterLink>
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
