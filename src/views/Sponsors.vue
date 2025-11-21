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
    descriptionEn: 'Our home institution and primary sponsor. Paradis International College shares our commitment to excellence in education, innovation, and developing future leaders. Their support provides us with facilities, resources, and the foundation to pursue our robotics goals.',
    descriptionRo: 'Instituția noastră gazdă și sponsor principal. Paradis International College împărțește angajamentul nostru față de excelența în educație, inovație și dezvoltarea liderilor viitori. Susținerea lor ne oferă facilități, resurse și fundația pentru a ne urmări obiectivele în robotică.',
    isPrimary: true
  },
  {
    name: 'BRD',
    logo: new URL('../assets/images/sponsors/brd.png', import.meta.url).href,
    descriptionEn: 'BRD - Groupe Société Générale supports innovation and education in Romania. Their values of responsibility, commitment, and team spirit align perfectly with Mechabyte\'s mission to inspire young innovators and promote STEM education in our community.',
    descriptionRo: 'BRD - Groupe Société Générale susține inovația și educația în România. Valorile lor de responsabilitate, angajament și spirit de echipă se aliniază perfect cu misiunea Mechabyte de a inspira tineri inovatori și de a promova educația STEM în comunitatea noastră.'
  },
  {
    name: 'First Tech Challenge',
    logo: new URL('../assets/images/sponsors/ftc.jpg', import.meta.url).href,
    descriptionEn: 'FIRST Tech Challenge is the global robotics competition that brings our team together. FTC shares our values of gracious professionalism, innovation, and teamwork, providing the framework for our growth and development in robotics.',
    descriptionRo: 'FIRST Tech Challenge este competiția globală de robotică care ne reunește echipa. FTC împărtășește valorile noastre de profesionalism grațios, inovație și muncă în echipă, oferind cadrul pentru creșterea și dezvoltarea noastră în robotică.'
  },
  {
    name: 'Nație prin Educație',
    logo: new URL('../assets/images/sponsors/natie prin educatie.png', import.meta.url).href,
    descriptionEn: 'Nație prin Educație is a movement dedicated to transforming Romania through quality education. Their vision of empowering youth through learning resonates with Mechabyte\'s commitment to STEM education and community outreach.',
    descriptionRo: 'Nație prin Educație este o mișcare dedicată transformării României prin educație de calitate. Viziunea lor de a împuternici tinerii prin învățare rezonează cu angajamentul Mechabyte față de educația STEM și implicarea comunitară.'
  },
  {
    name: 'Professional Dentist',
    logo: new URL('../assets/images/sponsors/professionalDentist.jpg', import.meta.url).href,
    descriptionEn: 'Professional Dentist supports our team with their commitment to excellence and precision. Just as they focus on meticulous care in dental health, we apply the same attention to detail in our robot design and engineering processes.',
    descriptionRo: 'Professional Dentist sprijină echipa noastră cu angajamentul lor față de excelență și precizie. Așa cum ei se concentrează pe îngrijirea meticuloasă a sănătății dentare, noi aplicăm aceeași atenție la detalii în designul robotului și procesele de inginerie.'
  },
  {
    name: 'SAM Ideas',
    logo: new URL('../assets/images/sponsors/SAM ideas.jpg', import.meta.url).href,
    descriptionEn: 'SAM Ideas champions innovation and creative problem-solving. Their support helps us push boundaries in robotics design and encourages us to think outside the box, perfectly aligning with our value of continuous innovation.',
    descriptionRo: 'SAM Ideas promovează inovația și rezolvarea creativă a problemelor. Susținerea lor ne ajută să împingem limitele în designul roboticii și ne încurajează să gândim în afara cutiei, aliniate perfect cu valoarea noastră de inovație continuă.'
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
      
      <div class="cta-section">
        <h2>{{ t.becomeSponsorTitle }}</h2>
        <p>{{ t.becomeSponsorText }}</p>
        <RouterLink to="/contact" class="cta-button">
          {{ props.language === 'en' ? 'Contact Us' : 'Contactați-ne' }}
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
