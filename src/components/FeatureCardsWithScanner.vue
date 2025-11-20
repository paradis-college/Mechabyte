<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, type ComponentPublicInstance } from 'vue';
import AnimatedSVGIcon from './AnimatedSVGIcon.vue';
import '../styles/components/ScannerBeam.css';

interface FeatureCard {
  id: number;
  icon: 'sensor' | 'bolt' | 'circuit' | 'chip';
  title: string;
  description: string;
}

const cards: FeatureCard[] = [
  {
    id: 1,
    icon: 'sensor',
    title: 'Advanced Sensors',
    description: 'Precision sensors for real-time environmental analysis and autonomous navigation.',
  },
  {
    id: 2,
    icon: 'bolt',
    title: 'High-Performance Power',
    description: 'Optimized power systems delivering maximum efficiency for extended operation.',
  },
  {
    id: 3,
    icon: 'circuit',
    title: 'Smart Circuitry',
    description: 'Intelligent circuit design enabling rapid processing and decision-making.',
  },
  {
    id: 4,
    icon: 'chip',
    title: 'Advanced Processing',
    description: 'Cutting-edge processors handling complex computations in real-time.',
  },
];

const cardVisibility = ref<Record<number, boolean>>({});
const cardSweep = ref<Record<number, boolean>>({});
const cardRefs = ref<Record<number, HTMLElement>>({});

// Animation duration constant matching CSS (1.5s)
const SCANNER_SWEEP_DURATION_MS = 1500;

let observer: IntersectionObserver | null = null;

const setCardRef = (el: Element | ComponentPublicInstance | null, id: number) => {
  if (el && 'nodeType' in el) {
    cardRefs.value[id] = el as HTMLElement;
  }
};

onMounted(() => {
  // Initialize visibility for all cards
  cards.forEach(card => {
    cardVisibility.value[card.id] = false;
    cardSweep.value[card.id] = false;
  });

  // Wait for next tick to ensure refs are populated after template rendering
  nextTick(() => {
    // Create intersection observer for scroll-based animations
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
          if (entry.isIntersecting && !cardVisibility.value[cardId]) {
            cardVisibility.value[cardId] = true;
            cardSweep.value[cardId] = true;
            
            // Remove sweep class after animation completes to allow re-trigger on hover
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

    // Observe all card elements
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
  <div class="feature-cards-container">
    <h2 class="section-title">Robot Features & Capabilities</h2>
    <div class="feature-cards-grid">
      <article
        v-for="card in cards"
        :key="card.id"
        :ref="(el) => setCardRef(el, card.id)"
        :data-card-id="card.id"
        :class="['feature-card', 'scanner', { 'scanner--sweep': cardSweep[card.id] }]"
        tabindex="0"
        role="article"
      >
        <div class="card-icon">
          <AnimatedSVGIcon
            :name="card.icon"
            :size="48"
            :animate-on-visible="true"
            :visible="cardVisibility[card.id]"
            class="feature-icon"
          />
        </div>
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-description">{{ card.description }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
.feature-cards-container {
  width: 100%;
  max-width: 1200px;
  margin: 3rem auto;
  padding: 2rem;
}

.section-title {
  color: var(--mechabyte-green);
  text-align: center;
  margin-bottom: 3rem;
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(24px, 4vw, 48px);
  font-weight: 600;
}

.feature-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
}

.feature-card {
  background: var(--dark-grey);
  border: 2px solid var(--mechabyte-grey);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.feature-card:hover,
.feature-card:focus {
  border-color: var(--mechabyte-green);
  box-shadow: 0 4px 20px rgba(0, 255, 0, 0.2);
  outline: none;
}

.card-icon {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon {
  color: var(--mechabyte-green);
  filter: drop-shadow(0 0 4px var(--mechabyte-green));
}

.card-title {
  color: var(--mechabyte-green);
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 600;
  margin-bottom: 1rem;
}

.card-description {
  color: var(--light-grey);
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .feature-cards-container {
    padding: 1rem;
  }
  
  .feature-cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
}

/* Accessibility: ensure focus is visible */
.feature-card:focus-visible {
  outline: 2px solid var(--mechabyte-green);
  outline-offset: 2px;
}
</style>
