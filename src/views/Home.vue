<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { translations } from '../i18n/translations';
import GearConveyor from '../components/GearConveyor.vue';
import HeroRobotArm from '../components/HeroRobotArm.vue';
import MicroButton from '../components/MicroButton.vue';
import FeatureCards from '../components/FeatureCards.vue';
import GlitchIcon from '../components/GlitchIcon.vue';

const props = defineProps<{
  language: 'en' | 'ro';
}>();

const router = useRouter();
const t = computed(() => translations[props.language]);

// Featured sponsors for preview
const featuredSponsors = [
  'Paradis International College',
  'Professional Dentist',
  'BRD'
];

// Navigation helpers
const navigateToPortfolio = () => router.push('/portfolio');
const navigateToOutreach = () => router.push('/outreach');
const navigateToSponsors = () => router.push('/sponsors');
const navigateToContact = () => router.push('/contact');
const navigateToTeam = () => router.push('/team');
</script>

<template>
  <div class="home-page">
    <!-- Decorative gear background -->
    <GearConveyor />
    
    <!-- Hero Section -->
    <div class="hero-section">
      <GlitchIcon image-src="/banner.png" :height="300" />
      <h1 class="hero-title">{{ t.homeTitle }}</h1>
      <p class="hero-subtitle">{{ t.homeWelcome }}</p>
    </div>
    
    <!-- Robot Showcase with overlaid robot arm -->
    <div class="robot-showcase">
      <img class="snapshot" src="../assets/images/RobotsSnapshot.jpg" alt="Mechabyte robot" />
      <HeroRobotArm :size="300" class="hero-robot-overlay" />
    </div>
    
    <!-- Feature Cards Section -->
    <FeatureCards :language="language" />
    
    <!-- Main Content Area -->
    <div class="content-wrapper">
      
      <!-- About & Mission Section -->
      <section class="intro-section content-card">
        <h2 class="section-title">{{ t.aboutTitle }}</h2>
        <p class="section-text">{{ t.aboutText }}</p>
        
        <div class="mission-box">
          <h3>{{ t.missionTitle }}</h3>
          <ul class="mission-list">
            <li v-for="(item, index) in t.missionItems" :key="index">{{ item }}</li>
          </ul>
        </div>

        <div class="cta-group">
          <MicroButton 
            :label="language === 'en' ? 'Meet the Team' : 'Cunoaște Echipa'"
            @click="navigateToTeam"
          />
          <MicroButton 
            :label="language === 'en' ? 'Contact Us' : 'Contactează-ne'"
            variant="secondary"
            @click="navigateToContact"
          />
        </div>
      </section>

      <!-- Portfolio Preview Section -->
      <section class="preview-section portfolio-preview content-card">
        <div class="preview-header">
          <h2 class="section-title">
            <span class="icon">🤖</span>
            {{ language === 'en' ? 'Our Robots & Competitions' : 'Roboții și Competițiile Noastre' }}
          </h2>
          <p class="preview-subtitle">
            {{ language === 'en' 
              ? 'Explore our robot designs, competition strategies, and technical evolution across FTC seasons' 
              : 'Explorează designurile roboților, strategiile de competiție și evoluția tehnică de-a lungul sezoanelor FTC' }}
          </p>
        </div>

        <div class="preview-grid">
          <div class="preview-card">
            <div class="preview-icon">⚙️</div>
            <h3>{{ language === 'en' ? 'Robot Evolution' : 'Evoluția Robotului' }}</h3>
            <p>{{ language === 'en'
              ? 'From initial prototypes to competition-ready machines. See how our designs evolved through 50+ iterations.' 
              : 'De la prototipuri inițiale la mașini gata de competiție. Vezi cum designurile noastre au evoluat prin 50+ iterații.' }}</p>
          </div>

          <div class="preview-card">
            <div class="preview-icon">🏆</div>
            <h3>{{ language === 'en' ? 'FTC Competitions' : 'Competiții FTC' }}</h3>
            <p>{{ language === 'en'
              ? 'CenterStage (2023-24) and Into the Deep (2024-25) seasons. Strategy, autonomous programming, and game-winning designs.'
              : 'Sezoanele CenterStage (2023-24) și Into the Deep (2024-25). Strategie, programare autonomă și design-uri câștigătoare.' }}</p>
          </div>

          <div class="preview-card">
            <div class="preview-icon">💻</div>
            <h3>{{ language === 'en' ? 'Technical Innovation' : 'Inovație Tehnică' }}</h3>
            <p>{{ language === 'en'
              ? 'Custom code, precision engineering, and innovative mechanisms. Computer vision, sensor integration, and autonomous navigation.'
              : 'Cod personalizat, inginerie de precizie și mecanisme inovatoare. Viziune computerizată, integrare senzori și navigare autonomă.' }}</p>
          </div>
        </div>

        <div class="preview-cta">
          <MicroButton 
            :label="language === 'en' ? 'Explore Full Portfolio →' : 'Explorează Portofoliul Complet →'"
            @click="navigateToPortfolio"
          />
        </div>
      </section>

      <!-- Outreach Preview Section -->
      <section class="preview-section outreach-preview content-card">
        <div class="preview-header">
          <h2 class="section-title">
            <span class="icon">🤝</span>
            {{ language === 'en' ? 'Community Impact & Outreach' : 'Impact Comunitar & Outreach' }}
          </h2>
          <p class="preview-subtitle">
            {{ language === 'en'
              ? 'Discover how we\'re bringing robotics education and STEM opportunities to our community'
              : 'Descoperă cum aducem educația în robotică și oportunități STEM în comunitatea noastră' }}
          </p>
        </div>

        <div class="preview-highlights">
          <div class="highlight-stat">
            <div class="stat-number">30+</div>
            <div class="stat-label">{{ language === 'en' ? 'Students Reached' : 'Studenți Atinși' }}</div>
          </div>
          <div class="highlight-stat">
            <div class="stat-number">5+</div>
            <div class="stat-label">{{ language === 'en' ? 'Community Events' : 'Evenimente Comunitare' }}</div>
          </div>
          <div class="highlight-stat">
            <div class="stat-number">2</div>
            <div class="stat-label">{{ language === 'en' ? 'FTC Seasons' : 'Sezoane FTC' }}</div>
          </div>
        </div>

        <div class="preview-grid">
          <div class="preview-card">
            <div class="preview-icon">🔬</div>
            <h3>{{ language === 'en' ? 'STEM Workshops' : 'Workshop-uri STEM' }}</h3>
            <p>{{ language === 'en'
              ? 'Hands-on robotics sessions teaching the next generation. Weekly workshops, coding fundamentals, and problem-solving challenges.'
              : 'Sesiuni practice de robotică care predau următoarea generație. Workshop-uri săptămânale, fundamente de programare și provocări de rezolvare a problemelor.' }}</p>
          </div>

          <div class="preview-card">
            <div class="preview-icon">🏫</div>
            <h3>{{ language === 'en' ? 'School Partnerships' : 'Parteneriate Școlare' }}</h3>
            <p>{{ language === 'en'
              ? 'Collaborating with local schools to make robotics accessible. Interactive demonstrations and mentorship programs.'
              : 'Colaborare cu școli locale pentru a face robotica accesibilă. Demonstrații interactive și programe de mentorat.' }}</p>
          </div>

          <div class="preview-card">
            <div class="preview-icon">🎉</div>
            <h3>{{ language === 'en' ? 'Fundraising Events' : 'Evenimente de Strângere de Fonduri' }}</h3>
            <p>{{ language === 'en'
              ? 'Creative community events supporting our mission. Bake sales, movie nights, and showcase events that bring people together.'
              : 'Evenimente comunitare creative care susțin misiunea noastră. Vânzări de prăjituri, seri de filme și evenimente showcase care aduc oamenii împreună.' }}</p>
          </div>
        </div>

        <div class="preview-cta">
          <MicroButton 
            :label="language === 'en' ? 'See All Outreach Activities →' : 'Vezi Toate Activitățile Outreach →'"
            @click="navigateToOutreach"
          />
        </div>
      </section>

      <!-- Sponsors Preview Section -->
      <section class="preview-section sponsors-preview content-card">
        <div class="preview-header">
          <h2 class="section-title">
            <span class="icon">💼</span>
            {{ language === 'en' ? 'Our Sponsors & Partners' : 'Sponsorii și Partenerii Noștri' }}
          </h2>
          <p class="preview-subtitle">
            {{ language === 'en'
              ? 'Meet the organizations making our robotics journey possible through their generous support'
              : 'Cunoaște organizațiile care fac posibilă călătoria noastră în robotică prin sprijinul lor generos' }}
          </p>
        </div>

        <div class="sponsors-showcase">
          <div class="sponsor-highlight">
            <h3>{{ language === 'en' ? 'Featured Partners' : 'Parteneri Principali' }}</h3>
            <div class="sponsor-logos">
              <div v-for="sponsor in featuredSponsors" :key="sponsor" class="sponsor-logo-item">{{ sponsor }}</div>
              <div class="sponsor-logo-item">{{ language === 'en' ? '& 5 more...' : '& încă 5...' }}</div>
            </div>
          </div>

          <div class="sponsor-impact">
            <h3>{{ language === 'en' ? 'What Sponsorship Enables' : 'Ce Permite Sponsorizarea' }}</h3>
            <ul class="impact-list">
              <li>{{ language === 'en' 
                ? '🔧 Advanced robotics equipment and tools' 
                : '🔧 Echipamente și unelte avansate de robotică' }}</li>
              <li>{{ language === 'en'
                ? '🎓 Competition registration and travel'
                : '🎓 Înregistrare la competiții și călătorii' }}</li>
              <li>{{ language === 'en'
                ? '💡 Innovation through cutting-edge technology'
                : '💡 Inovație prin tehnologie de ultimă generație' }}</li>
              <li>{{ language === 'en'
                ? '🌱 Growth of STEM education in our region'
                : '🌱 Creșterea educației STEM în regiunea noastră' }}</li>
            </ul>
          </div>
        </div>

        <div class="sponsor-cta-box">
          <h3>{{ language === 'en' ? 'Interested in Supporting Us?' : 'Interesat să ne Sprijini?' }}</h3>
          <p>{{ language === 'en'
            ? 'Partner with us to empower the next generation of engineers and innovators.'
            : 'Fii partenerul nostru pentru a împuternici următoarea generație de ingineri și inovatori.' }}</p>
          <div class="cta-group">
            <MicroButton 
              :label="language === 'en' ? 'View All Sponsors →' : 'Vezi Toți Sponsorii →'"
              @click="navigateToSponsors"
            />
            <MicroButton 
              :label="language === 'en' ? 'Become a Sponsor' : 'Devino Sponsor'"
              variant="secondary"
              @click="navigateToContact"
            />
          </div>
        </div>
      </section>

      <!-- FTC Info Section -->
      <section class="ftc-info content-card">
        <h2 class="section-title">{{ t.ftcTitle }}</h2>
        <p class="section-text">{{ t.ftcDescription }}</p>
        <div class="ftc-stats">
          <div class="ftc-stat">
            <span class="stat-icon">⏱️</span>
            <span class="stat-text">{{ language === 'en' ? '2:30 Match Duration' : '2:30 Durată Meci' }}</span>
          </div>
          <div class="ftc-stat">
            <span class="stat-icon">🤝</span>
            <span class="stat-text">{{ language === 'en' ? '2-Team Alliances' : 'Alianțe de 2 Echipe' }}</span>
          </div>
          <div class="ftc-stat">
            <span class="stat-icon">🌍</span>
            <span class="stat-text">{{ language === 'en' ? 'Global Competition' : 'Competiție Globală' }}</span>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="final-cta content-card">
        <h2>{{ language === 'en' ? 'Ready to Join the Journey?' : 'Gata să te Alături Călătoriei?' }}</h2>
        <p>{{ language === 'en'
          ? 'Whether you\'re a student, mentor, sponsor, or just curious about robotics - there\'s a place for you at Mechabyte.'
          : 'Fie că ești student, mentor, sponsor sau pur și simplu curios despre robotică - există un loc pentru tine la Mechabyte.' }}</p>
        <div class="cta-group">
          <MicroButton 
            :label="t.contactCta"
            @click="navigateToContact"
          />
        </div>
      </section>

    </div>
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

.snapshot,
.content-wrapper {
  position: relative;
  z-index: 1;
}

/* Hero Section */
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vw;
  margin-top: 1vw;
  margin-bottom: 2vw;
  text-align: center;
  padding: 0 2vw;
}

.hero-title {
  font-size: clamp(32px, 4vw, 64px);
  color: var(--mechabyte-green);
  font-weight: bold;
  margin: 0;
  text-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
}

.hero-subtitle {
  font-size: clamp(16px, 2vw, 28px);
  color: var(--light-grey);
  max-width: 800px;
  line-height: 1.5;
  margin: 0;
}

/* Robot Showcase */
.robot-showcase {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 3vw;
}

.snapshot {
  height: 37.5vw;
  width: auto;
  max-width: 100%;
  display: block;
  border-radius: 1vw;
  box-shadow: 0 10px 40px rgba(0, 255, 0, 0.2);
}

.hero-robot-overlay {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: auto;
  z-index: 10;
}

/* Content Wrapper */
.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  padding: 0 2vw;
  gap: 3vw;
  margin-bottom: 4vw;
}

/* Content Cards */
.content-card {
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  border: 0.15vw solid var(--mechabyte-green);
  border-radius: 1vw;
  padding: 3vw;
  box-shadow: 0 5px 30px rgba(0, 255, 0, 0.1);
  transition: all 0.3s ease;
}

.content-card:hover {
  box-shadow: 0 8px 40px rgba(0, 255, 0, 0.2);
  transform: translateY(-2px);
}

/* Section Titles */
.section-title {
  color: var(--mechabyte-green);
  font-size: clamp(24px, 2.5vw, 40px);
  margin-bottom: 1.5vw;
  display: flex;
  align-items: center;
  gap: 1vw;
}

.section-title .icon {
  font-size: clamp(28px, 3vw, 48px);
}

.section-text {
  line-height: 1.8;
  font-size: clamp(15px, 1.2vw, 20px);
  color: var(--light-grey);
  margin-bottom: 2vw;
}

/* Intro Section */
.intro-section {
  text-align: center;
}

.mission-box {
  background: rgba(0, 255, 0, 0.05);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.8vw;
  padding: 2vw;
  margin: 2vw 0;
  text-align: left;
}

.mission-box h3 {
  color: var(--mechabyte-green);
  font-size: clamp(20px, 1.8vw, 28px);
  margin-bottom: 1vw;
}

.mission-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mission-list li {
  padding: 0.8vw 0;
  padding-left: 2vw;
  position: relative;
  font-size: clamp(14px, 1.1vw, 18px);
  line-height: 1.6;
}

.mission-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--mechabyte-green);
  font-weight: bold;
  font-size: 1.2em;
}

/* Preview Sections */
.preview-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 50, 0, 0.3) 100%);
}

.preview-header {
  text-align: center;
  margin-bottom: 3vw;
}

.preview-subtitle {
  font-size: clamp(14px, 1.1vw, 18px);
  color: var(--light-grey);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2vw;
  margin-bottom: 2vw;
}

.preview-card {
  background: rgba(0, 0, 0, 0.5);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.8vw;
  padding: 2vw;
  transition: all 0.3s ease;
}

.preview-card:hover {
  border-color: var(--mechabyte-green);
  background: rgba(0, 255, 0, 0.05);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 0, 0.2);
}

.preview-icon {
  font-size: clamp(32px, 3vw, 48px);
  margin-bottom: 1vw;
}

.preview-card h3 {
  color: var(--mechabyte-green);
  font-size: clamp(18px, 1.5vw, 24px);
  margin-bottom: 1vw;
}

.preview-card p {
  font-size: clamp(13px, 1vw, 16px);
  line-height: 1.6;
  color: var(--light-grey);
}

.preview-cta {
  text-align: center;
  margin-top: 2vw;
}

/* Outreach Highlights */
.preview-highlights {
  display: flex;
  justify-content: space-around;
  gap: 2vw;
  margin-bottom: 3vw;
  flex-wrap: wrap;
}

.highlight-stat {
  text-align: center;
  flex: 1;
  min-width: 150px;
}

.stat-number {
  font-size: clamp(36px, 4vw, 64px);
  color: var(--mechabyte-green);
  font-weight: bold;
  text-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}

.stat-label {
  font-size: clamp(12px, 1vw, 16px);
  color: var(--light-grey);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Sponsors Showcase */
.sponsors-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2vw;
  margin-bottom: 2vw;
}

.sponsor-highlight,
.sponsor-impact {
  background: rgba(0, 0, 0, 0.5);
  border: 0.1vw solid rgba(0, 255, 0, 0.3);
  border-radius: 0.8vw;
  padding: 2vw;
}

.sponsor-highlight h3,
.sponsor-impact h3 {
  color: var(--mechabyte-green);
  font-size: clamp(18px, 1.5vw, 24px);
  margin-bottom: 1.5vw;
}

.sponsor-logos {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1vw;
}

.sponsor-logo-item {
  background: rgba(0, 255, 0, 0.1);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  padding: 1vw;
  text-align: center;
  font-size: clamp(12px, 0.9vw, 14px);
  font-weight: 600;
  color: var(--mechabyte-green);
}

.impact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.impact-list li {
  padding: 0.8vw 0;
  font-size: clamp(13px, 1vw, 16px);
  line-height: 1.6;
  color: var(--light-grey);
}

.sponsor-cta-box {
  background: rgba(0, 255, 0, 0.05);
  border: 0.15vw solid var(--mechabyte-green);
  border-radius: 0.8vw;
  padding: 2.5vw;
  text-align: center;
}

.sponsor-cta-box h3 {
  color: var(--mechabyte-green);
  font-size: clamp(20px, 1.8vw, 28px);
  margin-bottom: 1vw;
}

.sponsor-cta-box p {
  font-size: clamp(14px, 1.1vw, 18px);
  color: var(--light-grey);
  margin-bottom: 2vw;
  line-height: 1.6;
}

/* FTC Info */
.ftc-stats {
  display: flex;
  justify-content: space-around;
  gap: 2vw;
  margin-top: 2vw;
  flex-wrap: wrap;
}

.ftc-stat {
  display: flex;
  align-items: center;
  gap: 1vw;
  padding: 1vw 2vw;
  background: rgba(0, 255, 0, 0.1);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  flex: 1;
  min-width: 200px;
  justify-content: center;
}

.stat-icon {
  font-size: clamp(24px, 2vw, 32px);
}

.stat-text {
  font-size: clamp(13px, 1vw, 16px);
  color: var(--light-grey);
  font-weight: 600;
}

/* CTA Groups */
.cta-group {
  display: flex;
  gap: 1.5vw;
  justify-content: center;
  margin-top: 2vw;
  flex-wrap: wrap;
}

/* Final CTA */
.final-cta {
  text-align: center;
  background: linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);
  border: 0.2vw solid var(--mechabyte-green);
}

.final-cta h2 {
  color: var(--mechabyte-green);
  font-size: clamp(24px, 2.5vw, 40px);
  margin-bottom: 1vw;
}

.final-cta p {
  font-size: clamp(14px, 1.2vw, 20px);
  color: var(--light-grey);
  max-width: 700px;
  margin: 0 auto 2vw;
  line-height: 1.6;
}

/* Responsive Design */
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

  .content-wrapper {
    padding: 0 4vw;
  }

  .content-card {
    padding: 20px;
    border-radius: 12px;
  }

  .preview-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .sponsors-showcase {
    grid-template-columns: 1fr;
  }

  .ftc-stats {
    flex-direction: column;
  }

  .cta-group {
    flex-direction: column;
    align-items: stretch;
  }

  .preview-highlights {
    flex-direction: column;
    gap: 20px;
  }

  .sponsor-logos {
    grid-template-columns: 1fr;
  }
}
</style>
