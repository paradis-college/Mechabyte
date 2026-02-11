<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
  type ComponentPublicInstance,
} from "vue";
import { useRouter } from "vue-router";
import { translations } from "../i18n/translations";
import SponsorCard from "../components/SponsorCard.vue";
import MicroButton from "../components/MicroButton.vue";
import FindMorePane from "../components/FindMorePane.vue";
import SectionHeader from "../components/SectionHeader.vue";
import "../styles/components/ScannerBeam.css";

const props = defineProps<{
  language: "en" | "ro";
}>();

const router = useRouter();
const t = computed(() => translations[props.language]);

// State for popups - Sponsors section
const showSustainability = ref(false);

// State for popups - Support section
const showVolunteerInfo = ref(false);
const showDonateInfo = ref(false);

// State for popups - Values section
const showValueOrigins = ref(false);
const showRealExamples = ref(false);
const showImpact = ref(false);

// State for popups - Achievements section
const showFirstRobotDetails = ref(false);
const showTeamFormationDetails = ref(false);
const showRegionalCompDetails = ref(false);
const showTechDevDetails = ref(false);
const showSTEMWorkshopsDetails = ref(false);
const showCommunityOutreachDetails = ref(false);

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
    name: "Paradis International College",
    logo: new URL(
      "../assets/images/sponsors/paradis college.jpg",
      import.meta.url,
    ).href,
    descriptionEn: "Institutional excellence starts with solid foundations.",
    descriptionRo: "Excelența instituțională începe cu fundații solide.",
    isPrimary: true,
  },
  {
    name: "Professional Dentist",
    logo: new URL(
      "../assets/images/sponsors/professionalDentist.jpg",
      import.meta.url,
    ).href,
    descriptionEn: "Precision and attention to detail matter everywhere.",
    descriptionRo: "Precizia și atenția la detalii contează peste tot.",
  },
  {
    name: "SAM Ideas",
    logo: new URL("../assets/images/sponsors/SAM ideas.jpg", import.meta.url)
      .href,
    descriptionEn: "Think outside the box, build beyond boundaries.",
    descriptionRo: "Gândește în afara cutiei, construiește dincolo de limite.",
  },
  {
    name: "Pulse",
    logo: new URL("../assets/images/sponsors/pulse.jpeg", import.meta.url).href,
    descriptionEn: "Industry connections accelerate tech growth.",
    descriptionRo:
      "Conexiunile din industrie accelerează creșterea tehnologică.",
  },
  {
    name: "TrustTeam",
    logo: new URL("../assets/images/sponsors/trustteam.jpeg", import.meta.url)
      .href,
    descriptionEn: "Teamwork + technology = unstoppable force.",
    descriptionRo: "Muncă în echipă + tehnologie = forță de neoprit.",
  },
]);

// Achievements list reversed to show most recent first
const achievementsList = computed(() => {
  const list = t.value.achievementsList || [];
  return [...list].reverse();
});

// Scanner beam effect for all animated cards
const cardVisibility = ref<Record<string, boolean>>({});
const cardSweep = ref<Record<string, boolean>>({});
const cardRefs = ref<Record<string, HTMLElement>>({});

const SCANNER_SWEEP_DURATION_MS = 1500;
let observer: IntersectionObserver | null = null;

const setCardRef = (
  el: Element | ComponentPublicInstance | null,
  id: string,
) => {
  if (el && "nodeType" in el) {
    cardRefs.value[id] = el as HTMLElement;
  }
};

onMounted(() => {
  // Initialize visibility for all cards
  const whySponsorPoints = t.value.whySponsorPoints || [];
  whySponsorPoints.forEach((_: any, index: number) => {
    const id = `sponsor-${index}`;
    cardVisibility.value[id] = false;
    cardSweep.value[id] = false;
  });

  const valuesList = t.value.valuesList || [];
  valuesList.forEach((_: any, index: number) => {
    const id = `value-${index}`;
    cardVisibility.value[id] = false;
    cardSweep.value[id] = false;
  });

  achievementsList.value.forEach((_: any, index: number) => {
    const id = `achievement-${index}`;
    cardVisibility.value[id] = false;
    cardSweep.value[id] = false;
  });

  nextTick(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = entry.target.getAttribute("data-card-id") || "";
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
        rootMargin: "0px",
      },
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
      <!-- SECTION 1: SPONSORS -->
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
            :description="
              props.language === 'en'
                ? sponsor.descriptionEn
                : sponsor.descriptionRo
            "
            :is-primary="sponsor.isPrimary || false"
          />
        </div>
      </div>

      <!-- Sustainability Button -->
      <div class="top-actions">
        <MicroButton
          :label="t.sustainabilityGrowthLabel"
          variant="secondary"
          @click="showSustainability = true"
        />
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
            :ref="(el) => setCardRef(el, `sponsor-${index}`)"
            :data-card-id="`sponsor-${index}`"
            :class="[
              'point-card',
              'scanner',
              { 'scanner--sweep': cardSweep[`sponsor-${index}`] },
            ]"
          >
            <div class="point-number">{{ index + 1 }}</div>
            <p>{{ point }}</p>
          </div>
        </div>
      </div>

      <div class="cta-section">
        <h2>{{ t.becomeSponsorTitle }}</h2>
        <p>{{ t.becomeSponsorText }}</p>
        <MicroButton
          :label="t.contactUsLabel"
          @click="router.push('/contact')"
        />
      </div>

      <!-- SECTION 2: SUPPORT -->
      <div class="section-divider"></div>
      <SectionHeader :title="t.supportTitle" :subtitle="t.supportIntro" />

      <!-- Tax Benefits - First and Prominent with Glow -->
      <div class="tax-benefits-highlight value-card glow-on-hover">
        <h2>💰 {{ t.taxDeductibleTitle }}</h2>
        <p>{{ t.taxDeductibleText }}</p>
      </div>

      <!-- Get Involved - Top Section -->
      <div class="cta-buttons-section">
        <h2 class="section-title">
          🤝 {{ language === "en" ? "Get Involved" : "Implică-te" }}
        </h2>
        <div class="cta-buttons">
          <MicroButton
            :label="
              language === 'en'
                ? '👨‍👩‍👧 Volunteer & Mentorship (Parents)'
                : '👨‍👩‍👧 Voluntariat & Mentorat (Părinți)'
            "
            @click="showVolunteerInfo = true"
          />
          <MicroButton
            :label="
              language === 'en'
                ? '🏢 Equipment & Material Donations (Businesses)'
                : '🏢 Donații Echipament (Companii)'
            "
            variant="secondary"
            @click="showDonateInfo = true"
          />
        </div>
      </div>

      <!-- Sponsorship Benefits with Logo Placement -->
      <div class="benefits-section">
        <h2 class="section-title">🏆 {{ t.sponsorBenefitsTitle }}</h2>
        <div class="benefits-grid">
          <div
            v-for="(benefit, index) in t.sponsorBenefits"
            :key="index"
            class="benefit-card value-card"
          >
            <div class="benefit-icon">{{ index + 1 }}</div>
            <p>{{ benefit }}</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA for Support section -->
      <div class="final-cta">
        <h2>
          {{
            language === "en"
              ? "🚀 Ready to Make an Impact?"
              : "🚀 Gata să Faci un Impact?"
          }}
        </h2>
        <p>
          {{
            language === "en"
              ? "Join us in building tomorrow's tech leaders. Every contribution matters."
              : "Alătură-te nouă în construirea liderilor tech de mâine. Fiecare contribuție contează."
          }}
        </p>
        <MicroButton
          :label="language === 'en' ? 'Contact Us' : 'Contactați-ne'"
          @click="router.push('/contact')"
        />
      </div>

      <!-- SECTION 3: VALUES -->
      <div class="section-divider"></div>
      <SectionHeader :title="t.valuesTitle" :subtitle="t.valuesIntro" />

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

      <div class="values-grid">
        <div
          v-for="(value, index) in t.valuesList"
          :key="index"
          :ref="(el) => setCardRef(el, `value-${index}`)"
          :data-card-id="`value-${index}`"
          :class="[
            'value-card',
            'scanner',
            { 'scanner--sweep': cardSweep[`value-${index}`] },
          ]"
        >
          <h2>{{ value.title }}</h2>
          <p>{{ value.description }}</p>
        </div>
      </div>

      <div class="ambassador-section value-card">
        <h3>🎯 {{ t.ambassadorRoleTitle }}</h3>
        <p class="ambassador-text">{{ t.ambassadorStatement }}</p>
      </div>

      <!-- SECTION 4: ACHIEVEMENTS -->
      <div class="section-divider"></div>
      <SectionHeader
        :title="t.achievementsTitle"
        :subtitle="t.achievementsIntro"
      />

      <div class="timeline">
        <div
          v-for="(achievement, index) in achievementsList"
          :key="index"
          class="timeline-item"
        >
          <div class="timeline-marker"></div>
          <div
            :ref="(el) => setCardRef(el, `achievement-${index}`)"
            :data-card-id="`achievement-${index}`"
            :class="[
              'timeline-content',
              'scanner',
              { 'scanner--sweep': cardSweep[`achievement-${index}`] },
            ]"
          >
            <div class="year-badge">{{ achievement.year }}</div>
            <h2>{{ achievement.title }}</h2>
            <p>{{ achievement.description }}</p>
            <MicroButton
              v-if="
                achievement.title === 'Team Formation' ||
                achievement.title === 'Formarea Echipei'
              "
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showTeamFormationDetails = true"
              class="modal-btn"
            />
            <MicroButton
              v-if="
                achievement.title === 'First Robot Build' ||
                achievement.title === 'Prima Construcție de Robot'
              "
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showFirstRobotDetails = true"
              class="modal-btn"
            />
            <MicroButton
              v-if="
                achievement.title === 'FTC Regional Competition' ||
                achievement.title === 'Competiția Regională FTC'
              "
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showRegionalCompDetails = true"
              class="modal-btn"
            />
            <MicroButton
              v-if="
                achievement.title === 'Technical Development' ||
                achievement.title === 'Dezvoltare Tehnică'
              "
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showTechDevDetails = true"
              class="modal-btn"
            />
            <MicroButton
              v-if="
                achievement.title === 'STEM Workshops' ||
                achievement.title === 'Workshop-uri STEM'
              "
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showSTEMWorkshopsDetails = true"
              class="modal-btn"
            />
            <MicroButton
              v-if="
                achievement.title === 'Community Outreach Begins' ||
                achievement.title === 'Începutul Outreach-ului Comunitar'
              "
              :label="language === 'en' ? 'Find out more' : 'Află mai multe'"
              variant="secondary"
              @click="showCommunityOutreachDetails = true"
              class="modal-btn"
            />
          </div>
        </div>
      </div>

      <!-- ALL POPUPS -->
      <!-- Sponsors Section Popups -->
      <FindMorePane
        :show="showSustainability"
        :title="t.sustainabilityGrowthLabel"
        @close="showSustainability = false"
      >
        <p style="white-space: pre-line">{{ t.sustainabilityGrowthText }}</p>
      </FindMorePane>

      <!-- Support Section Popups -->
      <FindMorePane
        :show="showVolunteerInfo"
        :title="
          language === 'en'
            ? '👨‍👩‍👧 Volunteer & Mentorship'
            : '👨‍👩‍👧 Voluntariat & Mentorat'
        "
        @close="showVolunteerInfo = false"
      >
        <template v-if="language === 'en'">
          <h3>{{ t.volunteerTitle }}</h3>
          <p>{{ t.volunteerText }}</p>
          <h3 style="margin-top: 1.5rem">{{ t.mentorshipTitle }}</h3>
          <p>{{ t.mentorshipText }}</p>
          <p style="margin-top: 1rem">
            <strong>Perfect for parents who want to:</strong>
          </p>
          <ul style="margin-left: 1.5rem">
            <li>Share professional expertise with students</li>
            <li>Guide the next generation</li>
            <li>Be part of a meaningful community initiative</li>
          </ul>
        </template>
        <template v-else>
          <h3>{{ t.volunteerTitle }}</h3>
          <p>{{ t.volunteerText }}</p>
          <h3 style="margin-top: 1.5rem">{{ t.mentorshipTitle }}</h3>
          <p>{{ t.mentorshipText }}</p>
          <p style="margin-top: 1rem">
            <strong>Perfect pentru părinți care doresc să:</strong>
          </p>
          <ul style="margin-left: 1.5rem">
            <li>Împărtășească expertiza profesională cu studenții</li>
            <li>Ghideze următoarea generație</li>
            <li>Facă parte dintr-o inițiativă comunitară semnificativă</li>
          </ul>
        </template>
      </FindMorePane>

      <FindMorePane
        :show="showDonateInfo"
        :title="
          language === 'en'
            ? '🏢 Equipment & Material Donations'
            : '🏢 Donații Echipament'
        "
        @close="showDonateInfo = false"
      >
        <template v-if="language === 'en'">
          <h3>{{ t.donateTitle }}</h3>
          <p>{{ t.donateText }}</p>
          <p style="margin-top: 1rem"><strong>What we need:</strong></p>
          <ul style="margin-left: 1.5rem">
            <li>Electronic components (motors, sensors, controllers)</li>
            <li>Building materials (aluminum, 3D printer filament)</li>
            <li>Tools and workshop equipment</li>
            <li>Laptops or computers for programming</li>
          </ul>
          <p style="margin-top: 1rem">
            <em>Turn your unused tech into student success!</em>
          </p>
        </template>
        <template v-else>
          <h3>{{ t.donateTitle }}</h3>
          <p>{{ t.donateText }}</p>
          <p style="margin-top: 1rem"><strong>Ce avem nevoie:</strong></p>
          <ul style="margin-left: 1.5rem">
            <li>Componente electronice (motoare, senzori, controlere)</li>
            <li>Materiale de construcție (aluminiu, filament imprimantă 3D)</li>
            <li>Unelte și echipament pentru atelier</li>
            <li>Laptopuri sau computere pentru programare</li>
          </ul>
          <p style="margin-top: 1rem">
            <em>Transformă tehnologia neutilizată în succes studențesc!</em>
          </p>
        </template>
      </FindMorePane>

      <!-- Values Section Popups -->
      <FindMorePane
        :show="showValueOrigins"
        :title="
          language === 'en'
            ? '🌟 Where Our Values Come From'
            : '🌟 De Unde Vin Valorile Noastre'
        "
        @close="showValueOrigins = false"
      >
        <template v-if="language === 'en'">
          <p>
            Our values evolved from team experiences, not boardroom decisions.
          </p>
          <p>Best solutions came from questioning assumptions.</p>
          <p>Collaboration multiplied our capabilities.</p>
          <p>We once restarted a match rather than accept an unfair win.</p>
        </template>
        <template v-else>
          <p>
            Valorile noastre au evoluat din experiențe, nu din decizii de birou.
          </p>
          <p>
            Cele mai bune soluții au venit din punerea la îndoială a
            presupunerilor.
          </p>
          <p>Colaborarea ne-a multiplicat capacitățile.</p>
          <p>Am reluat odată un meci în loc să acceptăm o victorie neloială.</p>
        </template>
      </FindMorePane>

      <FindMorePane
        :show="showRealExamples"
        :title="
          language === 'en' ? '💡 Values in Action' : '💡 Valori în Acțiune'
        "
        @close="showRealExamples = false"
      >
        <template v-if="language === 'en'">
          <p>Rebuilt robot 2 days before competition.</p>
          <p>Saturday teaching robotics to elementary students.</p>
          <p>Switched frameworks mid-season for better tech.</p>
        </template>
        <template v-else>
          <p>Robot reconstruit cu 2 zile înainte de competiție.</p>
          <p>Sâmbăta predând robotică la elevi.</p>
          <p>
            Framework schimbat la mijlocul sezonului pentru tehnologie mai bună.
          </p>
        </template>
      </FindMorePane>

      <FindMorePane
        :show="showImpact"
        :title="
          language === 'en' ? '🎯 Making a Difference' : '🎯 Făcând o Diferență'
        "
        @close="showImpact = false"
      >
        <p v-if="language === 'en'">
          • Established 1 robotics club with 30+ students<br />
          • Open-sourced code downloaded in 15 countries<br />
          • Earned Gracious Professionalism award and built sponsor trust
        </p>
        <p v-else>
          • Înființat 1 club de robotică cu 30+ elevi<br />
          • Cod open-source descărcat în 15 țări<br />
          • Premiu Gracious Professionalism și încredere construită cu sponsorii
        </p>
      </FindMorePane>

      <!-- Achievements Section Popups -->
      <FindMorePane
        :show="showFirstRobotDetails"
        :title="
          language === 'en'
            ? '🤖 Our First Robot Build'
            : '🤖 Prima Noastră Construcție de Robot'
        "
        @close="showFirstRobotDetails = false"
      >
        <div v-if="language === 'en'">
          <p>
            Building our first competitive robot was an incredible learning
            experience. We started with basic concepts and iterated through
            multiple prototypes before finalizing our design.
          </p>
          <h4 class="modal-heading">Key Features:</h4>
          <ul class="modal-list">
            <li>Custom-designed intake mechanism</li>
            <li>Autonomous navigation system</li>
            <li>Precision control software</li>
            <li>Modular design for easy repairs</li>
          </ul>
          <p class="modal-text">
            This experience taught us the importance of testing, iteration, and
            teamwork in robotics engineering.
          </p>
        </div>
        <div v-else>
          <p>
            Construirea primului nostru robot competitiv a fost o experiență
            incredibilă de învățare. Am început cu concepte de bază și am iterat
            prin multiple prototipuri înainte de a finaliza designul.
          </p>
          <h4 class="modal-heading">Caracteristici Cheie:</h4>
          <ul class="modal-list">
            <li>Mecanism de intrare proiectat personalizat</li>
            <li>Sistem de navigare autonomă</li>
            <li>Software de control de precizie</li>
            <li>Design modular pentru reparații ușoare</li>
          </ul>
          <p class="modal-text">
            Această experiență ne-a învățat importanța testării, iterației și
            muncii în echipă în ingineria roboticii.
          </p>
        </div>
      </FindMorePane>

      <FindMorePane
        :show="showTeamFormationDetails"
        :title="
          language === 'en'
            ? '🎯 Team Formation Story'
            : '🎯 Povestea Formării Echipei'
        "
        @close="showTeamFormationDetails = false"
      >
        <template v-if="language === 'en'">
          <p>
            Mechabyte was born from a shared passion for robotics and innovation
            at Paradise International College.
          </p>
          <p>
            Founded by students who wanted to bring world-class robotics
            education to Iași, Romania.
          </p>
          <p>
            Our founding principle: Make STEM accessible, competitive, and fun
            for everyone.
          </p>
        </template>
        <template v-else>
          <p>
            Mechabyte s-a născut dintr-o pasiune comună pentru robotică și
            inovație la Paradise International College.
          </p>
          <p>
            Fondată de studenți care au dorit să aducă educație robotică de
            clasă mondială la Iași, România.
          </p>
          <p>
            Principiul nostru fondator: Faceți STEM accesibil, competitiv și
            distractiv pentru toată lumea.
          </p>
        </template>
      </FindMorePane>

      <FindMorePane
        :show="showRegionalCompDetails"
        :title="
          language === 'en'
            ? '🏆 FTC Regional Competition'
            : '🏆 Competiția Regională FTC'
        "
        @close="showRegionalCompDetails = false"
      >
        <template v-if="language === 'en'">
          <p>
            Our first major competition tested everything we built and learned.
          </p>
          <p>
            <strong>Challenges faced:</strong> Technical issues, time pressure,
            fierce competition
          </p>
          <p>
            <strong>Lessons learned:</strong> Resilience, quick problem-solving,
            gracious professionalism
          </p>
          <p>
            Result: Experience that shaped our team's competitive spirit and
            technical excellence.
          </p>
        </template>
        <template v-else>
          <p>
            Prima noastră competiție majoră a testat tot ce am construit și
            învățat.
          </p>
          <p>
            <strong>Provocări întâmpinate:</strong> Probleme tehnice, presiune
            de timp, competiție acerbă
          </p>
          <p>
            <strong>Lecții învățate:</strong> Reziliență, rezolvare rapidă a
            problemelor, profesionalism grațios
          </p>
          <p>
            Rezultat: Experiență care a modelat spiritul competitiv și excelența
            tehnică a echipei.
          </p>
        </template>
      </FindMorePane>

      <FindMorePane
        :show="showTechDevDetails"
        :title="
          language === 'en'
            ? '⚙️ Technical Development Journey'
            : '⚙️ Călătoria Dezvoltării Tehnice'
        "
        @close="showTechDevDetails = false"
      >
        <template v-if="language === 'en'">
          <p>
            Continuous improvement through coding, CAD design, and hardware
            engineering.
          </p>
          <p>
            ✓ Advanced autonomous programming<br />✓ Precision mechanical
            systems<br />✓ Sensor integration<br />✓ Control algorithms
          </p>
          <p>Each iteration made us stronger, smarter, faster.</p>
        </template>
        <template v-else>
          <p>
            Îmbunătățire continuă prin codare, design CAD și inginerie hardware.
          </p>
          <p>
            ✓ Programare autonomă avansată<br />✓ Sisteme mecanice de
            precizie<br />✓ Integrare senzori<br />✓ Algoritmi de control
          </p>
          <p>
            Fiecare iterație ne-a făcut mai puternici, mai deștepți, mai rapizi.
          </p>
        </template>
      </FindMorePane>

      <FindMorePane
        :show="showSTEMWorkshopsDetails"
        :title="
          language === 'en' ? '🔬 STEM Workshops' : '🔬 Workshop-uri STEM'
        "
        @close="showSTEMWorkshopsDetails = false"
      >
        <template v-if="language === 'en'">
          <p>
            Teaching the next generation of engineers through hands-on robotics.
          </p>
          <p>
            ✓ Weekly sessions with 30+ students<br />✓ Hands-on robot building
            exercises<br />✓ Programming fundamentals<br />✓ Problem-solving
            challenges
          </p>
          <p>
            Inspiring curiosity and technical skills one workshop at a time.
          </p>
        </template>
        <template v-else>
          <p>
            Predând următoarea generație de ingineri prin robotică practică.
          </p>
          <p>
            ✓ Sesiuni săptămânale cu 30+ elevi<br />✓ Exerciții practice de
            construcție roboți<br />✓ Fundamente de programare<br />✓ Provocări
            de rezolvare probleme
          </p>
          <p>
            Inspirând curiozitate și abilități tehnice câte un workshop o dată.
          </p>
        </template>
      </FindMorePane>

      <FindMorePane
        :show="showCommunityOutreachDetails"
        :title="
          language === 'en' ? '🤝 Community Outreach' : '🤝 Outreach Comunitar'
        "
        @close="showCommunityOutreachDetails = false"
      >
        <template v-if="language === 'en'">
          <p>Bringing STEM education to local schools and communities.</p>
          <p>
            ✓ Interactive robot demonstrations<br />✓ Partnership with 5+ local
            schools<br />✓ Free educational materials<br />✓ Mentorship for
            aspiring engineers
          </p>
          <p>Making robotics accessible to everyone in our community.</p>
        </template>
        <template v-else>
          <p>Aducând educația STEM în școli și comunități locale.</p>
          <p>
            ✓ Demonstrații interactive cu roboți<br />✓ Parteneriat cu 5+ școli
            locale<br />✓ Materiale educaționale gratuite<br />✓ Mentorat pentru
            ingineri aspiranți
          </p>
          <p>
            Făcând robotica accesibilă pentru toată lumea din comunitatea
            noastră.
          </p>
        </template>
      </FindMorePane>
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

.top-actions {
  width: 100%;
  display: flex;
  justify-content: center;
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
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
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

/* Section divider for visual separation */
.section-divider {
  width: 100%;
  height: 0.2vw;
  background: linear-gradient(
    90deg,
    transparent,
    var(--mechabyte-green),
    transparent
  );
  margin: 3vw 0;
}

/* Support Section Styles */
.section-title {
  color: var(--mechabyte-green);
  margin-bottom: 1.5vw;
  text-align: center;
  width: 100%;
}

.tax-benefits-highlight {
  width: 100%;
  background: linear-gradient(
    135deg,
    var(--dark-grey) 0%,
    var(--mechabyte-grey) 100%
  );
}

.tax-benefits-highlight.glow-on-hover:hover {
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
}

.tax-benefits-highlight h2 {
  color: var(--mechabyte-green);
  font-size: clamp(20px, 2vw, 28px);
  margin-bottom: 1vw;
}

.tax-benefits-highlight p {
  line-height: 1.6;
  color: var(--light-grey);
}

.benefits-section {
  width: 100%;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5vw;
  width: 100%;
}

.benefit-card {
  display: flex;
  gap: 1vw;
  align-items: flex-start;
}

.benefit-icon {
  flex-shrink: 0;
  width: 2.5vw;
  height: 2.5vw;
  min-width: 30px;
  min-height: 30px;
  background: var(--mechabyte-green);
  color: var(--background-grey);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: clamp(14px, 1.2vw, 18px);
}

.benefit-card p {
  line-height: 1.6;
  color: var(--light-grey);
  flex: 1;
}

.cta-buttons-section {
  width: 100%;
  text-align: center;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1vw;
  justify-content: center;
  margin-top: 1vw;
  margin-bottom: 2vw;
}

.final-cta {
  width: 100%;
  padding: 2vw;
  background: var(--dark-grey);
  border: 0.1vw solid var(--mechabyte-green);
  border-radius: 0.5vw;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.2);
}

.final-cta h2 {
  color: var(--mechabyte-green);
  margin-bottom: 1vw;
}

.final-cta p {
  line-height: 1.6;
  margin-bottom: 1.5vw;
  color: var(--light-grey);
}

/* Values Section Styles */
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
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 255, 0, 0.3);
  border-color: var(--mechabyte-green);
}

.value-card h2 {
  color: var(--mechabyte-green);
  margin-bottom: 0.5vw;
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

/* Achievements Section Styles */
.timeline {
  width: 100%;
  position: relative;
  padding-left: 3vw;
}

.timeline::before {
  content: "";
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
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.timeline-content:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
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

  .cta-section,
  .final-cta {
    padding: 15px;
  }

  .cta-button {
    padding: 12px 24px;
    font-size: 16px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .value-card {
    padding: 15px;
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

  .section-divider {
    height: 2px;
    margin: 30px 0;
  }
}
</style>
